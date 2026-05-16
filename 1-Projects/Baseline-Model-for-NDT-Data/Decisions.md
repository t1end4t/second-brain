# Baseline Model for NDT Data — Decisions

## Template

## 2026-05-13 — Raw TDMS rotate/crop app is active preprocessing path

- The local Streamlit rotate/crop app is the active tool for raw TDMS preprocessing review.
- Reviewed rotations, flips, and crops are saved per file as JSON metadata before downstream LOI/model work.
- Serpentine raster correction and backside 180° rotation remain part of the standard pipeline; the app only handles the final transform/crop selection.
- Do not revert to the older "skip orientation" bypass once reviewed metadata exists for a file.

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

## 2026-05-11 — Use preferred processed dataset for training

- Training baseline should use `~/Documents/user_preferred_tdms` as the preferred processed dataset.
- Treat `~/Documents/user_preferred_tdms` as read-only input; write derived artifacts inside this repo.
- Use `~/Documents/Lift-off` as the source for lift-off CSVs when plotting LOI.

## 2026-05-11 — Lift-off LOI marker convention

- LOI candidates on differentiated lift-off curves are crossing points between adjacent positive/negative lobes, not lobe peaks.
- Select crossings from the mean differentiated signal after subtracting Air and low-pass filtering.
- Keep a crossing only when the lift-off spread has strong lobes on both sides of the crossing.
- For LOI-value plots, use a centered sample window around each LOI crossing instead of one single sample.
- For preferred TDMS LOI-method plots, create one image per TDMS file with one subplot per LOI center when the LOI count is manageable.
- When plotting exported preferred TDMS files, read the stored preferred shape/properties instead of assuming `300 x 301`; 90°/270° rotations are stored as `301 x 300`.

## 2026-05-11 — First corrosion-detection baseline

- Start with binary corrosion detection before rivet classification or geometry regression.
- Use exported preferred TDMS files as training inputs; do not re-apply serpentine correction, rotation, or flip at training load time.
- Load preferred TDMS waveform arrays using stored preferred properties so `90°/270°` files are interpreted as `301 x 300 x 500`.
- Use Slice / LOI / Peak maps as the initial feature channels for each scan pixel.
- Use generated corrosion specimen masks as labels after transforming/cropping masks into the same preferred coordinate frame as each feature map.
- Use a simple classical baseline first, such as logistic regression or random forest, before image/CNN models.
- Report AUROC, AUPRC, F1, confusion matrix, and visual prediction overlays; write all derived artifacts inside this repo.

## 2026-05-12 — Review LOI windows before using LOI features

- Build a local Streamlit app for LOI review/selection only; no web deployment.
- Use lift-off CSVs from `~/Documents/Lift-off` as read-only inputs.
- Group approved LOI windows by `(specimen, waveform)` rather than per TDMS file.
- Save human-approved LOI windows under `configs/`, starting with `configs/loi_windows.csv`.
- Train the first baseline with `[slice, peak]` until LOI windows are approved.
- After approval, rebuild features with `[slice, peak, loi]` and compare against the `[slice, peak]` baseline.
- LOI selection must allow manual center edits because some automatic LOI lines are poor.
- The LOI selection app should load existing PNG previews from `outputs/preferred_tdms_loi_method`; plotting/regeneration stays in `ndt-plot-preferred-tdms-loi-method`.
- Manual correction of poor automatic LOI points is done in a separate editor app that writes back to `configs/lift_off_loi_inventory.csv`.
