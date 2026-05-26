# Baseline Model for NDT Data — Results

## Raw Data Status Dashboard — 2026-05-14

Added a Streamlit dashboard to check project and raw-data health before entering rotate/crop review.

- Command: `uv run ndt-raw-data-status`
- Wrapper: `scripts/raw_data_status.sh`
- Input: `configs/raw_tdms_inventory.csv`
- Function: show file counts by sensor/specimen/condition/status/orientation, waveform length stats, short-files table, file existence check, and rotate/crop review progress from `configs/raw_tdms_rotate_crop.csv`
- Sidebar filters let users slice the inventory interactively
- Module: `src/ndt_pect_baseline/raw_data_status_app.py`

## LOI Selection App — 2026-05-14

Added a local Streamlit app for reviewing and saving LOI windows from lift-off CSVs.

- Command: `uv run ndt-loi-selection-app`
- Wrapper: `scripts/loi_selection_app.sh`
- Module: `src/ndt_pect_baseline/loi_selection_app.py`
- Inputs: lift-off CSVs from `~/Documents/Lift-off`, TDMS inventory from `configs/raw_tdms_inventory.csv`
- Output: approved windows in `configs/loi_windows.csv`

## Rotate/Crop Review App — 2026-05-13

Added and adopted a local Streamlit app for first-step raw TDMS rotate/crop preprocessing review.

- Command: `uv run ndt-rotate-crop-app`
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
