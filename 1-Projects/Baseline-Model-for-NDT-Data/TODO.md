# Baseline Model for NDT Data — TODO

## Active Phase

### Now
- [x] Read draft paper for dataset context before touching TDMS data
- [x] Inspect local `~/Documents` TDMS file layout only
- [x] Create TDMS inventory in execution repo
- [x] Build safe TDMS loader for all files, including short files
- [x] Generate quick heatmaps to verify raster orientation
- [x] Generate Slice / LOI / Peak feature-map previews for available TDMS files
- [x] Register preferred training dataset at `~/Documents/user_preferred_tdms`
- [x] Register lift-off CSV folder for LOI plotting at `~/Documents/Lift-off`

### Next
- [ ] Define label schema for rivet/corrosion classification
- [ ] Define regression targets for depth/diameter/volume
- [ ] Design leakage-safe train/validation/test split
- [ ] Inspect `~/Documents/user_preferred_tdms` schema for training inputs
- [ ] Inspect `~/Documents/Lift-off` CSV schema for LOI plotting
- [ ] Extract simple baseline features from transient signals
- [ ] Train first classical ML baseline

### Later
- [ ] Add CNR calculation per corrosion defect
- [ ] Compare probe/waveform/lift-off conditions
- [ ] Try image/C-scan model after baseline features

## Done
- [x] Captured mission and constraints in `Project.md`
- [x] TDMS-only inventory: 115 files found under `~/Documents`
- [x] Noted loader risk: 20 files have short waveform arrays
- [x] Created single-TDMS heatmap preview script and output PNG in execution repo
- [x] Created batch TDMS feature-map previews: 113 PNGs generated, 2 missing raw files skipped
- [x] Switched preferred-orientation workflow to `external/CorrosionFlip.xlsx`
- [x] Added export script for user-preferred TDMS orientation artifacts
- [x] User provided processed preferred dataset for training: `~/Documents/user_preferred_tdms`
- [x] User provided lift-off CSVs for LOI plotting: `~/Documents/Lift-off`

## 2026-05-08 — Orientation/crop calibration

- [ ] Add orientation-check script that plots original Slice/LOI/Peak, mask, and rotated Slice/LOI/Peak with degree label.
- [ ] Add crop support so outline/high-edge signal is excluded from scoring/model inputs.
- [ ] Save cropped mask artifacts for downstream detection baseline.
- [ ] Review overlay outputs and decide global vs per-file orientation.
