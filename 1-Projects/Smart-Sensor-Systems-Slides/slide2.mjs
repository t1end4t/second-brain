import PptxGenJS from "pptxgenjs";

let pres = new PptxGenJS();
pres.layout = "LAYOUT_16x9";
pres.author = "Smart Sensor Systems";
pres.title = "Chapter 1 — Smart Sensor Design";

// === Slide 2: Sensors Are Everywhere ===

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
slide.addText("1 / 6", {
  x: 1.2, y: 0.6, w: 1.8, h: 0.4,
  fontSize: 12, fontFace: "Calibri", color: "0891B2",
  bold: true, align: "center", valign: "middle"
});

// Title
slide.addText("Sensors Are Everywhere", {
  x: 1.2, y: 1.2, w: 7.6, h: 0.8,
  fontSize: 36, fontFace: "Georgia", color: "FFFFFF",
  bold: true, align: "left", valign: "middle"
});

slide.addShape(pres.shapes.LINE, {
  x: 1.2, y: 2.0, w: 7.6, h: 0,
  line: { color: "1A3A5C", width: 1 }
});

// === Three columns ===
const colW = 2.3;
const colGap = 0.25;
const startX = 1.2;
const colY = 2.4;
const colH = 2.8;

// Column 1: Cars
slide.addShape(pres.shapes.RECTANGLE, {
  x: startX, y: colY, w: colW, h: colH,
  fill: { color: "1A2D47" },
  rectRadius: 0.1
});
slide.addText("🚗  Cars", {
  x: startX + 0.15, y: colY + 0.15, w: colW - 0.3, h: 0.4,
  fontSize: 18, fontFace: "Calibri", color: "0891B2",
  bold: true, align: "left", valign: "middle"
});
slide.addText(
  "• Position sensors (steering, pedal)\n• MEMS accelerometers\n• Gyroscopes\n• Tire pressure sensors\n• Proximity / parking sensors",
  {
    x: startX + 0.15, y: colY + 0.65, w: colW - 0.3, h: colH - 0.8,
    fontSize: 13, fontFace: "Calibri", color: "CBD5E1",
    align: "left", valign: "top", lineSpacingMultiple: 1.4
  }
);

// Column 2: Homes
slide.addShape(pres.shapes.RECTANGLE, {
  x: startX + colW + colGap, y: colY, w: colW, h: colH,
  fill: { color: "1A2D47" },
  rectRadius: 0.1
});
slide.addText("🏠  Homes", {
  x: startX + colW + colGap + 0.15, y: colY + 0.15, w: colW - 0.3, h: 0.4,
  fontSize: 18, fontFace: "Calibri", color: "0891B2",
  bold: true, align: "left", valign: "middle"
});
slide.addText(
  "• Smart thermostats (temperature)\n• Motion sensors (PIR)\n• Gas / smoke flow sensors\n• Door/window contacts\n• Water leak detectors",
  {
    x: startX + colW + colGap + 0.15, y: colY + 0.65, w: colW - 0.3, h: colH - 0.8,
    fontSize: 13, fontFace: "Calibri", color: "CBD5E1",
    align: "left", valign: "top", lineSpacingMultiple: 1.4
  }
);

// Column 3: Mobile Phones
slide.addShape(pres.shapes.RECTANGLE, {
  x: startX + 2 * (colW + colGap), y: colY, w: colW, h: colH,
  fill: { color: "1A2D47" },
  rectRadius: 0.1
});
slide.addText("📱  Mobile Phones", {
  x: startX + 2 * (colW + colGap) + 0.15, y: colY + 0.15, w: colW - 0.3, h: 0.4,
  fontSize: 18, fontFace: "Calibri", color: "0891B2",
  bold: true, align: "left", valign: "middle"
});
slide.addText(
  "• Touch & image sensors\n• MEMS microphones\n• Inertial (accelerometer)\n• Magnetic (e-compass)\n• GPS / environmental",
  {
    x: startX + 2 * (colW + colGap) + 0.15, y: colY + 0.65, w: colW - 0.3, h: colH - 0.8,
    fontSize: 13, fontFace: "Calibri", color: "CBD5E1",
    align: "left", valign: "top", lineSpacingMultiple: 1.4
  }
);

// Bottom takeaway
slide.addShape(pres.shapes.RECTANGLE, {
  x: 1.2, y: 5.4, w: 7.6, h: 0.22,
  fill: { color: "0891B2" }
});
slide.addText("Sensors have transformed everyday devices — from cars to homes to the phone in your pocket.", {
  x: 1.2, y: 5.4, w: 7.6, h: 0.22,
  fontSize: 11, fontFace: "Calibri", color: "FFFFFF",
  bold: true, align: "center", valign: "middle"
});

pres.writeFile({ fileName: "slide2.pptx" });
console.log("✅ slide2.mjs → slide2.pptx (1 slide)");
