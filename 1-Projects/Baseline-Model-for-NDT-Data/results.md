# Baseline Model for NDT Data — Results

## Project State Update — 2026-05-27

Project has moved from reset/preprocessing review into corrosion-detection split strategy work.

- Reset is complete: model code, split artifacts, and old generated model outputs have been removed from the active workflow.
- Reviewed rotate/crop metadata is saved in `configs/raw_tdms_rotate_crop.csv`.
- Reviewed LOI candidates are saved in `configs/loi_windows.csv`; per-file selected LOI windows are saved in `configs/selected_loi_windows.csv`.
- Current outputs are focused on corrosion masks and corrosion training-data checks under `outputs/corrosion_mask_review/` and `outputs/corrosion_training_data_check/`.
- Current split input is `configs/corrosion_tdms_split_manifest.csv`: 54 corrosion TDMS rows total, with 39 train, 9 validation, and 6 test rows. Status counts are 45 `ok` and 9 `short`.
- Next work: finalize the split strategy for existing corrosion-detection `X` and `y`, keeping split boundaries at whole TDMS file/scenario level before flattening points.

## Single-TDMS 2D CNN Smoke Test — 2026-05-27

Added a 2D feature-map CNN path for the current z1 frontside TMR corrosion export.

- Command: `uv run ndt-7-train-single-tdms-2d-cnn`
- Wrapper: `scripts/7-train-single-tdms-2d-cnn.sh`
- Module: `src/ndt_pect_baseline/train_single_tdms_2d_cnn.py`
- Input: `outputs/single_tdms_npy/tmr_corosion_frontside_chirp_300x300_z1_20260128_015728/X.npy`, `y.npy`, and `meta.json`
- Default channels: peak amplitude, LOI energy, and peak prominence maps from raw, median-baseline, Savitzky-Golay, and Gaussian high-pass A-scan variants.
- Training rule: fit per-channel normalization on train pixels only, use point-level train/validation masks inside the single image, and save probability maps reshaped to `270 x 270`.
- Smoke command run: `uv run ndt-7-train-single-tdms-2d-cnn --epochs 1 --features peak_amplitude,loi --out-dir outputs/single_tdms_2d_cnn_smoke`
- Smoke output: `outputs/single_tdms_2d_cnn_smoke/tmr_corosion_frontside_chirp_300x300_z1_20260128_015728/`
- One-epoch smoke metrics: validation precision `0.0322`, recall `0.6022`, F1 `0.0612`, average precision `0.0292`.
- Interpretation: this verifies the 2D pipeline runs; it is not a useful model yet and is not a final generalization estimate.

## Single-TDMS 1D CNN Focal-Loss Package Smoke Test — 2026-05-27

Updated the single-TDMS 1D A-scan CNN trainer to use TensorFlow/Keras with the external `focal-loss` package.

- Command: `uv run ndt-7-train-single-tdms-cnn`
- Module: `src/ndt_pect_baseline/train_single_tdms_cnn.py`
- Dependency: `focal-loss`, which brings TensorFlow/Keras.
- Default imbalance setting is `--loss focal --balance none`.
- Existing comparison settings remain available: `--balance oversample`, `--balance smote`, and `--loss bce`.
- Model output is `model.keras` instead of the old PyTorch `model.pt`.
- Smoke command run: `uv run ndt-7-train-single-tdms-cnn --epochs 1 --batch-size 1024 --loss focal --balance none --out-dir outputs/single_tdms_cnn_focal_loss_pkg_smoke`
- Smoke output: `outputs/single_tdms_cnn_focal_loss_pkg_smoke/tmr_corosion_frontside_chirp_300x300_z1_20260128_015728/`
- One-epoch smoke metrics: validation precision `0.0`, recall `0.0`, F1 `0.0`, average precision `0.0073`.
- Interpretation: this verifies the package-based focal-loss training path runs; one epoch with no balancing is undertrained and predicted no positives.

## Training Data Verification — 2026-05-27

Training-data verification is in good shape for the current corrosion baseline workflow.

- Verified target construction path: raw TDMS waveform cube `300 x 301 x 500` is first trimmed to the useful `300 x 300 x 500` spatial field, then reviewed rotate/crop transforms are applied before flattening into per-point `1 x 500` samples.
- Training data must come from the final cropped region only. Do not train on the full `300 x 300` field; pixels outside the reviewed crop are not part of the training set.
- After crop, per-map shapes are `X = (H * W, 500)` and `y = (H * W,)`, where `H x W` is the reviewed crop size after rotation/cropping.
- Verification focus: same trim/rotate/crop transforms for feature maps and masks, overlay checks before sample flattening, and whole-map awareness before split definition.
- Current note: corrosion-detection `X` and `y` are ready for split-strategy work; split policy still needs final review at whole TDMS file/scenario level.
- Do not random-split flattened points from the same map; keep split boundaries at TDMS file/scenario level.

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

