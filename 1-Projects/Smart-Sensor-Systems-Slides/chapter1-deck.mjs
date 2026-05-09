import PptxGenJS from "pptxgenjs";

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_16x9";
pptx.author = "Smart Sensor Systems";
pptx.subject = "Chapter 1 — Smart Sensor Design";
pptx.title = "Chapter 1 — Smart Sensor Design";
pptx.company = "Phenikaa University";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Georgia",
  bodyFontFace: "Calibri",
  lang: "en-US"
};
pptx.defineLayout({ name: "WIDE", width: 10, height: 5.625 });
pptx.layout = "WIDE";
pptx.margin = 0;

const C = {
  bg: "0F1C2E", panel: "1A2D47", line: "1A3A5C", cyan: "0891B2",
  text: "FFFFFF", body: "CBD5E1", muted: "94A3B8", dim: "64748B",
  amber: "F59E0B", green: "10B981", red: "EF4444"
};

function base(slide, section="") {
  slide.background = { color: C.bg };
  slide.addShape(pptx.ShapeType.rect, { x:0, y:0, w:0.12, h:5.625, fill:{color:C.cyan}, line:{color:C.cyan} });
  if (section) {
    slide.addShape(pptx.ShapeType.roundRect, { x:1.0, y:0.45, w:1.35, h:0.34, rectRadius:0.06, fill:{color:C.panel}, line:{color:C.panel} });
    slide.addText(section, { x:1.0, y:0.45, w:1.35, h:0.34, fontSize:10.5, color:C.cyan, bold:true, align:"center", valign:"mid" });
  }
}
function title(slide, text, size=32) {
  slide.addText(text, { x:1.0, y:0.95, w:8.0, h:0.65, fontSize:size, fontFace:"Georgia", color:C.text, bold:true, margin:0 });
  slide.addShape(pptx.ShapeType.line, { x:1.0, y:1.72, w:8.0, h:0, line:{color:C.line, width:1} });
}
function footer(slide, text) {
  slide.addShape(pptx.ShapeType.rect, { x:1.0, y:5.28, w:8.0, h:0.24, fill:{color:C.cyan}, line:{color:C.cyan} });
  slide.addText(text, { x:1.08, y:5.30, w:7.84, h:0.18, fontSize:10, color:C.text, bold:true, align:"center", margin:0 });
}
function bullets(slide, items, x, y, w, h, fs=14) {
  slide.addText(items.map(t => `• ${t}`).join("\n"), { x, y, w, h, fontSize:fs, fontFace:"Calibri", color:C.body, breakLine:false, fit:"shrink", valign:"top", margin:0.04, bullet:false, paraSpaceAfterPt:5, breakLine:false });
}
function panel(slide, x,y,w,h, heading, body, accent=C.cyan, fs=13) {
  slide.addShape(pptx.ShapeType.roundRect, { x,y,w,h, rectRadius:0.08, fill:{color:C.panel}, line:{color:C.line, transparency:15} });
  slide.addText(heading, { x:x+0.16, y:y+0.13, w:w-0.32, h:0.28, fontSize:16, color:accent, bold:true, margin:0 });
  slide.addText(body, { x:x+0.16, y:y+0.55, w:w-0.32, h:h-0.68, fontSize:fs, color:C.body, fit:"shrink", valign:"top", margin:0, paraSpaceAfterPt:4, breakLine:false });
}
function callout(slide, text, x, y, w, h, color=C.amber) {
  slide.addShape(pptx.ShapeType.roundRect, { x,y,w,h, rectRadius:0.06, fill:{color:"17233A"}, line:{color, width:1.2} });
  slide.addText(text, { x:x+0.14, y:y+0.08, w:w-0.28, h:h-0.16, fontSize:14, color:C.body, bold:true, fit:"shrink", align:"center", valign:"mid", margin:0 });
}
function process(slide, steps, y=2.45) {
  const w=1.65, gap=0.28, x0=1.0;
  steps.forEach((s,i)=>{
    panel(slide, x0+i*(w+gap), y, w, 1.2, s[0], s[1], i===steps.length-1?C.amber:C.cyan, 10.5);
    if(i<steps.length-1) slide.addText("→", {x:x0+i*(w+gap)+w+0.05, y:y+0.38, w:0.2, h:0.3, fontSize:22, color:C.cyan, bold:true, margin:0});
  });
}

