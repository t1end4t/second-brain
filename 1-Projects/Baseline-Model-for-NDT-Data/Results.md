# Baseline Model for NDT Data — Results

## Processing Verification Status — 2026-05-12

Preprocessing/model artifacts exist but are provisional until verified under `verification/`. Inventory verification on 2026-05-12 found `inventories/tdms_inventory.csv` stale for current full `~/Documents` scope: saved rows 115, rerun rows 167. Trusted scope is split into raw audit and preferred training inventories.

## Trusted TDMS Inventories — 2026-05-12

Trusted inventories are separated by source scope so raw files and processed preferred files are not mixed.

- Raw audit inventory: `inventories/raw_tdms_inventory.csv`, source `~/Documents/NDT-data`, 113 rows
- Raw counts: HallAirCore 36, HallPotCore 36, TMR 41; ok 93, short 20; deltas 0 x 93, -500 x 18, -1500 x 2
- Preferred training inventory: `inventories/preferred_tdms_inventory.csv`, source `~/Documents/user_preferred_tdms`, 54 rows
- Preferred counts: HallAirCore 18, HallPotCore 18, TMR 18; ok 54; delta 0 x 54

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
- `inventories/tdms_inventory.csv`

Key implication: fix TDMS loading before modeling. Loader must handle short files explicitly.

## TDMS Feature Maps — 2026-05-07

Generated Slice / LOI / Peak feature-map previews from TDMS waveform data.

Processing rule:
- Load `Waveform` as fixed logical cube: `300 x 301 x 500`
- Correct serpentine raster ordering before plotting
- Rotate backside scans by 180° after raster correction
- Collapse the 500-sample waveform axis into one value per scan point
- Output each Slice / LOI / Peak map as `300 x 301`

Execution repo changes:
- `scripts/plot_all_tdms_feature_maps.py` — batch feature-map generator
- `scripts/plot_single_tdms_feature_maps.py` — single-TDMS feature-map generator
- `outputs/tdms_feature_maps/` — generated batch previews
- `outputs/single_tdms_feature_maps/` — generated single-file preview

Batch result:
- Inventory rows processed: 115
- PNG previews generated: 113
- Missing raw TDMS files skipped: 2

Skipped missing paths:
- `/home/tiendat/Documents/NDT-data/HallAirCore/Rivet/Square/hall_aircore_corosion_frontside_square_300x300_200hz_z1mm_20260405_122521.tdms`
- `/home/tiendat/Documents/NDT-data/HallAirCore/Rivet/Square/hall_aircore_corosion_frontside_square_300x300_200hz_z3mm_20260405_154903.tdms`

Key finding: direct `reshape(300, 301, 500)` gives the expected cube but still needs serpentine raster correction; otherwise plots show diagonal fold artifacts.

## User-Preferred Orientation Export — 2026-05-11

Updated the preferred-orientation workflow to use `external/CorrosionFlip.xlsx` and added TDMS export support for user-approved transforms.

Execution repo changes:
- `scripts/export_user_preferred_tdms.py` — exports preferred-orientation TDMS-derived arrays.
- `run_export_preferred_tdms.sh` — convenience wrapper for the export script.
- `scripts/plot_user_preferred_orientation.py` — reads inline-string XLSX cells, handles `xl/` relationship targets, and supports flip statuses with rotation offsets.
- `run_preferred_orientation.sh` — uses `external/CorrosionFlip.xlsx` as the preferences file.

Key implication: downstream modeling can use user-preferred TDMS orientation artifacts instead of relying only on visual preview outputs.

## Training Dataset and Lift-Off CSVs — 2026-05-11

User-provided processed data is available under `~/Documents` and should be treated as read-only.

Available inputs:
- `~/Documents/user_preferred_tdms` — preferred processed dataset for training; contains `HallAirCore/`, `HallPotCore/`, `TMR/`, and `user_preferred_tdms.csv`.
- `~/Documents/Lift-off` — lift-off CSV files for LOI plotting; 46 CSV files found.

Key implication: baseline training should start from `~/Documents/user_preferred_tdms`; LOI plotting can use the separate lift-off CSV folder.
