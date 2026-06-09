# Point Split Protocol

Use grouped point-level splits for the next training path. File/export-level splits are retired because previous results were very poor and over-focused on domain differences between TDMS files.

## Current Rule

Keep the grouped dataset protocols, but split points inside each group. Each exported TDMS file in a group contributes points to train, validation, and test.

Protocol families:

- `same_lift_off`: one dataset per lift-off value, for example `z1`, `z2`, `z3`
- `same_waveform`: one dataset per waveform, for example `Chirp`, `Gauss`, `Square`
- `same_sensor`: one dataset per sensor, for example `HallAirCore`, `HallPotCore`, `TMR`
- `same_specimen`: one dataset per specimen-side, for example `CorrosionFrontside`, `CorrosionBackside`, `RivetFrontside`, `MixedBackside`

To reduce immediate spatial leakage, assign spatial blocks to splits instead of assigning every neighboring pixel independently. Default block size is `16 x 16` pixels.

## Command

```bash
uv run ndt split points
```

Options:

```bash
uv run ndt split points --block-size 16 --max-background-per-export 5000 --train-ratio 0.70 --val-ratio 0.15
```

The default output directory includes the seed, so different seeds do not overwrite each other:

```text
outputs/point_splits/<seed>/
```

Use `--out-dir` only when you intentionally want a custom output location.

Outputs:

- `outputs/point_splits/ndt-point-split-v1/README.md`
- `outputs/point_splits/ndt-point-split-v1/report.html`
- `outputs/point_splits/<seed>/<protocol>/<dataset>/point_split_manifest.csv`
- `outputs/point_splits/<seed>/<protocol>/<dataset>/point_split_coverage.md`

Examples:

- `outputs/point_splits/ndt-point-split-v1/same_lift_off/z1/point_split_manifest.csv`
- `outputs/point_splits/ndt-point-split-v1/same_waveform/Chirp/point_split_manifest.csv`
- `outputs/point_splits/ndt-point-split-v1/same_sensor/HallPotCore/point_split_manifest.csv`
- `outputs/point_splits/ndt-point-split-v1/same_specimen/CorrosionFrontside/point_split_manifest.csv`
- `outputs/point_splits/ndt-point-split-v1/same_specimen/CorrosionBackside/point_split_manifest.csv`

Open `outputs/point_splits/ndt-point-split-v1/report.html` for visual QA of group sizes, class composition, train/val/test ratio, and one example spatial block split.

## Manifest Columns

- `split`: `train`, `val`, or `test`
- `export`: exported TDMS folder under `outputs/tdms_npy/`
- `row`, `col`, `flat_index`: point coordinate in processed array
- `label`: `0=background`, `1=rivet`, `2=corrosion`
- `block_row`, `block_col`: spatial block used for split assignment
- `specimen`, `specimen_side`, `sensor`, `waveform`, `lift_off`: metadata copied or derived from export `meta.json`

## Sampling

- Keep all rivet/corrosion points.
- Sample background points per export using `--max-background-per-export` to avoid huge manifests and extreme class imbalance.
- Splits are deterministic for a fixed seed, export name, and block size.

## Risk

This split can give better scores because train and test contain points from the same physical TDMS file within the same group. Treat it as grouped in-file point prediction, not evidence of generalization to unseen files or unseen acquisition conditions.
