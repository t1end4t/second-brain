# Baseline Model for NDT Data — Results

## Current State

- Point-level split protocol is active; file/export-level splits are retired.
- Point-classification trainer and batch runner are implemented.
- First point-classification baseline completed on `same_lift_off/z1`.
- Next step: run the `binary-corrosion` + `weighted_sampler` sweep, then a full sweep across protocols and datasets.

## Retired File-Level Split Experiments — 2026-06-07

File/export-level splits produced poor results and were removed. Do not use old split manifests or training commands for new work.

Historical note: multiclass template sanity and depth TCN regression on grouped file-level splits underperformed random/mean baselines.

## Notable Findings

- TDMS raster: direct `reshape(300, 301, 500)` is correct but needs serpentine raster correction; otherwise plots show diagonal fold artifacts. Backside scans need a 180° rotation after correction.
- Short TDMS files: the loader must handle missing scan points (20 of 113 trusted files are short).
- LOI markers are lobe-crossings on the mean differentiated signal after Air subtraction and low-pass filtering, not lobe peaks.
- Post-rotation shape normalization: trim `300×301` rotated data to `300×300×500` and apply the same to masks.
- Classification: temporary best path is `binary-corrosion` + `weighted_sampler` (macro F1 0.48, balanced accuracy 0.56); revisit the full sweep later.

## Tooling

- `uv run ndt status` — project health check.
- `uv run ndt raw status` — raw-data dashboard.
- `uv run ndt preprocess review` — rotate/crop review → `configs/raw_tdms_rotate_crop.csv`.
- `uv run ndt loi review` — LOI candidate review → `configs/loi_windows.csv`.
- `uv run ndt loi choose` — choose best LOI per file → `configs/selected_loi_windows.csv`.
- `uv run ndt export tdms` → `outputs/tdms_npy/<export>/`.
- `uv run ndt plot tdms` → PNG QA plots.
- `uv run ndt export stats` → `outputs/report-tdms-npy-stats.html`.
- `uv run ndt export dataset-summary` → `outputs/report-dataset-summary.html`.
- `uv run ndt export mask-viewer` → `outputs/viewer-mask.html`.
- `uv run ndt split points` → `outputs/point_splits/ndt-point-split-v1/`.
- `uv run ndt train point-classification` / `point-classification-batch` → `outputs/point_training/...`.

See `docs/workflow.md` for the full pipeline and `docs/split_protocol.md` for split details.
