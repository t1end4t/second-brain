# Baseline Model for NDT Data — TODO

## Active Phase

### Now
- [x] Read draft paper for dataset context before touching TDMS data
- [x] Inspect local `~/Documents` TDMS file layout only
- [x] Create TDMS inventory in execution repo
- [x] Build safe TDMS loader for all files, including short files
- [x] Generate quick heatmaps to verify raster orientation
- [x] Generate Slice / LOI / Peak feature-map previews for available TDMS files

### Next
- [ ] Define label schema for rivet/corrosion classification
- [ ] Define regression targets for depth/diameter/volume
- [ ] Design leakage-safe train/validation/test split
- [ ] Save Slice / LOI / Peak feature maps as arrays for modeling
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

## 2026-05-08 — Orientation/crop calibration

- [ ] Add orientation-check script that plots original Slice/LOI/Peak, mask, and rotated Slice/LOI/Peak with degree label.
- [ ] Add crop support so outline/high-edge signal is excluded from scoring/model inputs.
- [ ] Save cropped mask artifacts for downstream detection baseline.
- [ ] Review overlay outputs and decide global vs per-file orientation.
