# Baseline Model for NDT Data — Brief

## Summary

Build a simple, reproducible baseline ML pipeline for a pulsed eddy current testing (PECT) TDMS dataset of aircraft aluminum corrosion/rivet specimens. Current priority is safe TDMS loading and preview generation from files in `~/Documents`; metadata lookup is deferred until labels are needed.

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

Paper context is read. Local TDMS inventory found 115 files under `~/Documents`: HallAirCore 38, HallPotCore 36, and TMR 41. Expected complete TDMS waveform length is 45,150,000 values = 300 x 301 scan points x 500 samples. 95 files are complete, 18 are short by one scan point, and 2 are short by three scan points. Specimen label context is captured for corrosion, rivet, and mixed specimens. Corrosion specimen: 300 mm x 300 mm plate, 5 x 5 flat-bottom defect grid, IDs `#1`-`#25` row-major from bottom-left to top-right, 60 mm spacing, 30 mm bottom/left edge offset, column-wise diameters 10/8/6/4/3 mm, row-wise `Dp` depths 0.1/0.2/0.5/0.8/1.0 mm bottom-to-top. Rivet specimen: 300 mm x 300 mm plate, 5 x 5 rivet/corrosion grid, IDs `#1`-`#25` row-major from bottom-left to top-right, 50 mm spacing, 50 mm bottom/left edge offset, row-wise `Dp` depths 1.0/0.8/0.6/0.4/0.2 mm bottom-to-top, bottom-row offsets `L` 1.5/2.0/2.5/3.0/3.5 mm, bottom-row corrosion diameters 3/4/5/6/7 mm. Mixed specimen: 300 mm x 300 mm mixed rivet/corrosion plate with IDs `#1`-`#31`, mostly 50 mm spacing; `#23`-`#25` and `#30` are rivet-only/no-corrosion; top-row corrosion IDs `#26/#27/#28/#29/#31` mirror bottom-row corrosion geometry `#1`-`#5` with diameters 14/12/10/8/6 mm, offsets 8/7/6/5/4 mm, and depth `Dp 1.0` mm; `Ø 6.8 x 31` is not used as corrosion diameter for `#31`. Next task is a safe TDMS loader that handles short files before heatmaps or modeling.

## Key Resources

- `3-Resources/raw/Development-of-an-Experimental-Pulsed-Eddy-Current-Testing-Dataset-for-Defect-Detectionin-Aircraft-Aluminum-Structures.docx`
- Execution repo: `~/codebases/research-lab/paper-lab/ndt-pect-baseline`
- Repo TDMS summary: `docs/tdms_context.md`
- Repo TDMS inventory: `inventories/tdms_inventory.csv`
