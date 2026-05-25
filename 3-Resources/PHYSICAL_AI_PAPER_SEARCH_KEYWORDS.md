# Physical AI Paper Search Keywords

Purpose: high-precision search plan for paper discovery/download around efficient physics-informed AI, tinyAI/TinyML, and physical sensing/NDT.

This file treats **Physical AI** as AI for physical systems, physical sensing, and physics-informed learning. It does **not** mean robotics, embodied agents, or humanoids unless explicitly connected to physics-informed sensing or edge deployment.

## Long-term focus

Main topic:

- Efficient physics-informed AI for NDT, structural health monitoring, and edge physical sensing.

Working identity:

- Tiny physics-informed models that learn from limited/noisy sensor data, respect physical constraints, and run efficiently on edge devices.

## Search sources

General paper search:

- https://arxiv.org/
- https://openreview.net/
- https://paperswithcode.com/
- https://www.semanticscholar.org/
- https://scholar.google.com/
- https://ieeexplore.ieee.org/
- https://www.sciencedirect.com/
- https://link.springer.com/

Venue / journal families to check:

- NeurIPS, ICLR, ICML, AAAI, IJCAI
- IEEE Sensors, IEEE TIM, IEEE TII, IEEE IoT Journal
- Mechanical Systems and Signal Processing
- NDT & E International
- Structural Health Monitoring
- Computer Methods in Applied Mechanics and Engineering
- Journal of Computational Physics

## Matching policy -- do not use flat OR matching

This file is an intent map, not a raw keyword bag. A paper must match one topic's anchor + qualifier rules before download.

Workflow:

1. Filter title, abstract, keywords, venue, and year.
2. Require at least one topic anchor.
3. Require at least one physical-domain, physics-informed, or deployment qualifier.
4. Reject weak-keyword-only matches.
5. Dry-run and review candidate table before bulk download.
6. Download only approved, non-duplicate candidates.

Candidate table columns:

- title
- venue/year/status
- matched topic
- matched anchors
- matched qualifiers
- weak terms seen
- accept/reject reason
- confidence: high / medium / low
- existing duplicate? yes / no

### Global anchors

At least one relevant anchor must appear in the title, abstract, keywords, or primary area unless the paper title is an exact strong phrase match.

Physics-informed anchors:

- physics-informed neural network
- PINN
- physics-informed machine learning
- physics-guided machine learning
- physics-constrained learning
- scientific machine learning
- SciML
- neural operator
- operator learning
- surrogate model
- inverse problem

TinyAI / edge anchors:

- tinyML
- TinyAI
- edge AI
- embedded AI
- on-device inference
- low-power inference
- model compression
- quantization
- pruning
- knowledge distillation
- efficient neural network

NDT / physical sensing anchors:

- non-destructive testing
- nondestructive testing
- NDT
- structural health monitoring
- SHM
- damage detection
- defect detection
- defect localization
- ultrasonic testing
- guided wave
- acoustic emission
- vibration signal
- thermography
- eddy current testing
- sensor fusion

### Weak terms -- never accept alone

These terms are useful only as qualifiers after an anchor is present. They must not trigger downloads by themselves:

- physics
- physical
- AI
- machine learning
- deep learning
- neural network
- sensor
- signal
- anomaly detection
- classification
- regression
- prediction
- monitoring
- diagnosis
- lightweight
- efficient
- real-time
- low data
- noisy data
- domain shift
- transfer learning
- uncertainty
- robustness

### Automatic reject rules

Reject a paper when the match is only about:

- robotics, embodied AI, humanoids, navigation, or control without NDT/physical sensing/physics-informed modeling
- generic tinyML for images/audio/IoT without physical-system constraints
- generic PINN benchmarks without sensing, inverse problems, or deployment relevance
- generic anomaly detection without NDT/SHM/physical signal context
- generic model compression without edge physical sensing or physics-preservation context
- pure finite element / numerical simulation without ML or surrogate learning
- pure materials/chemistry/biology ML without physical sensing, inverse problems, or physics-informed constraints

## Topic 1 -- Tiny physics-informed AI

Goal: small, efficient models that preserve physical constraints and run under edge or embedded constraints.

Accept only if the paper has:

- a tinyAI / edge / compression anchor, and
- a physics-informed / scientific ML / physical-system qualifier.

Strong standalone matches:

- tinyML for physics-informed learning
- edge physics-informed neural network
- embedded physics-informed machine learning
- physics-preserving model compression
- quantized physics-informed neural network
- efficient scientific machine learning on edge devices

Core keywords:

- tinyML
- TinyAI
- edge AI
- embedded AI
- low-power inference
- on-device inference
- real-time inference
- model compression
- quantization
- pruning
- knowledge distillation
- neural architecture search

Physics qualifiers:

- physics-informed
- physics-guided
- physics-constrained
- scientific machine learning
- physical constraint
- governing equation
- conservation law
- PDE
- inverse problem
- surrogate model

Search queries:

```text
("tinyML" OR "TinyAI" OR "edge AI" OR "embedded AI") AND ("physics-informed" OR "physics-guided" OR "scientific machine learning")
```

```text
("model compression" OR quantization OR pruning OR "knowledge distillation") AND ("physics-informed neural network" OR PINN OR "scientific machine learning")
```

