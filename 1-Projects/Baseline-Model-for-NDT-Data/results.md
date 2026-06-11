# Baseline Model for NDT Data — Results

## File-Level Split Experiments Retired — 2026-06-07

File/export-level split experiment code was removed from the active workflow after poor results. Historical grouped classification, grouped regression, split diagnostics, and template-training commands should not be used for new work.

- Removed experiment directory: `experiments/group_generalization_diagnosis/`
- Removed file-level split modules: `create_split_manifest.py`, `export_split_diagnostics.py`, `run_classification_training.py`, `training_runs.py`
- Removed template-training experiment package: `src/ndt_pect_baseline/template_training/`
- Removed active CLI dispatch for old split/training commands
- Removed unused old-training dependency: `imbalanced-learn`; `torch` was later re-added for the point-classification MLP trainer.
- Next modeling step: define and implement a point-level split protocol before training resumes.

## Retired Experiment Findings — 2026-06-02 to 2026-06-06

These results explain why the old path was removed. They are historical only.

- Multiclass template sanity run: poor recalls for background, rivet, and corrosion; validation loss increased while train loss decreased.
- Depth TCN regression on grouped file-level split: test MAE `0.4593`, RMSE `0.5497`, R2 `-1.5856`; worse than mean/random-forest baselines.
- Grouped classification and split-diagnostic runners depended on file/export-level manifests and are no longer part of the workflow.

## Exported TDMS Statistics Report — 2026-05-30

Added and ran one-file HTML report generation for exported TDMS `.npy` arrays.

- Command: `uv run ndt export stats --out outputs/report-tdms-npy-stats.html --sample-points 500 --pca-points 5000`
- Wrapper: `scripts/8-export-stats-report.sh`
- Module: `src/ndt_pect_baseline/export_stats_report.py`
- Input: `outputs/tdms_npy/`
- Output: `outputs/report-tdms-npy-stats.html`
- Contents: compact signal-character summaries, waveform morphology with IQR bands, peak-timing vs peak-to-peak scatter, sensor/condition feature fingerprint heatmap, TSNR summary, PCA of sampled waveforms, and dataset coverage counts. Removed the large per-export bookkeeping table from the report body.

## Project State Update — 2026-05-27

Project has moved back to preprocessing-first work.

- Reset is complete: old training code, split artifacts, checks, and generated outputs have been removed from the active workflow.
- Reviewed rotate/crop metadata is saved in `configs/raw_tdms_rotate_crop.csv`.
- Reviewed LOI candidates are saved in `configs/loi_windows.csv`; per-file selected LOI windows are saved in `configs/selected_loi_windows.csv`.
- Current outputs are focused on corrosion mask review under `outputs/corrosion_mask_review/`.
- Next work: continue TDMS processing QA before revisiting modeling.

## Raw Data Status Dashboard — 2026-05-14

Added a Streamlit dashboard to check project and raw-data health before entering rotate/crop review.

- Command: `uv run ndt raw status`
- Wrapper: `scripts/raw_data_status.sh`
- Input: `configs/raw_tdms_inventory.csv`
- Function: show file counts by sensor/specimen/condition/status/orientation, waveform length stats, short-files table, file existence check, and rotate/crop review progress from `configs/raw_tdms_rotate_crop.csv`
- Sidebar filters let users slice the inventory interactively
- Module: `src/ndt_pect_baseline/raw_data_status_app.py`

## LOI Selection App — 2026-05-14

Added a local Streamlit app for reviewing and saving LOI windows from lift-off CSVs.

- Command: `uv run ndt loi review`
- Wrapper: `scripts/loi_selection_app.sh`
- Module: `src/ndt_pect_baseline/loi_selection_app.py`
- Inputs: lift-off CSVs from `~/Documents/Lift-off`, TDMS inventory from `configs/raw_tdms_inventory.csv`
- Output: approved windows in `configs/loi_windows.csv`

## Best-LOI Selection App — 2026-05-27

Added and used a local Streamlit app to choose the best LOI window per TDMS file from reviewed LOI candidates.

- Command: `uv run ndt loi choose`
- Wrapper: `scripts/choose_loi_app.sh`
- Module: `src/ndt_pect_baseline/choose_loi_app.py`
- Inputs: `configs/raw_tdms_inventory.csv`, `configs/raw_tdms_rotate_crop.csv`, and `configs/loi_windows.csv`
- Output: selected per-file LOI windows in `configs/selected_loi_windows.csv`

## Rotate/Crop Review App — 2026-05-13

Added and adopted a local Streamlit app for first-step raw TDMS rotate/crop preprocessing review.

- Command: `uv run ndt preprocess review`
- Wrapper: `scripts/rotate_crop_app.sh`
- Input scope: raw TDMS from `configs/raw_tdms_inventory.csv`
- Function: load raw TDMS, fix serpentine raster, compute Peak map, rotate, crop, overlay specimen mask, and download `.npz` plus JSON metadata
- Archive update: unused `outputs/orientation_check/` moved to `archive/outputs_orientation_check/`

