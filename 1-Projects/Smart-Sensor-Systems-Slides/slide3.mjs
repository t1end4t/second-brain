import PptxGenJS from "pptxgenjs";

let pres = new PptxGenJS();
pres.layout = "LAYOUT_16x9";
pres.author = "Smart Sensor Systems";
pres.title = "Chapter 1 — Smart Sensor Design";

// === Slide 3: Why Silicon? ===

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
slide.addText("2 / 6", {
  x: 1.2, y: 0.6, w: 1.8, h: 0.4,
  fontSize: 12, fontFace: "Calibri", color: "0891B2",
  bold: true, align: "center", valign: "middle"
});

// Title
slide.addText("Why Silicon?", {
  x: 1.2, y: 1.2, w: 7.6, h: 0.8,
  fontSize: 36, fontFace: "Georgia", color: "FFFFFF",
  bold: true, align: "left", valign: "middle"
});

slide.addShape(pres.shapes.LINE, {
  x: 1.2, y: 2.0, w: 7.6, h: 0,
  line: { color: "1A3A5C", width: 1 }
});

// === Left column: Advantages ===
const leftW = 4.0;
const rightW = 3.8;
const startY = 2.4;

// Advantages box
slide.addShape(pres.shapes.RECTANGLE, {
  x: 1.2, y: startY, w: leftW, h: 3.1,
  fill: { color: "1A2D47" },
  rectRadius: 0.1
});
slide.addText("Advantages", {
  x: 1.2 + 0.15, y: startY + 0.15, w: leftW - 0.3, h: 0.4,
  fontSize: 18, fontFace: "Calibri", color: "0891B2",
  bold: true, align: "left", valign: "middle"
});

slide.addText(
  "✓  Mass-producible at low cost\n     — semiconductor industry\n\n" +
  "✓  Co-integrated electronics\n     — sensor + circuitry on same\n     substrate/package\n\n" +
  "✓  High-purity material\n     — well-defined, tunable\n     physical properties\n\n" +
  "✓  Nanoscale precision machining",
  {
    x: 1.2 + 0.15, y: startY + 0.65, w: leftW - 0.3, h: 2.5,
    fontSize: 13, fontFace: "Calibri", color: "CBD5E1",
    align: "left", valign: "top", lineSpacingMultiple: 1.5
  }
);

// === Right column: Trade-off ===
slide.addShape(pres.shapes.RECTANGLE, {
  x: 1.2 + leftW + 0.25, y: startY, w: rightW, h: 3.1,
  fill: { color: "1A2D47" },
  rectRadius: 0.1
});
slide.addText("Trade-off", {
  x: 1.2 + leftW + 0.25 + 0.15, y: startY + 0.15, w: rightW - 0.3, h: 0.4,
  fontSize: 18, fontFace: "Calibri", color: "F59E0B",
  bold: true, align: "left", valign: "middle"
});

slide.addText(
  "Silicon is not always best-in-class\nfor raw sensing performance.\n\n" +
  "But it offers an unbeatable\ncombination of:\n\n" +
  "    Cost  +  Size  +  Integration",
  {
    x: 1.2 + leftW + 0.25 + 0.15, y: startY + 0.65, w: rightW - 0.3, h: 2.5,
    fontSize: 13, fontFace: "Calibri", color: "CBD5E1",
    align: "left", valign: "top", lineSpacingMultiple: 1.5
  }
);

// Bottom takeaway
slide.addShape(pres.shapes.RECTANGLE, {
  x: 1.2, y: 5.4, w: 7.6, h: 0.22,
  fill: { color: "0891B2" }
});
slide.addText("Silicon's strength is not peak performance — it's cost, size, and system integration.", {
  x: 1.2, y: 5.4, w: 7.6, h: 0.22,
  fontSize: 11, fontFace: "Calibri", color: "FFFFFF",
  bold: true, align: "center", valign: "middle"
});

pres.writeFile({ fileName: "slide3.pptx" });
console.log("✅ slide3.mjs → slide3.pptx (1 slide)");
