# Baseline Model for NDT Data

## Why This Exists

I want to create a baseline model for the pulsed eddy current testing (PECT) TDMS dataset stored in `~/Documents`.

The model should eventually support:
- Classification: rivet and corrosion.
- Regression: corrosion depth, diameter, and volume.
- CNR calculation for each corrosion case, later.

Before touching the dataset, first read the draft paper in `3-Resources/raw/Development-of-an-Experimental-Pulsed-Eddy-Current-Testing-Dataset-for-Defect-Detectionin-Aircraft-Aluminum-Structures.docx` to understand the experimental context, specimens, labels, and metadata.

## Current Context

Paper context read on 2026-05-07:
- Dataset is an experimental PECT dataset for aircraft-grade aluminum A2024 structures.
- Raw measurements are stored as TDMS transient signals with metadata.
- Dataset has three specimen scenarios: TSC surface corrosion, ISC1 hidden corrosion at riveted Layer 1, and ISC2 deep-seated corrosion at riveted Layer 2.
- Experimental factors: four probe configurations, three excitation waveforms, and three lift-off distances.
- Main paper count: 144 measurement scenarios.
- Each TDMS record is described as a 1D float64 waveform array from a 300 x 301 scan grid, 500 samples per scan point, sampled at 100 kHz.
- Defect geometry is known by defect ID: depth and diameter tables are given for TSC, ISC1, and ISC2; ISC2 also includes non-corrosion rivet-only IDs.

TDMS-only local inventory checked on 2026-05-07:
- Local raw data under `~/Documents` contains 115 TDMS files.
- Sensor counts: HallAirCore 38, HallPotCore 36, TMR 41.
- TDMS files are organized as sensor/task/condition/file.
- Each checked TDMS file has groups `Freq_Sampling_SizeX_SizeY` and `Waveform`.
- Expected complete waveform length is 45,150,000 values = 300 x 301 scan points x 500 samples.
- 95 files are complete, 18 files are short by 1 scan point, and 2 files are short by 3 scan points.
- Execution repo now has `docs/tdms_context.md` and `inventories/tdms_inventory.csv`.

Corrosion specimen label context added on 2026-05-07 from user-provided specimen diagram:
- Specimen is a 300 mm x 300 mm aluminum plate with a 5 x 5 grid of circular flat-bottom corrosion defects, IDs `#1` through `#25`.
- Defect centers are spaced 60 mm apart in both x and y directions; the first row/column is 30 mm from the bottom/left reference edges shown in the diagram.
- Defect IDs are row-major from bottom-left to top-right: bottom row `#1`-`#5`, then `#6`-`#10`, `#11`-`#15`, `#16`-`#20`, and top row `#21`-`#25`.
- Diameter by bottom row IDs: `#1` = 10 mm, `#2` = 8 mm, `#3` = 6 mm, `#4` = 4 mm, `#5` = 3 mm.
- Depth by rows from bottom to top: row `#1`-`#5` = 0.1 mm, `#6`-`#10` = 0.2 mm, `#11`-`#15` = 0.5 mm, `#16`-`#20` = 0.8 mm, `#21`-`#25` = 1.0 mm.
- Diameter pattern repeats across each row, so label targets can be mapped by column while depth targets map by row.
- Layer diagram shows Layer 1 and Layer 2 are each 1.27 mm thick; corrosion depth labels are the flat-bottom recess depths `Dp` in millimeters.

