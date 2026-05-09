# Chapter 1 — Smart Sensor Design: Slide Outline

**Source:** Meijer, Pertijs & Makinwa — "Smart Sensor Design" (Ch.1, 16 pages)  
**Target:** ~25 slides (for 6 lecture hours = 6 LT)

---

## Section 1: Introduction to Smart Sensors (Slides 1–6)

### Slide 1 — Title Slide
- Title: Chapter 1 — Smart Sensor Design
- Subtitle: Fundamentals, Design Techniques, and Case Studies
- Author: Kofi Makinwa (Delft University of Technology)
- Course: EEE703708 Smart Sensor Systems

### Slide 2 — Sensors Are Everywhere
- **Cars:** position sensors, MEMS accelerometers, gyroscopes
- **Homes:** thermostats, motion sensors, gas flow sensors
- **Mobile phones:** touch, microphone, image sensors, inertial, magnetic, environmental, GPS
- Key message: sensors have transformed everyday devices

### Slide 3 — Why Silicon?
- Mass-producible at low cost via semiconductor industry
- Electronic circuitry can be co-integrated on same substrate/package
- High-purity material with well-defined, tunable physical properties
- Nanoscale precision machining
- **Trade-off:** not always best-in-class performance, but excellent cost/size/system integration

### Slide 4 — Silicon Transduction Mechanisms
- **Magnetic field** → Hall effect
- **Temperature difference** → Seebeck effect
- **Mechanical strain** → Piezoresistive effect
- **Light** → Photoelectric effect
- **Indirect sensing:** humidity (dielectric constant of polymer), gas concentration (metal oxide resistance)

### Slide 5 — What Is a Smart Sensor?
- **Definition:** A system-in-package combining a sensor + dedicated interface electronics
- Interface electronics should be located **close to the sensor** to minimize interference and transmission losses
- Can be:
  - **Single-chip:** temperature sensors, image sensors, Hall sensors
  - **Two-chip:** MEMS accelerometers, gyroscopes, microphones (require micro-machining)
- Benefits: robust standardized output, signal conditioning, self-test, self-calibration, sensor fusion

### Slide 6 — Smart Sensor Design = System Design
- Co-integrated electronics can **improve overall system performance**:
  - Operate sensor in optimal mode
  - Compensate for non-idealities (cross-sensitivity, temperature, packaging stress)
  - Feedback loops for improved linearity and bandwidth
- Design involves optimizing the **entire system** — not just the sensing element
- Packaging challenge: must allow sensor-to-measurand interaction while protecting from damage

---

## Section 2: Interface Electronics & Error Correction (Slides 7–13)

### Slide 7 — Interface Electronics: The Challenge
- Most sensors output **weak analog signals** (microvolt level)
  - Thermopiles, Hall plates, piezoresistive strain gauges
- Two reasons: transduction mechanism nature + small size limits energy extraction
- **Design challenge:** interface electronics must be "transparent" — circuit non-idealities (thermal noise, offset) must not limit sensor performance
- **Trend:** digitize as early as possible → digital signal processing (filtering, linearization, compensation)

### Slide 8 — The DC Signal Problem
- Most sensor signals include **DC component**
- Mainstream CMOS technology struggles with:
  - Random errors: drift, 1/f noise
  - Systematic errors: component mismatch, charge injection, leakage currents
- **Solution:** dynamic error correction techniques (trade speed/bandwidth for precision)
- Two categories:
  1. **Sample-and-correct** (e.g., auto-zeroing)
  2. **Modulate-and-filter** (e.g., chopping)

### Slide 9 — Auto-Zeroing (Sample-and-Correct)
- Amplifier input is periodically shorted
- Output fed to offset-canceling integrator
- During normal operation, integrator freezes output → cancels offset and 1/f noise
- **Drawback:** input shorting reduces amplifier availability
- **Solution:** ping-pong configuration with two alternately auto-zeroed amplifiers

### Slide 10 — Chopping (Modulate-and-Filter)
- Input signal modulated by square-wave → amplified → demodulated
- Amplifier offset and 1/f noise shifted to chopping frequency → removed by low-pass filter
- **Drawback:** filter limits useful bandwidth
- **Solution:** chopper-stabilized amplifiers (chopper amp improves low-frequency characteristics of wide-band main amp)

