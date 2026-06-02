# Baseline Model for NDT Data — Results

## Multiclass Template Training Sanity Run — 2026-06-02

Ran a short grouped multiclass sanity train after adding three-class labels.

- Command: `uv run ndt-9-train-template-style --epochs 5 --label-mode multiclass --max-background-per-export 500 --out-dir outputs/template_style_training_sanity`
- Output: `outputs/template_style_training_sanity/same_lift_off_z1_multiclass/metrics.json`
- Labels: `0=background`, `1=rivet`, `2=corrosion`; corrosion wins overlaps.
- Train samples: 45,298 before SMOTE; 89,310 after SMOTE.
- Test recalls: background 0.245, rivet 0.206, corrosion 0.102.
- Loss decreased on train but validation loss increased, so this is a wiring/sanity pass only, not a ready full-training configuration.

## Exported TDMS Statistics Report — 2026-05-30

Added and ran one-file HTML report generation for exported TDMS `.npy` arrays.

- Command: `uv run ndt-8-export-stats-report --out outputs/tdms_npy_stats_report.html --sample-points 500 --pca-points 5000`
- Wrapper: `scripts/8-export-stats-report.sh`
- Module: `src/ndt_pect_baseline/export_stats_report.py`
- Input: `outputs/tdms_npy/`
- Output: `outputs/tdms_npy_stats_report.html`
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

- Command: `uv run ndt-2-raw-data-status`
- Wrapper: `scripts/raw_data_status.sh`
- Input: `configs/raw_tdms_inventory.csv`
- Function: show file counts by sensor/specimen/condition/status/orientation, waveform length stats, short-files table, file existence check, and rotate/crop review progress from `configs/raw_tdms_rotate_crop.csv`
- Sidebar filters let users slice the inventory interactively
- Module: `src/ndt_pect_baseline/raw_data_status_app.py`

## LOI Selection App — 2026-05-14

Added a local Streamlit app for reviewing and saving LOI windows from lift-off CSVs.

- Command: `uv run ndt-4-loi-selection-app`
- Wrapper: `scripts/loi_selection_app.sh`
- Module: `src/ndt_pect_baseline/loi_selection_app.py`
- Inputs: lift-off CSVs from `~/Documents/Lift-off`, TDMS inventory from `configs/raw_tdms_inventory.csv`
- Output: approved windows in `configs/loi_windows.csv`

## Best-LOI Selection App — 2026-05-27

Added and used a local Streamlit app to choose the best LOI window per TDMS file from reviewed LOI candidates.

- Command: `uv run ndt-5-choose-loi`
- Wrapper: `scripts/choose_loi_app.sh`
- Module: `src/ndt_pect_baseline/choose_loi_app.py`
- Inputs: `configs/raw_tdms_inventory.csv`, `configs/raw_tdms_rotate_crop.csv`, and `configs/loi_windows.csv`
- Output: selected per-file LOI windows in `configs/selected_loi_windows.csv`

## Rotate/Crop Review App — 2026-05-13

Added and adopted a local Streamlit app for first-step raw TDMS rotate/crop preprocessing review.

- Command: `uv run ndt-3-rotate-crop-app`
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