```text
("on-device inference" OR "low-power inference" OR "real-time inference") AND ("physical sensing" OR NDT OR "structural health monitoring")
```

## Topic 2 -- Physics-informed NDT and SHM

Goal: physics-informed learning for defect detection, damage localization, inverse problems, and physical signal interpretation.

Accept only if the paper has:

- an NDT / SHM / physical sensing anchor, and
- a physics-informed / inverse problem / scientific ML anchor.

Strong standalone matches:

- physics-informed NDT
- physics-informed structural health monitoring
- PINN for defect detection
- PINN for damage localization
- physics-guided ultrasonic testing
- physics-informed guided wave monitoring

Core keywords:

- non-destructive testing
- nondestructive testing
- NDT
- structural health monitoring
- SHM
- damage detection
- defect detection
- defect localization
- ultrasonic testing
- guided wave
- acoustic emission
- vibration signal
- thermography
- eddy current testing

Physics / method keywords:

- physics-informed neural network
- PINN
- physics-guided learning
- inverse problem
- wave propagation
- finite element
- digital twin
- surrogate model
- uncertainty quantification
- domain adaptation
- sensor fusion

Search queries:

```text
("non-destructive testing" OR NDT OR "structural health monitoring" OR SHM) AND ("physics-informed" OR PINN OR "physics-guided")
```

```text
("ultrasonic testing" OR "guided wave" OR "acoustic emission" OR vibration OR thermography OR "eddy current") AND ("inverse problem" OR "defect localization" OR "damage detection")
```

```text
("wave propagation" OR "finite element" OR "digital twin") AND ("machine learning" OR "neural network") AND (NDT OR SHM)
```

## Topic 3 -- Edge inverse problems for physical sensing

Goal: solve inverse problems from limited/noisy sensor data with models small enough for real-time or embedded use.

Accept only if the paper has:

- an inverse-problem / sensing anchor, and
- an edge / efficient / deployment qualifier.

Strong standalone matches:

- edge inverse problem
- real-time defect localization
- embedded damage detection
- low-power structural health monitoring
- on-device anomaly detection for physical sensing

Core keywords:

- inverse problem
- defect localization
- damage localization
- parameter estimation
- source localization
- anomaly detection
- sparse sensing
- compressed sensing
- limited sensor data
- noisy sensor data

Efficiency / deployment keywords:

- edge deployment
- embedded deployment
- real-time
- low latency
- low power
- memory efficient
- compute efficient
- quantized model
- compressed model

Search queries:

```text
("inverse problem" OR "defect localization" OR "damage localization") AND ("edge" OR embedded OR "real-time" OR "low-power")
```

```text
("limited sensor data" OR "noisy sensor data" OR "sparse sensing") AND ("physics-informed" OR "physics-guided") AND ("NDT" OR "structural health monitoring")
```

```text
("anomaly detection" OR "damage detection") AND ("physical sensing" OR "vibration signal" OR "ultrasonic") AND ("tinyML" OR "edge AI")
```

## Topic 4 -- Physics-preserving compression

Goal: compress physics-informed or scientific ML models while preserving physical consistency.

Accept only if the paper has:

- a compression anchor, and
- a physical consistency / physics-informed / scientific ML qualifier.

Strong standalone matches:

- physics-preserving compression
- physics-aware quantization
- quantized PINN
- compressed PINN
- distillation for physics-informed neural networks

Core keywords:

- model compression
- quantization
- pruning
- knowledge distillation
- low-rank adaptation
- sparse neural network
- efficient architecture
- neural architecture search

Physics consistency keywords:

- physical consistency
- conservation law
- boundary condition
- governing equation
- PDE residual
- constraint violation
- physics-informed loss
- error bound

Search queries:

```text
("model compression" OR quantization OR pruning OR "knowledge distillation") AND ("physics-informed neural network" OR PINN)
```

```text
("physics-preserving" OR "physics-aware" OR "physical consistency") AND (compression OR quantization OR pruning)
```

```text
("PDE residual" OR "boundary condition" OR "conservation law") AND (quantization OR pruning OR distillation)
```

## Priority search set

Use this compact set first, but still apply matching policy:

```text
physics-informed neural network
PINN
physics-informed machine learning
physics-guided machine learning
scientific machine learning
tinyML
TinyAI
edge AI
embedded AI
on-device inference
model compression
quantization
knowledge distillation
non-destructive testing
NDT
structural health monitoring
SHM
ultrasonic testing
guided wave
acoustic emission
vibration signal
defect detection
damage localization
inverse problem
physics-preserving compression
```

## Tagging suggestions

When downloading papers, tag by topic:

- `physical-ai`
- `physics-informed-ai`
- `pinn`
- `tiny-ai`
- `tinyml`
- `edge-ai`
- `ndt`
- `shm`
- `ultrasonic-testing`
- `guided-wave`
- `acoustic-emission`
- `inverse-problem`
- `defect-detection`
- `damage-localization`
- `physics-preserving-compression`
- `model-compression`
- `quantization`
- `knowledge-distillation`

## Current interpretation

- Physical AI means AI for physical systems, physics-informed modeling, sensing, and deployment under real-world constraints.
- NDT and SHM are the best continuity path from previous work.
- TinyAI is most interesting when paired with physical constraints, limited data, edge deployment, or real-time sensing.
- Generic LLM agents, robotics, and pure efficient LLM inference are side topics, not the main search focus.