### Slide 11 — Sigma-Delta Modulation
- Combines: low-pass filter + ADC + DAC in feedback loop
- Quantization error (modeled as noise) is **high-pass filtered** when referred to input
- Noise-shaping enables very high resolution in narrow bandwidth
- Out-of-band noise removed by digital low-pass filter
- Can achieve **20+ bit resolution** and 18-bit linearity with dynamic error correction

### Slide 12 — Dynamic Element Matching (DEM)
- Used to achieve accurate current/voltage ratios despite component mismatch
- Example: 6 nominally equal current sources, switches rotate connections
- Mismatch errors **cancel out** on average
- Averaging done by same digital filter that suppresses quantization noise
- Can define gain factors to **better than 100 ppm accuracy**

### Slide 13 — Summary: Precision Techniques in Smart Sensors
| Technique | What It Fixes | Typical Result |
|-----------|--------------|----------------|
| Auto-zeroing | Offset, drift | μV-level offset |
| Chopping | Offset, 1/f noise | nV-level offset |
| Sigma-Delta ADC | Quantization noise | 20-22 bit resolution |
| DEM | Component mismatch | 100 ppm accuracy |
| Correlated double sampling | Residual offset | Sub-μV performance |

---

## Section 3: Case Study 1 — Smart Temperature Sensor (Slides 14–17)

### Slide 14 — Temperature Sensor: Operating Principle
- Sensing element: parasitic **bipolar junction transistor** in CMOS process
- Base-emitter voltage V_BE:
  - Linear with temperature: ~−2 mV/°C
  - Process-dependent (significant spread)
- **PTAT voltage** (ΔV_BE): difference between two transistors biased at 1:p current ratio
  - Proportional to absolute temperature
  - Independent of process parameters
  - Small signal: ~140 μV/K (for p=5) → needs low-offset electronics

### Slide 15 — Temperature Sensor: Circuit Architecture
- Sigma-delta modulator converts ΔV_BE and V_BE into temperature-dependent bitstream
- **Key innovation:** no explicit reference voltage needed (simplifies circuitry)
- Scale factor α = 16 set by sampling capacitor sizing
- **Target accuracy:** ±0.1°C over military range (−55°C to 125°C)
- Requires modulator offset < 2 μV, bias ratio accuracy ~100 ppm

### Slide 16 — Temperature Sensor: Error Correction Techniques Used
- **DEM:** accurate 1:5 bias current ratio (6 current sources, rotating switches)
- **Correlated double sampling:** reduces first integrator offset
- **Chopping:** entire modulator chopped → residual offset < 2 μV
- **Trimming:** 10-bit current DAC adjusts bias current → 0.01°C resolution
- All synchronized to main modulator bitstream timing

### Slide 17 — Temperature Sensor: Results & Recent Work
- **Original design:** 190 μW, ±0.1°C accuracy (state-of-the-art for CMOS)
- **Recent improvements:**
  - Voltage calibration in < 1 second (vs. minutes with reference sensor)
  - Two-step ADC (binary search + sigma-delta)
  - **New design:** 5 μW (40× less power), ±0.15°C accuracy

---

## Section 4: Case Study 2 — Smart Wind Sensor (Slides 18–21)

### Slide 18 — Wind Sensor: Operating Principle
- Solid-state sensor: measures wind speed & direction with **no moving parts**
- **Principle:** wind cools a heated object asymmetrically → temperature gradient δT
  - δT magnitude ∝ √(flow speed)
  - δT direction aligned with flow direction
- **Packaging:** CMOS chip glued to thin ceramic disc, airflow over opposite side
- Aerodynamic housing ensures sensitivity to horizontal wind components only

### Slide 19 — Wind Sensor: Design Approaches
**Approach 1: Direct measurement**
- 4 heaters + 4 thermopiles on chip
- Thermopiles measure orthogonal δT components
- Microvolt-level output → needs precision off-chip electronics
- Requires manual trimming + wind tunnel calibration (time-consuming, costly)

**Approach 2: Temperature-balance mode (smart)**
- Flow-induced δT continuously canceled by dynamic heater power adjustment
- Automatically centers heat distribution → thermal offset becomes well-defined function of flow
- **No manual trimming needed**
- Interface electronics digitizes heater power (milliwatt-level) instead of microvolt thermopile signals

### Slide 20 — Wind Sensor: Circuit Architecture
- Three thermal sigma-delta modulators:
  1. North-South δT component → δP_ns
  2. East-West δT component → δP_ew
  3. Constant overheat control (ΔT ~ 10°C above ambient) → wind speed measurement