## Processing Verification Status — 2026-05-12

Preprocessing artifacts remain provisional until reviewed raw TDMS rotate/crop choices are saved as metadata and applied. Inventory verification on 2026-05-12 found `inventories/tdms_inventory.csv` stale for current full `~/Documents` scope: saved rows 115, rerun rows 167. Trusted raw audit scope is now `configs/raw_tdms_inventory.csv` from `~/Documents/NDT-data`.

## Trusted TDMS Inventories — 2026-05-12

Trusted raw inventory is separated from the stale original inventory.

- Raw audit inventory: `configs/raw_tdms_inventory.csv`, source `~/Documents/NDT-data`, 113 rows
- Raw counts: HallAirCore 36, HallPotCore 36, TMR 41; ok 93, short 20; deltas 0 x 93, -500 x 18, -1500 x 2

## TDMS Inventory — 2026-05-07

Original saved inventory; verification later found it stale for current full `~/Documents` scope. Raw data was not modified.

- Total TDMS files under `~/Documents`: 115
- HallAirCore: 38 files
- HallPotCore: 36 files
- TMR: 41 files
- Expected complete waveform length: 45,150,000 values
- Expected logical shape: 300 x 301 scan points x 500 samples
- Complete files: 95
- Short by 1 scan point: 18
- Short by 3 scan points: 2

Execution repo outputs:
- `configs/raw_tdms_inventory.csv`

Key implication: fix TDMS loading before modeling. Loader must handle short files explicitly.

## TDMS Feature Maps — 2026-05-07

Generated Slice / LOI / Peak feature-map previews from TDMS waveform data.

Processing rule:
- Load `Waveform` as fixed logical cube: `300 x 301 x 500`
- Correct serpentine raster ordering before plotting
- Rotate backside scans by 180° after raster correction
- Collapse the 500-sample waveform axis into one value per scan point
- Output each Slice / LOI / Peak map as `300 x 301`

Key finding: direct `reshape(300, 301, 500)` gives the expected cube but still needs serpentine raster correction; otherwise plots show diagonal fold artifacts.

## Point Split Manifest Added — 2026-06-07

Added grouped `ndt split points` for the next training path.

- Module: `src/ndt_pect_baseline/create_point_split_manifest.py`
- Output index: `outputs/point_splits/ndt-point-split-v1/README.md`
- Visual report: `outputs/point_splits/ndt-point-split-v1/report.html`
- Output manifests: `outputs/point_splits/<seed>/<protocol>/<dataset>/point_split_manifest.csv`
- Output summaries: `outputs/point_splits/<seed>/<protocol>/<dataset>/point_split_coverage.md`
- Default: `16 x 16` spatial blocks, all positive points, sampled background points per export
- `same_specimen` groups by specimen-side, so corrosion frontside and corrosion backside are split into separate datasets.

## Point Classification Trainer Added — 2026-06-07

Added `ndt train point-classification` for classification on grouped point-split manifests.

- Module: `src/ndt_pect_baseline/train_point_classification.py`
- Models: PyTorch `cnn1d` default, PyTorch `resnet1d`, PyTorch `mlp`, sklearn `logreg`, sklearn `random_forest`
- Label modes: `multiclass` (`background`, `rivet`, `corrosion`) and `binary-corrosion` (`non-corrosion`, `corrosion`)
- Inputs: `outputs/point_splits/<seed>/<protocol>/<dataset>/point_split_manifest.csv` and `outputs/tdms_npy/<export>/X.npy`
- Outputs: `metrics.json`, `confusion_matrix.csv`, `confusion_matrices.png`, `loss_curve.png` for PyTorch models, and prediction figures under `outputs/point_training/<seed>/<protocol>/<dataset>/<label-mode>/<model>/<balance-mode>/prediction_maps/<split>/<export>/`
- PyTorch `resnet1d`, `cnn1d`, and `mlp` support `--balance-mode none`, `class_weight`, and `weighted_sampler`; default is `class_weight`.
- PyTorch models use early stopping by default with `--early-stopping-patience 8`; disable with `--no-early-stopping`.

## Point Classification Batch Runner Added — 2026-06-07

Added `ndt train point-classification-batch` to run grouped point-classification jobs across protocols, datasets, label modes, models, and balance modes.

- Default batch scope: all grouped point-split datasets, both label modes, PyTorch `cnn1d`, and balance modes `class_weight`, `weighted_sampler`, `none`.
- Use `--all-experiments` for the standard 1D-CNN sweep: split seeds `ndt-point-split-v1` through `ndt-point-split-v5`, both label modes, and all valid balance modes.
- Use `--dry-run` to inspect commands before launching long runs.
- Existing `metrics.json` outputs are skipped unless `--overwrite` is passed.
