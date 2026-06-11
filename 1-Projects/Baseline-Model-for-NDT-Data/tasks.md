# Baseline Model for NDT Data — TODO

## Active Phase

### Now
- [x] Remove obsolete file-split experiment code after poor grouped results
- [x] Define point-level split protocol before reintroducing training
- [x] Add grouped `ndt split points` manifest generation
- [x] Build training code on `outputs/point_splits/<seed>/<protocol>/<dataset>/point_split_manifest.csv`
- [x] Add batch runner for point-classification option sweeps
- [ ] Run first point-classification baseline on `same_lift_off/z1`
- [x] Return to planning before any training work
- [x] Implement classification training baselines: 1DCNN, random forest, logistic regression, MLP
- [x] Implement regression training baseline
- [x] Create statistical visualizations: mean, max, distribution, and related summaries
- [x] Explore TSNR and PCA views to show feature separability
- [x] Define grouped-dataset protocols for classification and regression tasks
- [x] Add source-backed split diagnostics for grouped-training failures
- [x] Finish TDMS preprocessing review
- [x] Review raw TDMS rotation/crop choices in app
- [x] Save reviewed rotate/crop choices as preprocessing metadata in `configs/raw_tdms_rotate_crop.csv`
- [x] Review LOI windows in app and save approved windows to `configs/loi_windows.csv`
- [x] Select per-file best LOI windows and save them to `configs/selected_loi_windows.csv`

### Next
- [x] Group classification datasets by specimen-side, lift-off, sensor type, and waveform
- [x] Specify classification inputs/labels for each group protocol
- [x] Specify regression inputs/targets using corrosion lateral surface patches shaped `n x n x 500`
- [x] Retire `outputs/splits/split_coverage.md` file-level split checks
- [x] Export reviewed TDMS files as processed `.npy` arrays
- [x] Plot exported `.npy` arrays for preprocessing QA
- [x] Compare depth-axis background removal methods for feature-map previews
- [x] Decide how `status=short` TDMS files should be handled during processing

### Waiting
- [ ]

### Later
- Revisit model training only after a point-level split protocol is designed, documented, implemented, and checked for leakage
- For classification model improvement, implement `1D-CNN` first; if needed, compare `ResNet1D`/`InceptionTime`, then `CNN-GRU`; treat Transformer as experimental only after stronger baselines and enough data.
