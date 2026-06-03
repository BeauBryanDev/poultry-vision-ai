#include <iostream>
#include <vector>
#include <cmath>
#include <random>
#include <algorithm>
#include <numeric>
#include <memory>

// matriz de datos
using Matrix = std::vector<std::vector<float>>;

// Función auxiliar equivalente a _c(n) en Python
float _c(size_t n) {
    if (n <= 1) return 0.0f;
    return 2.0f * (std::log(n - 1.0f) + 0.5772156649f) - (2.0f * (n - 1.0f) / n);
}

// Función auxiliar para replicar np.percentile por interpolación lineal
float calculate_percentile(std::vector<float> data, float percentile) {
    if (data.empty()) return 0.0f;
    std::sort(data.begin(), data.end());
    float k = (data.size() - 1) * (percentile / 100.0f);
    float f = std::floor(k);
    float c = std::ceil(k);
    if (f == c) return data[static_cast<int>(k)];
    float d0 = data[static_cast<int>(f)] * (c - k);
    float d1 = data[static_cast<int>(c)] * (k - f);
    return d0 + d1;
}

class IsolationTree {
public:
    int max_depth;
    int split_feature;
    float split_value;
    size_t size;
    std::unique_ptr<IsolationTree> left;
    std::unique_ptr<IsolationTree> right;

    IsolationTree(int max_depth) : max_depth(max_depth), split_feature(-1), split_value(0.0f), size(0) {}

    void fit(const Matrix& X, const std::vector<size_t>& indices, int depth, std::mt19937& rng) {
        size = indices.size();
        if (depth >= max_depth || size <= 1) {
            return;
        }

        int n_features = X[0].size();
        std::uniform_int_distribution<int> feature_dist(0, n_features - 1);
        split_feature = feature_dist(rng);

        // Encontrar min y max ~ equivalente a col.min(), col.max()
        float mn = X[indices[0]][split_feature];
        float mx = mn;
        for (size_t i = 1; i < size; ++i) {
            float val = X[indices[i]][split_feature];
            if (val < mn) mn = val;
            if (val > mx) mx = val;
        }

        if (mn == mx) return;

        std::uniform_real_distribution<float> value_dist(mn, mx);
        split_value = value_dist(rng);

        // Equivalente a left_mask y ~left_mask
        std::vector<size_t> left_indices;
        std::vector<size_t> right_indices;
        left_indices.reserve(size);
        right_indices.reserve(size);

        for (size_t idx : indices) {
            if (X[idx][split_feature] < split_value) {
                left_indices.push_back(idx);
            } else {
                right_indices.push_back(idx);
            }
        }

        left = std::unique_ptr<IsolationTree>(new IsolationTree(max_depth));
        left->fit(X, left_indices, depth + 1, rng);

        right = std::unique_ptr<IsolationTree>(new IsolationTree(max_depth));
        right->fit(X, right_indices, depth + 1, rng);
    }

    float path_length(const std::vector<float>& x, int depth = 0) const {
        if (!left && !right) {  
            return depth + _c(size);
        }
        if (x[split_feature] < split_value) {
            return left ? left->path_length(x, depth + 1) : depth + _c(size);
        }
        return right ? right->path_length(x, depth + 1) : depth + _c(size);
    }
};

class IsolationForestNumpy {
private:
    int n_estimators;
    int max_samples;
    float contamination;
    float threshold_;
    int max_depth_;
    std::vector<std::unique_ptr<IsolationTree>> trees;
    std::mt19937 rng; // random engine gen seed
public:
    IsolationForestNumpy(int n_estimators = 100, int max_samples = 256, float contamination = 0.01)
        : n_estimators(n_estimators), max_samples(max_samples), contamination(contamination), threshold_(0.0f), max_depth_(0) {
        // random seed
        std::random_device rd;
        rng.seed(rd());
    }

    void fit(const Matrix& X) {
        size_t n_samples = X.size();
        int actual_max_samples = std::min(max_samples, static_cast<int>(n_samples));
        max_depth_ = static_cast<int>(std::ceil(std::log2(actual_max_samples)));
        
        trees.clear();
        trees.reserve(n_estimators);

        // Vector de indices [0, 1, 2, ..., N-1]
        std::vector<size_t> all_indices(n_samples);
        std::iota(all_indices.begin(), all_indices.end(), 0);

        for (int i = 0; i < n_estimators; ++i) {
            // Replicar np.random.choice(replace=False)
            std::vector<size_t> sample_indices = all_indices;
            std::shuffle(sample_indices.begin(), sample_indices.end(), rng);
            sample_indices.resize(actual_max_samples);

            auto tree = std::unique_ptr<IsolationTree>(new IsolationTree(max_depth_));
            tree->fit(X, sample_indices, 0, rng);
            trees.push_back(std::move(tree));
        }

        std::vector<float> scores = score_samples(X);
 
        threshold_ = calculate_percentile(scores, contamination * 100.0f);
    }

    std::vector<float> score_samples(const Matrix& X) const {
        std::vector<float> scores(X.size());
        float c_val = _c(max_samples);

        for (size_t i = 0; i < X.size(); ++i) {
            float mean_length = 0.0f;
            for (const auto& tree : trees) {
                mean_length += tree->path_length(X[i]);
            }
            mean_length /= trees.size();

            // Score: -2 ** (-mean_length / c) pseudo mean ~/~ en Python -2**X evalúa a -(2**X)
            scores[i] = -std::pow(2.0f, -mean_length / c_val);
        }
        return scores;
    }

    std::vector<int> predict(const Matrix& X) const {
        std::vector<float> scores = score_samples(X);
        std::vector<int> predictions(X.size());
        
        for (size_t i = 0; i < scores.size(); ++i) {
            predictions[i] = (scores[i] < threshold_) ? -1 : 1;
        }
        return predictions;
    }
};
