# Baseline Model for NDT Data — Results

## Current State

- Point-level split protocol is active; file/export-level splits are retired.
- Point-classification trainer and batch runner are implemented.
- First point-classification baseline completed on `same_lift_off/z1`.
- Next step: run the `binary-corrosion` + `weighted_sampler` sweep, then a full sweep across protocols and datasets.

## Retired File-Level Split Experiments — 2026-06-07

File/export-level splits produced poor results and were removed. Do not use old split manifests or training commands for new work.

Historical note: multiclass template sanity and depth TCN regression on grouped file-level splits underperformed random/mean baselines.

## Regression Same-Sensor Auto Selection — 2026-06-16

- `ndt train regression --model auto` now evaluates `--auto-models` candidates by validation R² and falls back to `mean_baseline` if no candidate beats the mean baseline.
- `ndt train regression-batch` now defaults to `same_sensor` protocol and `auto` model selection.
- Smoke test on tiny `depth/same_sensor/HallAirCore` subset selected `random_forest` over the mean baseline with val R² `0.0683` and test R² `0.0430`; smoke artifacts were removed after verification.

## Notable Findings

- TDMS raster: direct `reshape(300, 301, 500)` is correct but needs serpentine raster correction; otherwise plots show diagonal fold artifacts. Backside scans need a 180° rotation after correction.
- Short TDMS files: the loader must handle missing scan points (17 of 144 trusted files are short, each by 1 scan point).
- Differential sensor dataset added: 36 TDMS files, completing 144 total files across Differential, HallAirCore, HallPotCore, and TMR.
- `ERR Bo sung` corrections applied: HallAirCore Mixed Chirp z3 and TMR Corrosion Square frontside z1 replaced; old files archived under `~/Documents/NDT-data-archived/replaced-errors`.
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
