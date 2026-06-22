# Baseline Model for NDT Data — Decisions

## 2026-06-12 — Temporary classification training scope

- First quick runs use `binary-corrosion` labels + `weighted_sampler` balance mode.
- Revisit the full sweep (multiclass, all balance modes, all protocols/datasets) after initial results.

## 2026-06-09 — Classification and regression model roadmaps

- Classification comparison: `1D-CNN`, `ResNet1D`, `InceptionTime`, `TCN`, `MLP`, `logreg`, `random_forest`.
- Regression comparison: `random_forest`, `cnn1d`, `resnet1d`, `inception_time`, `tcn1d`.
- MLP is a weak baseline, not the main model.

## 2026-06-07 — Retire file-level split experiments

- File/export-level splits produced poor results; do not use them for new training.
- Next training must use grouped point-level splits with explicit leakage controls.

## 2026-06-02 — Classification label policy

- Multiclass labels: `0=background`, `1=rivet`, `2=corrosion`.
- Binary option: `0=non-corrosion`, `1=corrosion`.
- Build labels from `y_rivet.npy` and `y_corrosion.npy` when present; corrosion wins on overlap.
- Corrosion-only exports in multiclass map to `0` and `2`.

## 2026-05-30 — Return to planning before training

- Do not jump to training before exploratory stats, TSNR/PCA, and grouped-dataset protocols.
- Group by specimen, lift-off, sensor type, and waveform.
- Regression inputs should preserve local corrosion context as `n x n x 500` patches.

## 2026-05-26 — Normalize rotated data to square 300×300

- Trim the extra row/col after 90°/270° rotation to `300 x 300 x 500`.
- Apply the same normalization to masks so data and mask shapes match.

## 2026-05-13 — Rotate/crop app is the active preprocessing path

- Use the Streamlit rotate/crop app for raw TDMS alignment review.
- Save reviewed transforms per file as JSON metadata before LOI work.
- Serpentine raster correction and backside 180° rotation remain standard pipeline steps.

## 2026-05-12 — Review LOI windows before using LOI features

- Build a local Streamlit LOI review app.
- Group approved LOI windows by `(specimen, waveform)`.
- Allow manual center edits; save approved windows under `configs/`.

## 2026-05-11 — Lift-off LOI marker convention

- LOI candidates are crossings between adjacent positive/negative lobes on the mean differentiated signal after Air subtraction and low-pass filtering.
- Keep a crossing only when the lift-off spread has strong lobes on both sides.
- Use a centered sample window around each LOI crossing.

## 2026-05-07 — TDMS-first workflow

- Focus on TDMS files first; metadata lookup is deferred until labels are needed.
- Build a safe TDMS loader before heatmaps or feature extraction.
- Treat raw files in `~/Documents` as read-only.

## 2026-05-07 — TDMS raster orientation

- Logical shape: `300 x 301 x 500`.
- Apply serpentine raster correction, then backside 180° rotation.
- Slice/LOI/Peak previews collapse the 500-sample axis to `300 x 301`.