function slide1() {
  const s=pptx.addSlide(); base(s);
  s.addShape(pptx.ShapeType.line,{x:1.0,y:0.95,w:8.0,h:0,line:{color:C.line,width:1.5}});
  s.addText("CHAPTER 1",{x:1.0,y:1.25,w:8,h:0.35,fontSize:14,color:C.cyan,bold:true,charSpacing:4,margin:0});
  s.addText("Smart Sensor Design",{x:1.0,y:1.75,w:8,h:0.8,fontSize:42,fontFace:"Georgia",color:C.text,bold:true,margin:0});
  s.addText("Fundamentals, Design Techniques, and Case Studies",{x:1.0,y:2.75,w:8,h:0.35,fontSize:20,color:C.muted,italic:true,margin:0});
  callout(s,"EEE703708 · Smart Sensor Systems",1.0,4.1,8.0,0.62,C.cyan);
  s.addText("Based on: Meijer, Pertijs & Makinwa — Smart Sensor Systems",{x:1.0,y:5.25,w:8,h:0.2,fontSize:9,color:C.dim,margin:0});
}
function simpleCards(num, sec, t, cards, foot) { const s=pptx.addSlide(); base(s,sec); title(s,t, cards.length>3?29:34); const cols=cards.length===2?2:cards.length===3?3:2; const w=cols===3?2.5:3.85, h=cards.length>3?1.25:2.55, gap=0.25; cards.forEach((c,i)=>{ const row=Math.floor(i/cols), col=i%cols; panel(s,1.0+col*(w+gap),2.05+row*(h+0.25),w,h,c[0],c[1],c[2]||C.cyan,c[3]||12);}); if(foot) footer(s,foot); }
function tableSlide(num, sec, t, rows, foot) { const s=pptx.addSlide(); base(s,sec); title(s,t,30); const data=rows.map((r,i)=>r.map((v,j)=>({text:v,options:{fontColor:i? (j===1?C.cyan:C.body):C.muted,bold:i===0||j===1,align:"center",valign:"mid"}}))); s.addTable(data,{x:1.0,y:2.05,w:8.0,h:2.7,colW:[2.3,2.0,3.7],rowH:[0.4,...Array(rows.length-1).fill(0.46)],border:{type:"single",pt:0.5,color:C.line},fill:{color:C.panel},fontSize:11.5,margin:5}); if(foot) footer(s,foot); }