- Sensor's thermal capacitance acts as modulator's loop filter
- Only needs clocked comparator per modulator → very compact
- Auto-zeroed comparators for microvolt-level thermopile signals

### Slide 21 — Wind Sensor: Results & Recent Work
- **Original design:** wind tunnel tested 1-25 m/s, < 4% speed error, < 2° direction error
- No chip area increase vs. non-smart version
- **Recent improvements:**
  - Constant power mode: eliminates overheat control loop → lower power
  - Electrical filter + system-level chopping → reduces quantization noise
  - **New design:** 25 mW (16× less), same accuracy (< 4%, < 2°)

---

## Section 5: Case Study 3 — Smart Hall Sensor (Slides 22–24)

### Slide 22 — Hall Sensor: Operating Principle
- **Hall effect:** current-carrying plate in magnetic field → transverse voltage
- Hall voltage ∝ bias current × magnetic field strength
- CMOS Hall plate: ~100 V/T sensitivity
- At 1 mA bias, Earth's 50 μT field → only **5 μV Hall voltage**
- **Challenge:** accurately digitize microvolt signal
- **Problem:** silicon Hall plates have large offset (5-50 mT) due to stress, doping, lithography
  - Offset drift = time-varying angular error (bad for compass)

### Slide 23 — Hall Sensor: Error Correction
- **Spinning current method:** spatially rotate bias current + time-average output
  - Reduces offset to ~10 μT level, reduces drift
  - Not sufficient alone for compass
- **Orthogonal coupling:** 4 Hall plates → further offset/drift reduction
- **Custom packaging:** epoxy package free of ferromagnetic materials
- **Nested chopping:** two-level chopping scheme
  - Fast choppers at 12.5 kHz → reduces residual offset spikes
  - Dead-band implementation → further spike reduction
  - Slow chopper at ~10 Hz → inverts polarity for final offset cancellation

### Slide 24 — Hall Sensor: Results & Recent Work
- **Achieved performance:**
  - Offset: 4 μT
  - Offset temp coefficient: 8 nT/K
  - Offset drift: < 0.25 μT after thermal cycling
  - **Angular error: < 0.5°** — best reported for CMOS Hall sensor
- **Recent developments:**
  - 3D sensors with thin-film magnetic concentrators
  - Co-integrated stress + temperature sensors for cross-sensitivity compensation

---

## Section 6: Conclusions (Slides 25–26)

### Slide 25 — Key Takeaways
1. **Smart sensors = sensor + interface electronics in one package**
2. **Dynamic error correction is essential:** auto-zeroing, chopping, DEM, sigma-delta
3. **Precision enables novel sensing:** techniques that detect previously undetectable signals
4. **Precision can be traded for:** chip area, power dissipation, calibration complexity
5. **Smart sensor design is system design** — optimization of sensor, electronics, and packaging together

### Slide 26 — Looking Ahead
- Chapter 2: Calibration and trimming techniques in detail
- Chapter 3: Precision instrumentation amplifiers
- Chapter 4: Dedicated impedance sensor systems
- Chapter 5: Low-power vibratory gyroscope readout
- TinyML integration (Ch.3 of course): applying ML to smart sensor data

---

## Slide Design Notes

### Visual Elements to Include
- **Figures from source:**
  - Fig 1.1: Auto-zeroed amplifier block diagram
  - Fig 1.2: Chopper amplifier diagram
  - Fig 1.3: Sigma-delta modulator
  - Fig 1.4: CMOS temperature sensor circuit
  - Fig 1.5: Temperature dependence of V_BE
  - Fig 1.6: Temperature sensor interface electronics
  - Fig 1.7: Wind sensor operating principle
  - Fig 1.8: Wind sensor chip layout
  - Fig 1.9: Wind sensor block diagram
  - Fig 1.10: Custom Hall sensor package
  - Fig 1.11: Hall sensor interface block diagram
  - Fig 1.12: Chopped voltage-to-current converter

### Slide Style Recommendations
- Each case study follows pattern: Principle → Interface Electronics → Results
- Use comparison tables for techniques
- Highlight key numbers (accuracy, power, offset)
- Circuit diagrams should be simplified for clarity
- Include "Design Challenge → Solution → Result" flow for each case study
