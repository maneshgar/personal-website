---
title: "Depth Estimation with Online Calibration for Autonomous Driving"
tags: [projects, ai]
description: "Monocular and stereo depth estimation, with camera calibration and absolute scale recovered on the fly."
project_where: Huawei Technologies Canada
project_period: 2023
---

Monocular and stereo depth estimation for autonomous driving, with the cameras
calibrated online while driving.

- **Depth estimation:** a RAFT-based approach, using attention to compute
  correlations and stacked GRUs to refine the disparity.
- **Online calibration:** recovering the camera extrinsics and absolute scale
  from feature tracking, known objects and the camera's height.
