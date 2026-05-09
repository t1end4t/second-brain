import PptxGenJS from "pptxgenjs";

let pres = new PptxGenJS();
pres.layout = "LAYOUT_16x9";
pres.author = "Smart Sensor Systems";
pres.title = "Chapter 1 — Smart Sensor Design";

// === Slide 4: Silicon Transduction Mechanisms ===

let slide = pres.addSlide();
slide.background = { color: "0F1C2E" };

// Left accent bar
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.12, h: 5.625,
  fill: { color: "0891B2" }
});

// Section number badge
slide.addShape(pres.shapes.RECTANGLE, {
  x: 1.2, y: 0.6, w: 1.8, h: 0.4,
  fill: { color: "1A2D47" },
  rectRadius: 0.08
});
slide.addText("3 / 6", {
  x: 1.2, y: 0.6, w: 1.8, h: 0.4,
  fontSize: 12, fontFace: "Calibri", color: "0891B2",
  bold: true, align: "center", valign: "middle"
});

// Title
slide.addText("Silicon Transduction Mechanisms", {
  x: 1.2, y: 1.2, w: 7.6, h: 0.8,
  fontSize: 32, fontFace: "Georgia", color: "FFFFFF",
  bold: true, align: "left", valign: "middle"
});

slide.addShape(pres.shapes.LINE, {
  x: 1.2, y: 2.0, w: 7.6, h: 0,
  line: { color: "1A3A5C", width: 1 }
});

// === Main mechanisms table ===
const tableData = [
  [ { text: "MEASURAND", options: { fontColor: "94A3B8", bold: true, align: "center" } },
    { text: "EFFECT", options: { fontColor: "94A3B8", bold: true, align: "center" } },
    { text: "SILICON SENSING PRINCIPLE", options: { fontColor: "94A3B8", bold: true, align: "center" } } ],
  [ { text: "Magnetic field", options: { fontColor: "CBD5E1", align: "center" } },
    { text: "Hall effect", options: { fontColor: "0891B2", bold: true, align: "center" } },
    { text: "Transverse voltage in current-carrying plate", options: { fontColor: "94A3B8", align: "center" } } ],
  [ { text: "Temperature diff.", options: { fontColor: "CBD5E1", align: "center" } },
    { text: "Seebeck effect", options: { fontColor: "0891B2", bold: true, align: "center" } },
    { text: "Thermopile: series-connected junctions", options: { fontColor: "94A3B8", align: "center" } } ],
  [ { text: "Mechanical strain", options: { fontColor: "CBD5E1", align: "center" } },
    { text: "Piezoresistive", options: { fontColor: "0891B2", bold: true, align: "center" } },
    { text: "Resistance change under stress (doping-dependent)", options: { fontColor: "94A3B8", align: "center" } } ],
  [ { text: "Light", options: { fontColor: "CBD5E1", align: "center" } },
    { text: "Photoelectric", options: { fontColor: "0891B2", bold: true, align: "center" } },
    { text: "Photodiode / phototransistor array", options: { fontColor: "94A3B8", align: "center" } } ],
];

slide.addTable(tableData, {
  x: 1.2, y: 2.3, w: 7.6, h: 2.2,
  colW: [2.0, 1.6, 4.0],
  border: { type: "single", pt: 0.5, color: "1A3A5C" },
  rowH: [0.35, 0.4, 0.4, 0.4, 0.4],
  fill: { type: "solid", color: "1A2D47" },
  margin: 6,
  fontSize: 12,
  fontFace: "Calibri",
});

// === Indirect sensing ===
slide.addShape(pres.shapes.RECTANGLE, {
  x: 1.2, y: 4.7, w: 7.6, h: 0.6,
  fill: { color: "1A2D47" },
  rectRadius: 0.1
});
slide.addText("Indirect Sensing — measuring what silicon can't sense directly", {
  x: 1.2 + 0.15, y: 4.7 + 0.05, w: 7.6 - 0.3, h: 0.3,
  fontSize: 12, fontFace: "Calibri", color: "F59E0B",
  bold: true, align: "left", valign: "middle"
});
slide.addText(
  "Humidity → polymer dielectric  |  Gas → metal oxide resistance  |  Force → membrane deflection",
  {
    x: 1.2 + 0.15, y: 4.7 + 0.35, w: 7.6 - 0.3, h: 0.25,
    fontSize: 11, fontFace: "Calibri", color: "CBD5E1",
    align: "left", valign: "middle", italic: true
  }
);

pres.writeFile({ fileName: "slide4.pptx" });
console.log("✅ slide4.mjs → slide4.pptx (1 slide)");
