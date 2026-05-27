# Baseline Model for NDT Data — Decisions

## Template

## 2026-05-27 — 1D CNN focal-loss package training

- For the single-TDMS 1D A-scan CNN, use the external `focal-loss` package with TensorFlow/Keras instead of a local PyTorch focal-loss implementation.
- Default to `--loss focal --balance none` to avoid combining focal loss with synthetic positive samples before measuring the effect.
- Keep `--balance oversample`, `--balance smote`, and `--loss bce` available for controlled comparisons.
- Treat `focal + SMOTE` as an experiment, not the default, because SMOTE can create unrealistic interpolated waveforms and focal loss may already push recall upward.

## 2026-05-27 — 2D CNN feature-map sanity check

- Low single-TDMS model performance may be caused by spatially varying background/lift-off baseline, not only model capacity.
- A 2D CNN can use local spatial context and edges, but it is not automatically invariant to background; keep depth-axis background removal and per-channel normalization before training.
- First 2D experiment should not consume raw `270 x 270 x 500` volumes. Build compact 2D feature channels from background-removed A-scans first: peak amplitude, LOI energy, and peak prominence from raw/median/Savitzky-Golay/Gaussian high-pass variants.
- Treat this as a single-TDMS debugging sanity check with point-level train/validation masks. Final validation still needs whole-TDMS file/scenario splits.

## 2026-05-27 — Single-TDMS z1 training sanity check

- Before training a frontside TMR corrosion model across files, debug model performance on one processed `.npy` export only.
- Use `outputs/single_tdms_npy/tmr_corosion_frontside_chirp_300x300_z1_20260128_015728/` as the first training dataset because this z1 scan currently looks best.
- Training inputs are `X.npy`, `y.npy`, and `meta.json`; do not read or preprocess TDMS inside the training command.
- The exported shape is `X.shape == (72_900, 500)`, `y.shape == (72_900,)`, and `image_shape == (270, 270)`.
- For this sanity check only, split train/validation by points inside this single TDMS file. This intentionally relaxes the usual file-level split rule and is not a final generalization estimate.
- Keep all crop/rotate/serpentine preprocessing in the export step. Training and plotting should consume the processed `.npy` files directly.
- Match the modeling template more closely by applying SMOTE to the training split only before normalization, then saving raw and median/Gaussian-smoothed probability maps.

## 2026-05-27 — TMR-only separate side/specimen models

- Focus modeling on the TMR dataset only because its signal quality is currently best.
- Train separate models for each acquisition side and specimen type instead of mixing them.
- If both frontside and backside data are available for corrosion and mixed specimens, this produces four model groups: TMR frontside corrosion, TMR backside corrosion, TMR frontside mixed, and TMR backside mixed.
- Keep whole TDMS file/scenario split rules inside each model group; do not split point samples across train/val/test.
- Use `templates/MonteCarlo_Deep.py` as a reference for the modeling pipeline: reshape point waveforms to `(n_samples, 500, 1)`, normalize using training data, train a binary classifier, then reshape predictions back to a raster for visualization.
- First modeling experiment should use a single TDMS file only before building full split-aware group datasets.

## 2026-05-13 — Raw TDMS rotate/crop app is active preprocessing path

- The local Streamlit rotate/crop app is the active tool for raw TDMS preprocessing review.
- Reviewed rotations, flips, and crops are saved per file as JSON metadata before downstream LOI/model work.
- Serpentine raster correction and backside 180° rotation remain part of the standard pipeline; the app only handles the final transform/crop selection.
- Do not revert to the older "skip orientation" bypass once reviewed metadata exists for a file.

## 2026-05-07 — TDMS-first workflow

- Focus on TDMS files first; metadata lookup is deferred until labels are needed.
- Build a safe TDMS loader before heatmaps, feature extraction, or modeling.
- Treat raw files in `~/Documents` as read-only.

## 2026-05-07 — TDMS raster orientation for feature maps

- Treat TDMS waveform data as fixed logical shape `300 x 301 x 500`.
- Apply serpentine raster correction before feature extraction/plotting.
- Apply backside 180° rotation after serpentine correction.
- Use Slice / LOI / Peak as simple preview features that collapse `300 x 301 x 500` to `300 x 301`.

## 2026-05-11 — Lift-off LOI marker convention

- LOI candidates on differentiated lift-off curves are crossing points between adjacent positive/negative lobes, not lobe peaks.
- Select crossings from the mean differentiated signal after subtracting Air and low-pass filtering.
- Keep a crossing only when the lift-off spread has strong lobes on both sides of the crossing.
- For LOI-value plots, use a centered sample window around each LOI crossing instead of one single sample.
- For preferred TDMS LOI-method plots, create one image per TDMS file with one subplot per LOI center when the LOI count is manageable.
- When plotting exported preferred TDMS files, read the stored preferred shape/properties instead of assuming `300 x 301`; 90°/270° rotations are stored as `301 x 300`.

## 2026-05-12 — Review LOI windows before using LOI features

- Build a local Streamlit app for LOI review/selection only; no web deployment.
- Use lift-off CSVs from `~/Documents/Lift-off` as read-only inputs.
- Group approved LOI windows by `(specimen, waveform)` rather than per TDMS file.
- Save human-approved LOI windows under `configs/`, starting with `configs/loi_windows.csv`.
- LOI selection must allow manual center edits because some automatic LOI lines are poor.
- The LOI selection app should load existing PNG previews from `outputs/preferred_tdms_loi_method`; plotting/regeneration stays in `ndt-plot-preferred-tdms-loi-method`.
- Manual correction of poor automatic LOI points is done in a separate editor app that writes back to `configs/lift_off_loi_inventory.csv`.

## 2026-05-26 — Reset to preprocessing only

- Removed old model code, split artifacts, saved weights, and generated `outputs/` artifacts.
- Current project scope is TDMS inventory, orientation/crop review, LOI review, masks, and feature-map previews.

## 2026-05-26 — Corrosion training data sanity checks before modeling

- First corrosion-detection model should use each spatial scan point waveform as one sample: input `1 x 500`, from TDMS cube `data[row, col, :]`.
- Binary label comes from the corrosion mask at the same spatial coordinate: `mask[row, col] > 0` means corrosion, `mask[row, col] == 0` means background.
- Training data generation must verify `data.shape == (300, 301, 500)` and `mask.shape == (300, 301)` before flattening (after normalization, both become square).
- Apply serpentine correction, rotation, flip, and crop to TDMS data before label extraction; apply crop only to canonical masks.
- Do not random-split individual points from the same map across train/val/test. Split by whole TDMS file or scenario first, then flatten points inside each split.
- Before training, generate a visual overlay of TDMS peak/LOI map plus corrosion mask and confirm the mask aligns with signal anomalies.

## 2026-05-26 — Normalize rotated data to square 300×300

- After rotation (90°/270°), raw `300×301` becomes `301×300`. Normalize all post-rotation data to `300×300×500` by trimming the extra row/col.
- Apply same normalization to masks so `data.shape[:2] == mask.shape == (300, 300)`.
- This avoids shape mismatches in training data verification and simplifies downstream processing.
