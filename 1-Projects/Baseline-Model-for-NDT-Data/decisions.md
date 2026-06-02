# Baseline Model for NDT Data — Decisions

## Template

## 2026-05-30 — Return to planning before training

- Do not jump directly to model training.
- First create exploratory statistical visualizations, including mean, max, distribution, and related dataset summaries.
- Use TSNR and PCA as feature-visibility checks before finalizing modeling inputs.
- Define grouped-dataset protocols for both classification and regression before implementation.
- Required grouping axes are specimen, lift-off, sensor type, and waveform.
- For regression, do not treat one waveform sample vector shaped `1 x 500` as one independent input.
- Regression inputs should preserve local corrosion surface context as patches shaped `n x n x 500`, where `n x n` represents the lateral corrosion surface area.

## 2026-06-02 — Classification label policy

- Binary smoke training may use corrosion labels only: `0=non-corrosion`, `1=corrosion`.
- Full classification should use three classes: `0=background`, `1=rivet`, `2=corrosion`.
- Build three-class labels from `y_rivet.npy` and `y_corrosion.npy` when both are present.
- If rivet and corrosion masks overlap, corrosion wins and the pixel label is `2`.
- In multiclass mode, corrosion-only exports with only `y.npy` map to `0=background`, `2=corrosion` with no rivet class present in that export.

## 2026-05-13 — Raw TDMS rotate/crop app is active preprocessing path

- The local Streamlit rotate/crop app is the active tool for raw TDMS preprocessing review.
- Reviewed rotations, flips, and crops are saved per file as JSON metadata before downstream LOI work.
- Serpentine raster correction and backside 180° rotation remain part of the standard pipeline; the app only handles the final transform/crop selection.
- Do not revert to the older "skip orientation" bypass once reviewed metadata exists for a file.

## 2026-05-07 — TDMS-first workflow

- Focus on TDMS files first; metadata lookup is deferred until labels are needed.
- Build a safe TDMS loader before heatmaps or feature extraction.
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

- Removed old downstream-analysis code, split artifacts, saved weights, and generated `outputs/` artifacts.
- Current project scope is TDMS inventory, orientation/crop review, LOI review, masks, and feature-map previews.

## 2026-05-26 — Normalize rotated data to square 300×300

- After rotation (90°/270°), raw `300×301` becomes `301×300`. Normalize all post-rotation data to `300×300×500` by trimming the extra row/col.
- Apply same normalization to masks so `data.shape[:2] == mask.shape == (300, 300)`.
- This avoids shape mismatches and simplifies downstream processing.
