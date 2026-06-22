# Baseline Model for NDT Data

## Why This Exists

Prepare and verify the pulsed eddy current testing (PECT) TDMS dataset in `~/Documents`.

Current scope: TDMS inventory, rotate/crop and LOI review, mask generation, processed `.npy` export QA, statistical visualization, TSNR/PCA feature review, grouped-dataset protocol design, and point-level classification baselines.

## Modeling Plan

- Start with statistical visualizations and TSNR/PCA to inspect feature separability.
- Build grouped datasets by specimen-side, lift-off, sensor type, and waveform.
- Use point-level splits within each group for training.
- For regression, preserve corrosion lateral surface context as `n x n x 500` patches.

## Current Context

- Trusted raw inventory: `configs/raw_tdms_inventory.csv` (113 files, source `~/Documents/NDT-data`).
- Sensor counts: HallAirCore 36, HallPotCore 36, TMR 41.
- 93 complete, 20 short (18 short by 1 scan point, 2 short by 3).
- Expected shape: `300 x 301 x 500` (scan x scan x samples). The loader must handle short files.
- Reviewed rotate/crop choices: `configs/raw_tdms_rotate_crop.csv`.
- Reviewed LOI windows: `configs/loi_windows.csv`; selected best per file: `configs/selected_loi_windows.csv`.

## Labeling

See `docs/LabelingSpec.md` for the full corrosion/rivet/mixed labeling geometry and mask schema.

## Constraints & Limitations

- Raw data in `~/Documents` is read-only.
- Processed corrosion export shape: raw `300 x 301 x 500` -> trim to `300 x 300 x 500` -> crop 15 px/side -> `270 x 270 x 500`.
- CNR evaluation is deferred until labels and preprocessing are stable.

## Open Questions

- How should corrosion volume be defined from flat-bottom hole geometry?
- Are lift-off distances 4 mm and 5 mm present in raw data or only validation figures?
- ISC2 top-row corrosion depth: `Dp=1.27` vs `Dp=1.0` — which matches fabrication drawings?
- Missing scenarios: paper claims 144 files; trusted inventory shows 113. Are Differential Pot-core files under another name?
