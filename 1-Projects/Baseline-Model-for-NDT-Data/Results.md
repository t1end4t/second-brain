# Baseline Model for NDT Data — Results

## Rotate/Crop Review App — 2026-05-13

Added and adopted a local Streamlit app for first-step raw TDMS rotate/crop preprocessing review.

- Command: `uv run ndt-rotate-crop-app`
- Wrapper: `scripts/rotate_crop_app.sh`
- Input scope: raw TDMS from `inventories/raw_tdms_inventory.csv`
- Function: load raw TDMS, fix serpentine raster, compute Peak map, rotate, crop, overlay specimen mask, and download `.npz` plus JSON metadata
- Archive update: unused `outputs/orientation_check/` moved to `archive/outputs_orientation_check/`

## Processing Verification Status — 2026-05-12

Preprocessing artifacts remain provisional until reviewed raw TDMS rotate/crop choices are saved as metadata and applied. Inventory verification on 2026-05-12 found `inventories/tdms_inventory.csv` stale for current full `~/Documents` scope: saved rows 115, rerun rows 167. Trusted raw audit scope is now `inventories/raw_tdms_inventory.csv` from `~/Documents/NDT-data`.

## Trusted TDMS Inventories — 2026-05-12

Trusted raw inventory is separated from the stale original inventory.

- Raw audit inventory: `inventories/raw_tdms_inventory.csv`, source `~/Documents/NDT-data`, 113 rows
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

Key finding: direct `reshape(300, 301, 500)` gives the expected cube but still needs serpentine raster correction; otherwise plots show diagonal fold artifacts.
