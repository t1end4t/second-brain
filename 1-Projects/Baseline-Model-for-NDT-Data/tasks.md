# Baseline Model for NDT Data — TODO

## Active Phase

### Now
- [ ] Train a first model using only the processed z1 frontside TMR corrosion `.npy` export, with point-level train/val split inside that file
- [ ] Compare 1D CNN imbalance settings on the single-TDMS export: focal/no-balancing, focal/oversample, focal/SMOTE, and BCE/SMOTE
- [ ] Compare depth-axis background removal before training: median baseline, Savitzky-Golay baseline, Gaussian high-pass, robust per-A-scan normalization, and peak/LOI/prominence maps
- [ ] Train a small 2D CNN on background-removed feature-map channels from the same single-TDMS export; use it only as a spatial-context sanity check, not final validation

### Next
- [x] Export one TMR TDMS as processed `.npy` arrays: `X.shape == (72_900, 500)`, `y.shape == (72_900,)`, `image_shape == (270, 270)`
- [ ] Update training to consume `outputs/single_tdms_npy/tmr_corosion_frontside_chirp_300x300_z1_20260128_015728/X.npy` and `y.npy` directly
- [ ] Fit normalization on the single-TDMS training subset and keep prediction-map reshape back to `270 x 270`
- [ ] Compare 1D A-scan CNN against 2D feature-map CNN using the same single-TDMS point-level validation mask
- [ ] Define TMR-only split strategy for separate side/specimen model groups, using whole TDMS file/scenario groups before point flattening
- [ ] Review or regenerate split manifests for TMR-only model groups: frontside corrosion, backside corrosion, frontside mixed, and backside mixed when available
- [ ] Decide how `status=short` TDMS files should be handled in train/val/test
- [ ] Generate split-aware arrays from `X`, `y`, and approved TMR-only manifests
- [x] Reset project to preprocessing/data-review only by removing model code, split artifacts, and generated outputs
- [x] Review raw TDMS rotation/crop choices in app
- [x] Save reviewed rotate/crop choices as preprocessing metadata in `configs/raw_tdms_rotate_crop.csv`
- [x] Review LOI windows in app and save approved windows to `configs/loi_windows.csv`
- [x] Select per-file best LOI windows and save them to `configs/selected_loi_windows.csv`
- [x] Verify corrosion training sample mapping: `300 x 301 x 500` TDMS cube first trims the extra column to `300 x 300 x 500`, then applies the approved `15` px crop on each side to produce `270 x 270 x 500`; flatten each TDMS to `X.shape == (72_900, 500)` and `y.shape == (72_900,)`

### Waiting
- [ ] 

### Later
- Extend the split strategy beyond corrosion-only detection when mixed/rivet targets are ready
- Regression target definition
