# PoultryVisionAI

## Overview

PoultryVisionAI is a computer vision system designed for automatic monitoring and behavioral analysis of poultry in commercial farming environments.

This project combines deep learning-based object detection with unsupervised anomaly detection techniques to identify abnormal flock behavior that may indicate stress, panic events, predator presence, environmental disturbances, or other unexpected situations.

The system is designed for overhead surveillance cameras installed inside poultry houses and focuses on real-time processing with a high-performance C++ backend.

---

# Objectives

The main goals of PoultryVisionAI are:

* Detect chickens under high-density farming conditions.
* Track individual birds across video sequences.
* Extract motion-based behavioral features.
* Model normal flock behavior.
* Detect abnormal events using statistical and machine learning techniques.
* Provide an interactive web dashboard for monitoring and visualization.

---

# Architecture

```text
Video Stream
      │
      ▼
YOLOv11 Object Detector
      │
      ▼
Bounding Boxes
      │
      ▼
Multi-Object Tracking
      │
      ▼
Trajectory Generation
      │
      ▼
Feature Extraction
      │
      ├──────────────► Mahalanobis Distance
      │
      └──────────────► Isolation Forest
                           │
                           ▼
                 Anomaly Detection Engine
                           │
                           ▼
                 REST API / Backend Service
                           │
                           ▼
                  React Web Dashboard
```

---

# Machine Learning Pipeline

## Object Detection

The detection module is based on YOLOv11-S and is specialized for a single object class:

```
Class 0: Chicken
```

The detector has been trained using multiple datasets containing:

* Broiler chickens
* Laying hens
* Roosters
* Chicks
* Different colors and breeds
* Multiple viewpoints

A second domain adaptation stage fine-tunes the detector using the PIO dataset, which contains overhead imagery captured from commercial poultry facilities.

---

## Multi-Object Tracking

Detected birds are associated across consecutive frames using a tracking algorithm to generate persistent trajectories.

Each tracked individual receives a unique identifier that enables temporal behavior analysis.

---

## Feature Extraction

For every tracked bird, multiple motion descriptors can be extracted, including:

* Position
* Velocity
* Speed
* Acceleration
* Direction changes
* Local neighborhood density
* Distance to nearby birds

These features form the input space for anomaly detection.

---

## Mahalanobis Distance

Mahalanobis Distance is used as a statistical measure to estimate how far an observation lies from the learned distribution of normal flock behavior.

The covariance matrix and mean vector are estimated from normal observations collected during training.

This component is implemented directly in C++ using OpenCV linear algebra routines.

---

## Isolation Forest

An in-house implementation of Isolation Forest has been developed in modern C++ without relying on external machine learning frameworks.

The implementation includes:

* Random feature selection
* Random split generation
* Recursive isolation trees
* Average path length computation
* Contamination-based threshold estimation

The resulting anomaly score complements the Mahalanobis Distance detector.

---

# Backend

The backend is implemented entirely in modern C++ for maximum execution speed.

Main technologies:

* C++
* Crow Framework
* OpenCV
* ONNX Runtime
* Docker
* Docker Compose

The backend is responsible for:

* Model inference
* Tracking
* Feature extraction
* Anomaly detection
* Database interaction
* REST API endpoints

---

# Frontend

The web interface is developed using:

* React
* TypeScript
* Vite
* Tailwind CSS
* Recharts

The dashboard provides:

* Live monitoring
* Detection visualization
* Behavioral statistics
* Historical anomaly reports
* Farm monitoring analytics

---

# Database

PostgreSQL is used to persist application data, including:

* Camera metadata
* Detection events
* Tracking information
* Anomaly records
* System logs

---

# Deployment

The project is containerized using Docker and orchestrated through Docker Compose.

The architecture is designed for deployment on Linux servers equipped with GPU acceleration.

---

# Main Technologies

* C++20
* Crow
* OpenCV
* ONNX Runtime
* PostgreSQL
* Docker
* Docker Compose
* React
* TypeScript
* Tailwind CSS
* Recharts
* YOLOv11

---

# Research Focus

PoultryVisionAI explores the integration of computer vision and unsupervised machine learning for precision livestock farming.

Rather than relying solely on object detection, the project aims to model flock dynamics and automatically identify behavioral anomalies through statistical and machine learning methods.

---

# License

This project is intended for research, educational, and precision agriculture applications.

Please refer to the project license for usage and distribution terms.
