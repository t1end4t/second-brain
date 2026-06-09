# Baseline Model for NDT Data — Labeling Spec

Detailed labeling geometry and reproducible schema for the PECT corrosion, rivet, and mixed specimens.

## Label Schema

Each pixel in a corrosion region carries:
- `corrosion_binary`: bool — whether the pixel belongs to any corrosion defect.
- `corrosion_defect_id`: uint8 — the specific defect ID (1–25 for corrosion, 1–31 for mixed).
- `corrosion_depth_mm`: float32 — pit depth `Dp` for that defect region.
- `corrosion_diameter_mm`: float32 — flat-bottom hole diameter for that defect region.

`volume` is listed as a future regression target but is not currently computed or stored in mask generation scripts.

## Mask Generation

All masks are generated on a 300 × 301 px canvas representing a 300 mm × 300 mm plate.

Pixel coordinate mapping:
- `mm_to_col(x) = round(x / 300.0 * 300)`
- `mm_to_row(y) = round((300.0 - y) / 300.0 * 299)`

A pixel is inside a circular defect if `(x - cx)^2 + (y - cy)^2 <= r_px^2`.

## Corrosion Specimen

- Specimen: 300 mm × 300 mm aluminum plate.
- Grid: 5×5 circular flat-bottom corrosion defects, IDs `#1`–`#25`.
- ID order: row-major bottom-left → top-right.
- First center: 30 mm from bottom/left reference edges.
- Center spacing: 60 mm in x/y.
- Column-wise diameters: `[10.0, 8.0, 6.0, 4.0, 3.0]` mm.
- Row-wise depths bottom → top: `[0.1, 0.2, 0.5, 0.8, 1.0]` mm.
- Diameter target maps by column; depth target maps by row.
- Layer diagram: Layer 1 and Layer 2 are each 1.27 mm thick; corrosion depth labels are flat-bottom recess depths `Dp` in mm.

## Rivet Specimen

- Specimen: 300 mm × 300 mm riveted aluminum plate.
- Grid: 5×5 rivet/corrosion locations, IDs `#1`–`#25`.
- ID order: row-major bottom-left → top-right.
- First center: 50 mm from bottom/left reference edges.
- Center spacing: 50 mm in x/y.
- Rivet diameter/reference: `3.95` mm.
- Outer corrosion/affected diameter reference in diagram: `5.85`.
- Corrosion offset `L` is measured from rivet center.
- Bottom-row offsets by column: `[1.5, 2.0, 2.5, 3.0, 3.5]` mm.
- Bottom-row corrosion diameters by column: `[3.0, 4.0, 5.0, 6.0, 7.0]` mm.
- Corrosion depths bottom → top: `[1.0, 0.8, 0.6, 0.4, 0.2]` mm.
- Offset direction in current mask generation: `+x` (`OFFSET_DIR_X = 1.0`, `OFFSET_DIR_Y = 0.0`).
- Two masks are generated:
  - `rivet_id_mask`: filled at grid center with rivet diameter.
  - `corrosion_id_mask`: filled at offset position with corrosion diameter.
- Diagram labels are split across lines near features; preserve original ID interpretation when building label tables.
- Layer diagram indicates corrosion near a rivet through Layer 1, with Layer 1 and Layer 2 each 1.27 mm thick.

## Mixed Specimen

- Specimen: 300 mm × 300 mm mixed rivet/corrosion plate, IDs `#1`–`#31`.
- Feature centers are spaced mostly 50 mm apart; first row/column is 50 mm from bottom/left reference edges.
- `RIVET_DIAMETER_MM = 3.95`.
- Lower corrosion diameters by column: `[14.0, 12.0, 10.0, 8.0, 6.0]` mm.
- Lower corrosion offsets by column: `[8.0, 7.0, 6.0, 5.0, 4.0]` mm.
- Lower rows:
  - Row 1: `y=50.0`, `depth=0.1`, x=`[50,100,150,200,250]`.
  - Row 2: `y=100.0`, `depth=0.2`, x=`[50,100,150,200,250]`.
  - Row 3: `y=150.0`, `depth=0.5`, x=`[50,100,150,200,225,250]`.
  - Row 4: `y=200.0`, `depth=1.0`, x=`[50,100,150,200,225,250]`.
  - Row 5: `y=225.0`, `depth=1.27`, x=`[50,100,150]`.
- `RIVET_ONLY_IDS = {15, 21, 23, 24, 25, 30}` — no corrosion.
- IDs `#23`, `#24`, `#25`, and `#30` are rivet-only/no-corrosion in the current interpretation.
- Top-row IDs `#26`–`#31` sit at y ≈ 250 mm; `#30` is rivet-only.
- Top-row corrosion IDs `#26`, `#27`, `#28`, `#29`, and `#31` mirror bottom-row corrosion geometry `#1`–`#5`:
  - Diameters: `[14.0, 12.0, 10.0, 8.0, 6.0]` mm.
  - Offsets: `[8.0, 7.0, 6.0, 5.0, 4.0]` mm.
  - Depth: `Dp 1.0` mm.
  - Mapping: `#26→#1`, `#27→#2`, `#28→#3`, `#29→#4`, `#31→#5`.
- Lower corrosion rows use diagram depths from bottom upward: `Dp 0.1`, `Dp 0.2`, `Dp 0.5`, and `Dp 1.0`.
- The `Dp 1.27` callout corresponds to upper rivet-only locations, not corrosion masks for `#23`–`#25`.
- The `Ø 6.8 x 31` annotation should not be used as corrosion diameter for `#31`; corrected corrosion diameter for `#31` is 6 mm.
- Layer diagram indicates rivet plus corrosion through Layer 1/Layer 2, with each layer 1.27 mm thick.
