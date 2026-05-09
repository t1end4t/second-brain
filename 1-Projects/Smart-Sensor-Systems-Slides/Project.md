# Smart-Sensor-Systems-Slides

## Why This Exists
Create slide deck for EEE703708 Smart Sensor Systems course at Phenikaa University (3 credits, 45 hours, taught by TS. Lê Minh Huy & TS. Lê Viết Thông).

## Current Context
- Course has 4 chapters: Intro, Sensor↔MCU Interface, Smart Data Processing, Building Applications
- Two main source books: Smart Sensor Systems (Meijer et al., ~450 pages, 9 chapters) and TinyML (Warden, ~480 pages preview, 6 chapters)
- **TinyML integration is the KEY focus** of the course
- Final project is 70% of grade (Ch.3-4)


## Syllabus Details

| Chapter | Topic | Hours (Lecture/Self-study) |
|---------|-------|---------------------------|
| Ch.1 | Introduction to Smart Sensors (types, applications) | 6 LT / 12 tự học |
| Ch.2 | Sensor↔MCU Interface (calibration, amplifiers, ADC) | 9 LT / 18 tự học |
| Ch.3 | Smart Data Processing (data collection, ML, deep learning, embedding models) | 1 LT / 0 tự học |
| Ch.4 | Building Smart Sensor Applications (developing, integrating, evaluating) | 15 LT / 30 tự học |

**Assessments:** Homework 5% · Mid-term B1 (after Ch.2) 10% · Mid-term B2 (after Ch.3) 10% · Final project (Ch.3-4) 70%

## Chapter-to-Book Mapping

| Syllabus Ch. | Smart Sensor Book | TinyML Book |
|-------------|-------------------|-------------|
| Ch.1 (6h) | Ch.1 (Intro), Ch.2 (Calibration) | — |
| Ch.2 (9h) | Ch.3 (Instrumentation Amps), Ch.4 (Impedance), Ch.6 (CMOS Image) | — |
| Ch.3 (1h) | — | Ch.3-4 (ML workflow), Ch.7-12 (Applications), Ch.13 (TFLite Micro) |
| Ch.4 (15h) | Ch.7 (Image sensors), Ch.8 (Neural), Ch.9 (Energy) | Ch.14-18 (Deployment, Optimization) |

## Priority Strategy

- **P1 — Core Foundation (Ch.1-2):** Smart sensor design principles, calibration, amplifiers, ADCs
- **P2 — TinyML Integration (Ch.3):** Core ML workflow + TFLite Micro basics
- **P3 — Applications (Ch.4):** Pick 2-3 representative case studies, not all 9 chapters

## Open Questions
1. How many slides per chapter? (~15-20 per lecture hour recommended)
2. Any specific topics the professor emphasized?
3. Which chapters are most important beyond TinyML?

## Constraints & Limitations
- Two books are very long (~750+ pages combined) — cannot read everything
- Must prioritize: TinyML integration is the key differentiator
- Need to read only the chapters that map to each syllabus chapter

## Related Resources
- `3-Resources/raw/tflite_micro_preview.pdf` (TinyML, 149 pages)
- `3-Resources/raw/Gerard Meijer, Michiel Pertijs, Kofi Makinwa - Smart Sensor Systems.pdf` (Smart Sensor, 304 pages)
- `3-Resources/raw/Đề cương chi tiết học phần Smart Sensor.pdf` (course syllabus)
