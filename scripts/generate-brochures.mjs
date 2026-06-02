// Generates simple, valid multi-page PDF brochures with no external dependencies.
// Run with: node scripts/generate-brochures.mjs
import { mkdirSync, writeFileSync } from "fs";
import path from "path";

function escapeText(s) {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

// A "block" is { type: "title" | "heading" | "text" | "space", text }
function buildContentStream(blocks) {
  const top = 770;
  const left = 60;
  let y = top;
  const lines = ["BT"];
  for (const b of blocks) {
    if (b.type === "space") {
      y -= 10;
      continue;
    }
    const size = b.type === "title" ? 22 : b.type === "heading" ? 14 : 11;
    const font = b.type === "text" ? "/F2" : "/F1";
    const leading = b.type === "title" ? 30 : b.type === "heading" ? 22 : 16;
    lines.push(`${font} ${size} Tf`);
    lines.push(`1 0 0 1 ${left} ${y} Tm`);
    lines.push(`(${escapeText(b.text)}) Tj`);
    y -= leading;
  }
  lines.push("ET");
  return lines.join("\n");
}

function buildPdf(pagesBlocks) {
  const objects = [];
  const pageCount = pagesBlocks.length;
  // Object numbering:
  // 1 = Catalog, 2 = Pages, 3 = Font F1, 4 = Font F2
  // then for each page: content (5,7,9...) and page (6,8,10...)
  const kids = [];
  for (let i = 0; i < pageCount; i++) {
    const pageObjNum = 6 + i * 2;
    kids.push(`${pageObjNum} 0 R`);
  }

  objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objects[2] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${pageCount} >>`;
  objects[3] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;
  objects[4] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;

  for (let i = 0; i < pageCount; i++) {
    const contentObjNum = 5 + i * 2;
    const pageObjNum = 6 + i * 2;
    const stream = buildContentStream(pagesBlocks[i]);
    objects[contentObjNum] =
      `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`;
    objects[pageObjNum] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] ` +
      `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjNum} 0 R >>`;
  }

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  for (let n = 1; n < objects.length; n++) {
    if (!objects[n]) continue;
    offsets[n] = Buffer.byteLength(pdf, "utf8");
    pdf += `${n} 0 obj\n${objects[n]}\nendobj\n`;
  }
  const xrefStart = Buffer.byteLength(pdf, "utf8");
  const total = objects.length;
  pdf += `xref\n0 ${total}\n`;
  pdf += `0000000000 65535 f \n`;
  for (let n = 1; n < total; n++) {
    if (offsets[n] === undefined) {
      pdf += `0000000000 00000 f \n`;
    } else {
      pdf += `${String(offsets[n]).padStart(10, "0")} 00000 n \n`;
    }
  }
  pdf += `trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return Buffer.from(pdf, "utf8");
}

const outDir = path.join(process.cwd(), "public", "brochures");
mkdirSync(outDir, { recursive: true });

const capability = [
  [
    { type: "title", text: "MIT Bengaluru" },
    { type: "heading", text: "Research & Consultancy Capability Brochure" },
    { type: "space" },
    { type: "text", text: "Manipal Institute of Technology Bengaluru, Manipal Academy of Higher Education (MAHE)." },
    { type: "text", text: "Connecting industry, agencies, and academia with applied research and faculty expertise." },
    { type: "space" },
    { type: "heading", text: "Research Domains" },
    { type: "text", text: "- Artificial Intelligence & Data Science" },
    { type: "text", text: "- Cybersecurity & Digital Forensics" },
    { type: "text", text: "- IoT & Embedded Systems" },
    { type: "text", text: "- Robotics & Automation" },
    { type: "text", text: "- Sustainable Energy" },
    { type: "text", text: "- Smart Infrastructure" },
    { type: "text", text: "- Advanced Computing & Networks" },
    { type: "text", text: "- Biomedical & Health Technology" },
    { type: "text", text: "- Materials, Manufacturing & Design Innovation" },
  ],
  [
    { type: "heading", text: "Consultancy & Collaboration Services" },
    { type: "space" },
    { type: "text", text: "- Technical advisory services" },
    { type: "text", text: "- Faculty expertise engagement" },
    { type: "text", text: "- Sponsored and collaborative research" },
    { type: "text", text: "- Product and prototype support" },
    { type: "text", text: "- Testing and validation" },
    { type: "text", text: "- Executive training, FDP, and workshops" },
    { type: "text", text: "- Industry problem-statement collaboration" },
    { type: "text", text: "- Facility and laboratory access" },
    { type: "space" },
    { type: "heading", text: "Engage With Us" },
    { type: "text", text: "Email: research.blr@example.mit.mahe.edu" },
    { type: "text", text: "Phone: +91 80 0000 0000" },
    { type: "text", text: "MIT Bengaluru Campus, Yelahanka, Bengaluru, Karnataka, India" },
    { type: "space" },
    { type: "text", text: "Note: This brochure contains illustrative sample content for demonstration." },
  ],
];

const report = [
  [
    { type: "title", text: "MIT Bengaluru" },
    { type: "heading", text: "Research Output & Impact Report (Sample)" },
    { type: "space" },
    { type: "heading", text: "Headline Metrics" },
    { type: "text", text: "- 150+ active researchers" },
    { type: "text", text: "- INR 42 Cr sanctioned research funding (cumulative)" },
    { type: "text", text: "- 90+ sponsored projects" },
    { type: "text", text: "- 35+ patents filed and granted" },
    { type: "text", text: "- 20+ centres, labs, and facilities" },
    { type: "text", text: "- 60+ industry collaborations" },
    { type: "space" },
    { type: "text", text: "Note: Figures and entries are illustrative sample data for demonstration." },
  ],
];

writeFileSync(
  path.join(outDir, "mit-bengaluru-capability-brochure.pdf"),
  buildPdf(capability),
);
writeFileSync(
  path.join(outDir, "mit-bengaluru-research-report.pdf"),
  buildPdf(report),
);

console.log("Brochures generated in public/brochures/");
