# Baseline Model for NDT Data — Brief

## Summary

Build a simple, reproducible baseline ML pipeline for a pulsed eddy current testing (PECT) TDMS dataset of aircraft aluminum corrosion/rivet specimens. Current priority is reviewing raw TDMS rotate/crop choices in the local app before continuing LOI or model work; metadata lookup is deferred until labels are needed.

## Objective

- Classify rivet and corrosion signals/regions.
- Regress corrosion geometry: depth, diameter, and volume.
- Add per-corrosion CNR calculation later.

## Key Constraints

- Raw data in `~/Documents` is read-only; all outputs go in the execution repo.
- First baseline should be simple, inspectable, and leakage-aware.
- Splits must account for specimen, defect ID, probe, waveform, and lift-off to avoid optimistic results.
- CNR is deferred until preprocessing, labels, and baseline targets are stable.

## Current Status

Paper context is read and rechecked against the newly copied draft paper on 2026-05-15. The old TDMS inventory is stale for current full `~/Documents` scope. Trusted raw audit inventory is `configs/raw_tdms_inventory.csv` from `~/Documents/NDT-data` with 113 rows, while the draft paper describes a 144-scenario release. Expected complete TDMS waveform length is 45,150,000 values = 300 x 301 scan points x 500 samples, but current trusted inventory includes 93 complete files, 18 files short by one scan point, and 2 files short by three scan points. A raw-data status dashboard (`ndt-raw-data-status`) shows inventory health before any preprocessing. A separate rotate/crop Streamlit app (`ndt-rotate-crop-app`) is the active preprocessing step; downstream LOI/model work proceeds after reviewed transforms are saved as metadata. The LOI selection app (`ndt-loi-selection-app`) reviews LOI windows from lift-off CSVs.

Key unresolved dataset gaps: paper claims four probe configurations but the current inventory clearly shows only HallAirCore, HallPotCore, and TMR categories; the Differential Pot-core data may be missing or named differently. Paper design uses three lift-offs (`1`, `2`, `3` mm), but validation text references five (`1`–`5` mm). ISC2 labels also need verification because the draft table assigns `Dp=1.27 mm` to top-row corrosion IDs, while the current project interpretation uses `Dp=1.0 mm` and treats `1.27 mm` as a rivet-only/callout issue.

## Label Context

- Corrosion specimen: 300 mm x 300 mm plate, 5 x 5 flat-bottom defect grid, IDs `#1`-`#25` row-major from bottom-left to top-right, 60 mm spacing, 30 mm bottom/left edge offset, column-wise diameters 10/8/6/4/3 mm, row-wise `Dp` depths 0.1/0.2/0.5/0.8/1.0 mm bottom-to-top.
- Rivet specimen: 300 mm x 300 mm plate, 5 x 5 rivet/corrosion grid, IDs `#1`-`#25` row-major from bottom-left to top-right, 50 mm spacing, 50 mm bottom/left edge offset, row-wise `Dp` depths 1.0/0.8/0.6/0.4/0.2 mm bottom-to-top, bottom-row offsets `L` 1.5/2.0/2.5/3.0/3.5 mm, bottom-row corrosion diameters 3/4/5/6/7 mm.
- Mixed specimen: 300 mm x 300 mm mixed rivet/corrosion plate with IDs `#1`-`#31`, mostly 50 mm spacing; `#23`-`#25` and `#30` are rivet-only/no-corrosion; top-row corrosion IDs `#26/#27/#28/#29/#31` mirror bottom-row corrosion geometry `#1`-`#5` with diameters 14/12/10/8/6 mm, offsets 8/7/6/5/4 mm, and depth `Dp 1.0` mm; `Ø 6.8 x 31` is not used as corrosion diameter for `#31`.

For exact generation constants, output formats, and transformation logic, see `docs/LabelingSpec.md`.

## Key Resources

- `3-Resources/raw/Development-of-an-Experimental-Pulsed-Eddy-Current-Testing-Dataset-for-Defect-Detectionin-Aircraft-Aluminum-Structures.docx`
- Execution repo: `~/codebases/research-lab/paper-lab/ndt-pect-baseline`
- Raw TDMS dataset: `~/Documents/NDT-data`
