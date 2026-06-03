#include <opencv2/core.hpp>

class MahalanobisDetectorOpenCV {
private:
    cv::Mat mu;
    cv::Mat cov_inv;

public:
    // X debe ser una matriz de tipo CV_32F o CV_64F
    void fit(const cv::Mat& X) {
    cv::Mat covar;

    // COVAR_SCALE divide por N automaticamente, luego tu corriges a N-1
    cv::calcCovarMatrix(X, covar, mu,
                        cv::COVAR_NORMAL | cv::COVAR_ROWS | cv::COVAR_SCALE);

    // Correccion Bessel: pasar de division N a division N-1
    int N = X.rows;
    covar = covar * (static_cast<float>(N) / (N - 1));

    cv::invert(covar, cov_inv, cv::DECOMP_SVD);
    
    // mu viene como fila de calcCovarMatrix, aseguramos shape correcto
    mu = mu.reshape(1, 1);  // 1 x n_features
}

    float score(const cv::Mat& x) const {
        // OpenCV tiene una función nativa para Mahalanobis que devuelve la raíz cuadrada D
        // Elevamos al cuadrado para obtener el mismo resultado que en tu código Python (D^2)
        cv::Mat x = x_input.reshape(1, 1);  // fuerza 1 x n_features
        double dist = cv::Mahalanobis(x, mu, cov_inv);
        return static_cast<float>(dist * dist); 
    }
};
