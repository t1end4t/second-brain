# Baseline Model for NDT Data — TODO

## Active Phase

### Now
- [x] Read draft paper for dataset context before touching TDMS data
- [x] Inspect local `~/Documents` TDMS file layout only
- [x] Create TDMS inventory in execution repo
- [x] Verify inventory status under `verification/`: current saved inventory is stale for full `~/Documents` scope
- [x] Decide trusted inventory scope: use separate raw and preferred inventories
- [x] Verify safe TDMS loader behavior under `verification/`, including complete files, short files, and skipped missing paths
- [x] Verify quick heatmaps / raster orientation with reviewed evidence, not only generated PNGs
- [x] Verify Slice / LOI / Peak feature-map previews with counts, shapes, example plots, and known failure cases; LOI-window choice deferred
- [x] Register preferred training dataset at `~/Documents/user_preferred_tdms`
- [x] Register lift-off CSV folder for LOI plotting at `~/Documents/Lift-off`
- [x] Write `verification/PROCESSING_VERIFICATION.md` for structural preprocessing evidence; LOI choice remains provisional

### Next
- [x] Define corrosion-detection label schema from specimen masks
- [x] Define regression targets for depth/diameter/volume
- [x] Verify `~/Documents/user_preferred_tdms` schema and stored TDMS preferred properties under `verification/`
- [x] Verify preferred-TDMS loader reshapes from stored `preferred_rotation_deg` without extra transforms
- [x] Verify extracted Slice / LOI / Peak feature-map array integrity from preferred TDMS cubes
- [ ] Choose/review LOI windows before trusting LOI feature values
- [ ] Review overlays to verify transformed corrosion masks visually align with each TDMS preferred coordinate frame
- [x] Verify pixel-level corrosion dataset structure: features `[slice, loi, peak]`, label `corrosion_mask`; still provisional until LOI review
- [x] Verify leakage-safe train/validation/test split by specimen/probe/waveform/condition/file
- [x] Keep first classical corrosion detector baseline as provisional until LOI-window review is complete
- [x] Keep AUROC, AUPRC, F1, confusion matrix, and overlays as provisional until LOI-window review is complete
- [x] Inventory `~/Documents/Lift-off` CSV filenames and parse metadata: probe, specimen, waveform, amplitude, lift-off range, air/no-defect reference
- [x] Inspect `~/Documents/Lift-off` CSV schema for LOI plotting; expected lift-off files contain 6 x 500 transient points for 1-5 mm plus Air
- [ ] Build local Streamlit LOI selection app for lift-off review
- [ ] Save approved LOI windows to `configs/loi_windows.csv`
- [ ] Update pixel dataset builder to read approved LOI config
- [ ] Rebuild dataset with `[slice, peak, loi]` and compare against `[slice, peak]`
- [ ] Review lift-off LOI plots/app and choose good LOI windows manually before final feature extraction/training

### Corrosion Detection Baseline Plan

1. Load preferred TDMS files → verify: waveform reshapes to stored preferred shape (`300 x 301` or `301 x 300`) without re-rotation/re-flip.
2. Compute simple maps → verify: each file produces aligned Slice and Peak maps first; add LOI only after `configs/loi_windows.csv` is approved.
3. Generate corrosion labels → verify: corrosion mask is transformed/cropped to exactly match each feature-map shape.
4. Build pixel dataset → verify: each row has `[slice, peak]` initially, then `[slice, peak, loi]` after LOI approval, binary label, file/probe/specimen/waveform metadata.
5. Split leakage-safely → verify: no source file/condition group appears in more than one split.
6. Train simple baseline → verify: logistic regression or random forest trains reproducibly from saved features.
7. Report metrics and plots → verify: save AUROC/AUPRC/F1 plus per-file prediction overlays in `outputs/`.

### Later
- [ ] Add CNR calculation per corrosion defect
- [ ] Compare probe/waveform/lift-off conditions
- [ ] Try image/C-scan model after baseline features

## Done
- [x] Captured mission and constraints in `Project.md`
- [x] TDMS-only saved inventory: 115 rows; verification found current full `~/Documents` scan has 167 TDMS files
- [x] Created separate trusted inventories: `inventories/raw_tdms_inventory.csv` with 113 rows and `inventories/preferred_tdms_inventory.csv` with 54 rows
- [x] Noted loader risk: saved inventory has 20 short waveform arrays
- [ ] Created single-TDMS heatmap preview script and output PNG in execution repo; needs verification evidence
- [ ] Created batch TDMS feature-map previews: 113 PNGs generated, 2 missing raw files skipped; needs verification evidence
- [x] Switched preferred-orientation workflow to `external/CorrosionFlip.xlsx`
- [x] Added export script for user-preferred TDMS orientation artifacts
- [x] User provided processed preferred dataset for training: `~/Documents/user_preferred_tdms`
- [x] User provided lift-off CSVs for LOI plotting: `~/Documents/Lift-off`
- [x] Added lift-off LOI inventory and plotting CLI: `ndt-plot-lift-off-loi`
- [x] Updated lift-off LOI plots to show 1-5 mm curves minus Air reference.

## 2026-05-08 — Orientation/crop calibration

- [ ] Add orientation-check script that plots original Slice/LOI/Peak, mask, and rotated Slice/LOI/Peak with degree label.
- [ ] Add crop support so outline/high-edge signal is excluded from scoring/model inputs.
- [ ] Save cropped mask artifacts for downstream detection baseline.
- [ ] Review overlay outputs and decide global vs per-file orientation.
