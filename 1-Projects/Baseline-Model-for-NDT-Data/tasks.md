# Baseline Model for NDT Data — TODO

## Current

- [ ] Run quick point-classification sweep: `binary-corrosion` + `weighted_sampler`
- [ ] Run full point-classification sweep across label modes, balance modes, protocols, and datasets
- [ ] Define regression patch inputs and reintroduce regression training after the classification sweep

## Completed

- Point-level split protocol and `ndt split points` manifest generation
- Point-classification trainer and batch runner
- Classification baselines: 1D-CNN, ResNet1D, InceptionTime, TCN, MLP, random forest, logistic regression
- Regression baseline and model shortlist
- Statistical visualizations, TSNR/PCA, and grouped-dataset protocols
- TDMS preprocessing review: rotate/crop, LOI windows, selected LOI windows
- Export TDMS as `.npy` arrays and QA plots

## Later

- Revisit training only after confirming the point-level split protocol has no leakage
- Compare all classification models across grouped point-split protocols
