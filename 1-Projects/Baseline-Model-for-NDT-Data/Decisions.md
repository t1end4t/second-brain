# Baseline Model for NDT Data — Decisions

## Template


## 2026-05-07 — TDMS-first workflow

- Focus on TDMS files first; metadata lookup is deferred until labels are needed.
- Build a safe TDMS loader before heatmaps, feature extraction, or modeling.
- Treat raw files in `~/Documents` as read-only.

## 2026-05-07 — TDMS raster orientation for feature maps

- Treat TDMS waveform data as fixed logical shape `300 x 301 x 500`.
- Apply serpentine raster correction before feature extraction/plotting.
- Apply backside 180° rotation after serpentine correction.
- Use Slice / LOI / Peak as simple preview features that collapse `300 x 301 x 500` to `300 x 301`.


## 2026-05-08 — Detection baseline requires orientation and crop calibration

- Before model training, align TDMS feature maps and masks into one coordinate frame.
- Test all 8 grid transforms (identity, rotations, flips, transpose variants) against masks.
- Remove strong border/outline signal by applying the same crop to feature maps and masks.
- Store generated calibration outputs in the execution repo, not the note repo.

## 2026-05-08 — Orientation skipped for baseline; use processed dataset

- Decision: bypass manual orientation/crop pipeline for now.
- Rationale: user already holds a processed dataset (Slice/LOI/Peak + masks).
- Baseline target: karpathy/autoresearch as training harness.
- Risk: if processed data still has orientation mismatches, model will train but not generalise.
- Fallback: revisit orientation/crop if validation metrics are random or if mask overlap is visibly wrong.

## 2026-05-08 — Add autoresearch as reference, plan adaptation

- Added `external/autoresearch` submodule for reference only.
- Will borrow the *idea* (agent-loop, fixed-budget runs, keep/discard) but not the LLM code.
- Target: a local `scripts/autoresearch_ndt/` harness where the agent edits `train_ndt.py`.
- Metric will be task-specific (e.g. AUROC for corrosion detection, MSE for depth regression).
- Time budget will be task-sized (e.g. 2–5 min per experiment).
