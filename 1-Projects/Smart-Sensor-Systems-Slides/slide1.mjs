import PptxGenJS from "pptxgenjs";

let pres = new PptxGenJS();
pres.layout = "LAYOUT_16x9";
pres.author = "Smart Sensor Systems";
pres.title = "Chapter 1 — Smart Sensor Design";

let slide = pres.addSlide();
slide.background = { color: "0F1C2E" };

slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.12, h: 5.625,
  fill: { color: "0891B2" }
});

slide.addShape(pres.shapes.LINE, {
  x: 1.2, y: 1.0, w: 7.6, h: 0,
  line: { color: "1A3A5C", width: 1.5 }
});

slide.addText("CHAPTER 1", {
  x: 1.2, y: 1.3, w: 7.6, h: 0.6,
  fontSize: 14, fontFace: "Calibri", color: "0891B2",
  bold: true, charSpacing: 4, align: "left", valign: "middle"
});

slide.addText("Smart Sensor Design", {
  x: 1.2, y: 1.8, w: 7.6, h: 1.4,
  fontSize: 42, fontFace: "Georgia", color: "FFFFFF",
  bold: true, align: "left", valign: "middle"
});

slide.addText("Fundamentals, Design Techniques, and Case Studies", {
  x: 1.2, y: 3.2, w: 7.6, h: 0.7,
  fontSize: 20, fontFace: "Calibri", color: "94A3B8",
  italic: true, align: "left", valign: "middle"
});

slide.addShape(pres.shapes.RECTANGLE, {
  x: 1.2, y: 4.3, w: 7.6, h: 0.8,
  fill: { color: "1A2D47" },
  shadow: { type: "outer", blur: 8, offset: 0, angle: 270, color: "000000", opacity: 0.3 }
});

slide.addText("EEE703708  ·  Smart Sensor Systems", {
  x: 1.2, y: 4.3, w: 7.6, h: 0.8,
  fontSize: 15, fontFace: "Calibri", color: "CBD5E1",
  bold: true, align: "center", valign: "middle"
});

slide.addShape(pres.shapes.LINE, {
  x: 1.2, y: 5.2, w: 7.6, h: 0,
  line: { color: "1A3A5C", width: 1 }
});

slide.addText("Based on: Meijer, Pertijs & Makinwa — Smart Sensor Systems", {
  x: 1.2, y: 5.3, w: 7.6, h: 0.3,
  fontSize: 9, fontFace: "Calibri", color: "64748B",
  align: "left", valign: "middle"
});

pres.writeFile({ fileName: "slide1.pptx" });
console.log("✅ slide1.mjs → slide1.pptx (1 slide)");
