# Baseline Model for NDT Data — TODO

## Active Phase

### Now
- [ ] Debug training: investigate poor performance (overfitting? data quality? loss function?)
- [x] Return to planning before any training work
- [x] Implement classification training baselines: 1DCNN, random forest, logistic regression, MLP
- [ ] Implement regression training baseline
- [ ] Create statistical visualizations: mean, max, distribution, and related summaries
- [ ] Explore TSNR and PCA views to show feature separability
- [x] Define grouped-dataset protocols for classification and regression tasks
- [ ] Finish TDMS preprocessing review
- [ ] Review raw TDMS rotation/crop choices in app
- [ ] Save reviewed rotate/crop choices as preprocessing metadata in `configs/raw_tdms_rotate_crop.csv`
- [ ] Review LOI windows in app and save approved windows to `configs/loi_windows.csv`
- [ ] Select per-file best LOI windows and save them to `configs/selected_loi_windows.csv`

### Next
- [x] Group classification datasets by specimen-side, lift-off, sensor type, and waveform
- [x] Specify classification inputs/labels for each group protocol
- [x] Specify regression inputs/targets using corrosion lateral surface patches shaped `n x n x 500`
- [ ] Inspect `outputs/splits/split_coverage.md` before any training run
- [ ] Export reviewed TDMS files as processed `.npy` arrays
- [ ] Plot exported `.npy` arrays for preprocessing QA
- [ ] Compare depth-axis background removal methods for feature-map previews
- [ ] Decide how `status=short` TDMS files should be handled during processing

### Waiting
- [ ]

### Later
- Revisit model training only after planning, preprocessing, masks, LOI windows, exports, statistical visualization, TSNR/PCA review, and grouped-dataset definitions are stable
- Keep `src/ndt_pect_baseline/template_training/` as the only training reference path