Rivet specimen label context added on 2026-05-07 from user-provided specimen diagram:
- Specimen is a 300 mm x 300 mm riveted aluminum plate with a 5 x 5 grid of rivet/corrosion locations.
- Feature centers are spaced 50 mm apart in both x and y directions; the first row/column is 50 mm from the bottom/left reference edges shown in the diagram.
- Defect IDs are row-major from bottom-left to top-right: bottom row `#1`-`#5`, then `#6`-`#10`, `#11`-`#15`, `#16`-`#20`, and top row `#21`-`#25`.
- Rivet geometry diagram indicates rivet diameter/reference `3.95`, outer corrosion/affected diameter reference `5.85`, and corrosion offset length `L` from rivet center.
- Bottom-row corrosion offset labels by column: `#1` = 1.5 mm, `#2` = 2.0 mm, `#3` = 2.5 mm, `#4` = 3.0 mm, `#5` = 3.5 mm.
- Bottom-row corrosion diameter labels by column: 3 mm, 4 mm, 5 mm, 6 mm, and 7 mm.
- Corrosion depth labels by row from bottom to top: `#1`-`#5` = 1.0 mm, `#6`-`#10` = 0.8 mm, `#11`-`#15` = 0.6 mm, `#16`-`#20` = 0.4 mm, `#21`-`#25` = 0.2 mm.
- Diagram labels are split across lines near features; preserve original ID interpretation carefully when building label tables.
- Layer diagram indicates corrosion near a rivet through Layer 1, with Layer 1 and Layer 2 each 1.27 mm thick.

Mixed specimen label context updated on 2026-05-07 from user-provided specimen diagram and correction:
- Specimen is a 300 mm x 300 mm aluminum plate with mixed rivet/corrosion layout, IDs `#1` through `#31`.
- Feature centers are spaced mostly 50 mm apart; first row/column is 50 mm from bottom/left reference edges.
- IDs `#1`-`#22` form the lower rivet/corrosion grid: rows `#1`-`#5`, `#6`-`#10`, `#11`-`#16`, and `#17`-`#22`.
- IDs `#23`, `#24`, and `#25` are rivet-only positions near the upper-left/middle row; they do not contain corrosion.
- Top-row IDs `#26`-`#31` sit at y ≈ 250 mm; `#30` is rivet-only, while `#26`, `#27`, `#28`, `#29`, and `#31` contain corrosion.
- Top-row corrosion geometry mirrors the bottom row `#1`-`#5`: diameters 14, 12, 10, 8, and 6 mm respectively, offsets `L` 8, 7, 6, 5, and 4 mm respectively. Mapping: `#26`→`#1`, `#27`→`#2`, `#28`→`#3`, `#29`→`#4`, `#31`→`#5`.
- Top-row corrosion depth is `Dp 1.0` mm for `#26`, `#27`, `#28`, `#29`, and `#31`.
- Lower corrosion rows use diagram depths from bottom upward: `Dp 0.1`, `Dp 0.2`, `Dp 0.5`, and `Dp 1.0`; the `Dp 1.27` callout corresponds to upper rivet-only locations, not corrosion masks for `#23`-`#25`.
- Bottom-row corrosion diameters by column are 14 mm, 12 mm, 10 mm, 8 mm, and 6 mm; bottom-row offset/distance labels by column are 8 mm, 7 mm, 6 mm, 5 mm, and 4 mm.
- The `Ø 6.8 x 31` annotation should not be used as corrosion diameter for `#31`; corrected corrosion diameter for `#31` is 6 mm based on the top-row/bottom-row mapping.
- Layer diagram indicates rivet plus corrosion through Layer 1/Layer 2, with each layer 1.27 mm thick.

## Open Questions

- Metadata/coordinate lookup is deferred until labels are needed.
- Should classification be multi-label per scan point/image region (`rivet`, `corrosion`) or specimen-level/file-level first?
- Should regression target per defect ID, per cropped defect patch, or per scan point?
- How should corrosion volume be defined from flat-bottom hole geometry: cylinder approximation from depth and diameter unless metadata says otherwise?
- Which probe/waveform/lift-off combinations should be used for the first baseline split?

## Constraints & Limitations

- Raw TDMS data in `~/Documents` is read-only; write outputs only in the execution repo.
- Keep the first model simple and reproducible before trying deep learning.
- Avoid leakage across experimental conditions; split design must consider specimen/defect/probe/waveform/lift-off grouping.
- CNR is a later task after labels, preprocessing, and baseline model pipeline are established.

## Related Resources

- `3-Resources/raw/Development-of-an-Experimental-Pulsed-Eddy-Current-Testing-Dataset-for-Defect-Detectionin-Aircraft-Aluminum-Structures.docx`