## Draft Paper vs Current Dataset Gap Check — 2026-05-15

Compared the newly copied draft paper `3-Resources/raw/Development of an Experimental Pulsed Eddy Current Testing Dataset for Defect Detection in Aircraft Aluminum Structures.docx` against current baseline-project dataset status.

Main gap: the paper describes a complete 144-scenario dataset, but the current trusted local inventory has 113 TDMS rows in `configs/raw_tdms_inventory.csv` from `~/Documents/NDT-data`.

Expected paper scenario count:
- TSC: likely `4 probes × 3 waveforms × 3 lift-offs × 2 sides = 72`
- ISC1: `4 probes × 3 waveforms × 3 lift-offs = 36`
- ISC2: `4 probes × 3 waveforms × 3 lift-offs = 36`
- Total: `144`

Observed trusted inventory:
- Total TDMS rows: 113
- HallAirCore: 36
- HallPotCore: 36
- TMR: 41
- No clear Differential Pot-core category in current trusted inventory

Specific gaps and inconsistencies:
- Fourth probe gap: the paper lists Hall Air-core, Hall Pot-core, TMR Pot-core, and Differential Pot-core; current inventory appears to track only HallAirCore, HallPotCore, and TMR.
- Lift-off inconsistency: the dataset design says three lift-offs (`1`, `2`, `3` mm), but technical validation text references five lift-offs (`1`–`5` mm). Current project assumes three lift-offs.
- TDMS length gap: paper describes every record as `300 × 301 × 500 = 45,150,000` float64 samples; current inventory has 93 complete files, 18 short by one scan point, and 2 short by three scan points.
- Repository-structure gap: paper expects `/TSC/`, `/ISC1/`, `/ISC2/`, `/Python_Scripts/`, and README metadata/coordinate maps for 81 locations; current baseline relies on local inventories, masks, and apps.
- ISC1 table ambiguity: draft table header shows the last diameter column as `Ø3 mm`, but the project interpretation expects `Ø7 mm`; likely paper typo.
- ISC2 label conflict: draft table assigns `Dp=1.27 mm` to `#26`, `#27`, `#28`, `#29`, and `#31`; current project interpretation assigns these corrosion IDs `Dp=1.0 mm` and treats `Dp=1.27` as related to upper rivet-only locations/callouts. Must verify before regression labels.
- Defect-count wording: paper says coordinate maps for 81 defects, but ISC2 includes rivet-only no-corrosion IDs; use “81 locations/IDs” unless corrosion-only is confirmed.
- CNR/SNR inconsistency: table gives CNR values `8.9519`, `6.7429`, `4.0219`, while text says CNR drops from `2.80` to `1.59`; do not copy validation metrics blindly.

Practical next checks:
- Build expected scenario manifest from `specimen × probe × waveform × lift-off × side`.
- Diff expected scenarios against `configs/raw_tdms_inventory.csv`.
- Confirm whether Differential Pot-core files exist under another naming convention.
- Verify whether lift-off `4` and `5` mm files exist or only appear in validation figures.
- Resolve ISC2 `Dp=1.27` vs `Dp=1.0` before regression-target generation.

Manifest diff quick check from local folders:
- Local TDMS files under `~/Documents/NDT-data`: 113.
- HallAirCore has a complete 36-scenario set under current 3-probe interpretation: TSC corrosion front/back `18`, ISC1 rivet `9`, ISC2 mixed `9`.
- HallPotCore has a complete 36-scenario set under current 3-probe interpretation: TSC corrosion front/back `18`, ISC1 rivet `9`, ISC2 mixed `9`.
- TMR has 41 files: TSC corrosion front/back `18`, ISC2 mixed `9`, ISC1 rivet `14`.
- TMR/Rivet contains duplicate or repeated runs: Gaussian has two files for each `z1/z2/z3`; Square has duplicates for `z2/z3`; Chirp has one file per `z1/z2/z3`.
- If expected current local release is only 3 probes, the complete unique scenario count should be `3 probes × 36 = 108`; local data has 113 because of 5 extra TMR/Rivet repeat files.
- If expected paper release is 4 probes, then the missing block is exactly the 36-scenario Differential Pot-core set, while the 5 extra TMR/Rivet repeats partly mask the gap in raw file count: `144 expected - 36 missing + 5 duplicates = 113 observed`.