slide1();
simpleCards(2,"1 / 6","Sensors Are Everywhere",[["🚗 Cars","Position sensors\nMEMS accelerometers\nGyroscopes\nTire pressure\nProximity / parking"],["🏠 Homes","Thermostats\nMotion sensing\nGas / smoke flow\nDoor/window contacts\nWater leak detection"],["📱 Mobile Phones","Touch + image sensors\nMEMS microphones\nInertial sensing\nE-compass\nGPS + environment"]],"Sensors transformed everyday devices — cars, homes, phones.");
simpleCards(3,"2 / 6","Why Silicon?",[["Low Cost","Mass-producible by mature semiconductor industry"],["Integration","Sensor + interface circuitry in one substrate/package"],["Material Control","High-purity, tunable physical properties"],["Trade-off","Not always best raw performance; wins on cost + size + system integration",C.amber]],"Silicon's value proposition: cost + size + integration.");
tableSlide(4,"3 / 6","Silicon Transduction Mechanisms",[["MEASURAND","EFFECT","PRINCIPLE"],["Magnetic field","Hall effect","Transverse voltage in current-carrying plate"],["Temperature difference","Seebeck effect","Thermopile junction voltage"],["Mechanical strain","Piezoresistive","Resistance change under stress"],["Light","Photoelectric","Photodiode / phototransistor array"],["Humidity / gas","Indirect","Polymer dielectric / metal-oxide resistance"]],"Many sensors convert physical effects into tiny electrical signals.");
simpleCards(5,"4 / 6","What Is a Smart Sensor?",[["Definition","System-in-package combining a sensor with dedicated interface electronics",C.cyan,13],["Close Coupling","Electronics near sensor reduce interference and transmission losses",C.green,13],["Examples","Single-chip: temperature, image, Hall\nTwo-chip: MEMS accel, gyro, mic",C.amber,12],["Added Functions","Signal conditioning\nStandardized output\nSelf-test + self-calibration\nSensor fusion",C.cyan,12]],"Smart sensor = sensing element + nearby intelligence.");
simpleCards(6,"5 / 6","Smart Sensor Design = System Design",[["Optimize Operation","Run the sensing element in its best physical/electrical mode"],["Compensate Errors","Correct cross-sensitivity, temperature effects, package stress"],["Use Feedback","Improve linearity, bandwidth, dynamic range"],["Package Correctly","Expose sensor to measurand while protecting the device",C.amber]],"Performance comes from optimizing sensor + electronics + packaging together.");
simpleCards(7,"6 / 6","Interface Electronics: The Challenge",[["Weak Signals","Thermopiles, Hall plates, strain gauges often produce microvolt-level outputs",C.amber],["Transparent Interface","Circuit noise, offset, drift must not dominate sensor performance",C.cyan],["Early Digitization","Convert to digital early, then filter / linearize / compensate in DSP",C.green]],"The interface must reveal the sensor — not become the sensor limit.");
simpleCards(8,"2 / 6","The DC Signal Problem",[["Sensor Reality","Many measurands include DC or low-frequency components"],["CMOS Limits","Drift, 1/f noise, mismatch, charge injection, leakage"],["Precision Strategy","Dynamic error correction trades speed/bandwidth for accuracy",C.amber],["Two Families","Sample-and-correct\nModulate-and-filter",C.green]],"Low-frequency precision is hard; dynamic techniques make it practical.");
{const s=pptx.addSlide(); base(s,"2 / 6"); title(s,"Auto-Zeroing: Sample-and-Correct",31); process(s,[["1. Sample","Short input; measure offset"],["2. Store","Offset-canceling integrator stores correction"],["3. Amplify","Apply correction during normal sensing"],["4. Ping-Pong","Two amps alternate to avoid downtime"]]); footer(s,"Auto-zeroing cancels offset + 1/f noise, but reduces availability unless ping-ponged.");}
{const s=pptx.addSlide(); base(s,"2 / 6"); title(s,"Chopping: Modulate-and-Filter",31); process(s,[["1. Modulate","Move sensor signal to chopping frequency"],["2. Amplify","Offset + 1/f noise stay near DC"],["3. Demodulate","Signal returns to baseband"],["4. Filter","Remove shifted error terms"]]); footer(s,"Chopping achieves excellent low-frequency precision; filter limits bandwidth.");}
{const s=pptx.addSlide(); base(s,"2 / 6"); title(s,"Sigma-Delta Modulation",32); process(s,[["Input","Low-bandwidth analog sensor signal"],["Loop","Filter + ADC + DAC feedback"],["Noise Shape","Quantization noise pushed out-of-band"],["Digital LPF","Remove out-of-band noise → high resolution"]]); callout(s,"Can reach 20+ bit resolution in narrow bandwidths",2.0,4.25,6.0,0.55,C.green);}
simpleCards(12,"2 / 6","Dynamic Element Matching (DEM)",[["Problem","Component mismatch corrupts current/voltage ratios"],["Method","Rotate nominally equal elements through switch network"],["Effect","Mismatch becomes dynamic error, then averages out"],["Filter Synergy","Same digital filter suppresses DEM ripple + quantization noise",C.green]],"DEM converts static mismatch into average-cancelled error.");
tableSlide(13,"2 / 6","Precision Techniques in Smart Sensors",[["TECHNIQUE","FIXES","TYPICAL RESULT"],["Auto-zeroing","Offset, drift","µV-level offset"],["Chopping","Offset, 1/f noise","nV-level offset"],["Sigma-Delta ADC","Quantization noise","20–22 bit resolution"],["DEM","Component mismatch","~100 ppm ratio accuracy"],["Correlated double sampling","Residual offset","Sub-µV performance"]],"Precision is assembled from complementary correction techniques.");
simpleCards(14,"3 / 6","Temperature Sensor: Operating Principle",[["Sensing Element","Parasitic bipolar transistor available in CMOS"],["VBE","~−2 mV/°C; useful but process-dependent",C.amber],["ΔVBE","PTAT voltage from 1:p current ratio; process-independent"],["Challenge","Small signal ~140 µV/K for p=5 → needs low-offset electronics",C.red]],"Temperature sensing turns BJT physics into a precision digital output.");
simpleCards(15,"3 / 6","Temperature Sensor: Circuit Architecture",[["Core Idea","Sigma-delta modulator converts ΔVBE and VBE into temperature bitstream"],["No Reference","Temperature is derived without explicit reference voltage",C.green],["Scale Factor","α = 16 set by sampling capacitor sizing"],["Accuracy Target","±0.1°C from −55°C to 125°C; offset < 2 µV",C.amber]],"Architecture removes reference dependence but demands extreme offset control.");
simpleCards(16,"3 / 6","Temperature Sensor: Error Correction",[["DEM","Accurate 1:5 bias current ratio using rotating current sources"],["CDS","Reduces first integrator offset"],["Chopping","Chops entire modulator; residual offset < 2 µV"],["Trimming","10-bit current DAC; ~0.01°C resolution",C.green]],"Multiple correction loops synchronize with the main modulator timing.");
simpleCards(17,"3 / 6","Temperature Sensor: Results",[["Original Design","190 µW and ±0.1°C accuracy across military range",C.green],["Fast Calibration","Voltage calibration in < 1 second vs. minutes with reference sensor"],["Two-Step ADC","Binary search followed by sigma-delta conversion"],["Newer Design","5 µW (≈40× lower power), ±0.15°C accuracy",C.amber]],"Smart architecture trades circuit complexity for calibrated precision at low power.");
simpleCards(18,"4 / 6","Wind Sensor: Operating Principle",[["Solid-State","Measures speed + direction with no moving parts",C.green],["Thermal Principle","Wind cools a heated object asymmetrically → δT"],["Flow Encoding","δT magnitude ∝ √speed; δT direction aligns with flow"],["Packaging","CMOS chip on ceramic disc; housing selects horizontal airflow",C.amber]],"Wind is sensed as a controlled thermal imbalance.");
simpleCards(19,"4 / 6","Wind Sensor: Design Approaches",[["Direct Measurement","4 heaters + 4 thermopiles measure orthogonal δT; µV signals need precision electronics",C.amber,12],["Cost Problem","Manual trimming + wind-tunnel calibration are slow and expensive",C.red,12],["Temperature-Balance Mode","Feedback adjusts heater power to cancel flow-induced δT",C.green,12],["Smart Output","Digitize mW-level heater power instead of µV thermopile signals",C.cyan,12]],"Smart mode moves the hard measurement from tiny voltage to controllable power.");
simpleCards(20,"4 / 6","Wind Sensor: Circuit Architecture",[["3 Thermal ΣΔ Loops","North–South δT, East–West δT, constant overheat"],["Natural Loop Filter","Sensor thermal capacitance acts as modulator loop filter",C.green],["Compact Electronics","Only clocked comparator per modulator"],["Microvolt Care","Auto-zeroed comparators handle thermopile signals",C.amber]],"The physics of the sensor becomes part of the sigma-delta loop.");
simpleCards(21,"4 / 6","Wind Sensor: Results",[["Original Test","1–25 m/s wind tunnel range",C.cyan],["Accuracy","<4% speed error and <2° direction error",C.green],["Area","No chip-area increase vs. non-smart version"],["Newer Design","Constant-power mode: 25 mW (≈16× less), same accuracy",C.amber]],"Feedback-based smart sensing improves calibration, power, and robustness.");
simpleCards(22,"5 / 6","Hall Sensor: Operating Principle",[["Hall Effect","Current-carrying plate in magnetic field → transverse voltage"],["Tiny Signal","100 V/T sensitivity; Earth field at 1 mA ≈ 5 µV",C.red],["Offset Problem","Stress, doping, lithography create 5–50 mT offset"],["Compass Impact","Offset drift becomes time-varying angular error",C.amber]],"Hall sensing is useful because it is integrated; difficult because signals are tiny.");
simpleCards(23,"5 / 6","Hall Sensor: Error Correction",[["Spinning Current","Spatially rotate bias current; time-average output"],["Orthogonal Coupling","4 Hall plates reduce offset + drift further"],["Clean Package","Epoxy package avoids ferromagnetic contamination",C.green],["Nested Chopping","Fast 12.5 kHz + slow ~10 Hz chopping suppress residual offset",C.amber]],"Offset cancellation must span device geometry, packaging, and readout electronics.");
simpleCards(24,"5 / 6","Hall Sensor: Results",[["Offset","4 µT residual offset",C.green],["Temperature Coeff.","8 nT/K"],["Drift","<0.25 µT after thermal cycling"],["Angular Error","<0.5° — best reported CMOS Hall result",C.amber]],"Precision interface + packaging turns µV Hall signals into compass-grade sensing.");
simpleCards(25,"6 / 6","Key Takeaways",[["Smart Sensor","Sensor + interface electronics in one package",C.cyan],["Dynamic Correction","Auto-zeroing, chopping, DEM, sigma-delta are essential"],["Precision Enables","Previously undetectable physical signals become usable",C.green],["System Design","Optimize sensor, electronics, feedback, calibration, packaging together",C.amber]],"Smart sensor design is system optimization, not only sensor selection.");
simpleCards(26,"6 / 6","Looking Ahead",[["Chapter 2","Calibration and self-calibration techniques",C.cyan],["Chapter 3","Precision instrumentation amplifiers",C.green],["Later Systems","Impedance sensors, gyroscope readout, data processing"],["Course Link","Apply smart processing / ML to sensor data in later chapters",C.amber]],"Next: calibration and precision readout techniques in more depth.");

await pptx.writeFile({ fileName: "Chapter1-Smart-Sensor-Design.pptx" });
console.log("✅ Chapter1-Smart-Sensor-Design.pptx generated (26 slides)");
