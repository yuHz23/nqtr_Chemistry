import { chapterTheory, ChapterTheory } from "./data/theory";

// Keyword map cho từng chương
const CHAPTER_KEYWORDS: Record<number, string[]> = {
  1: [
    "este", "ester", "lipit", "lipid", "chất béo", "dầu", "mỡ", "xà phòng",
    "xà phòng hóa", "thủy phân", "glycerol", "trieste", "axit béo",
    "este hóa", "este đơn chức", "RCOOR", "margarine", "bơ thực vật",
    "chỉ số axit", "chỉ số xà phòng", "chỉ số iot", "isoamyl", "etyl",
  ],
  2: [
    "carbohydrate", "saccarit", "glucozo", "glucozơ", "fructozo", "fructozơ",
    "saccarozo", "saccarozơ", "tinh bột", "xenlulozơ", "xenlulozo",
    "tráng bạc", "lên men", "đường", "monosaccarit", "disaccarit",
    "polisaccarit", "mantozo", "mantozơ", "andehit", "khử", "C6H12O6",
    "C12H22O11", "amylase", "invertase", "dextrin",
  ],
  3: [
    "amin", "amino axit", "amino acid", "protein", "peptit", "peptide",
    "anilin", "glyxin", "glycine", "alanin", "lưỡng tính", "zwitterion",
    "liên kết peptit", "biure", "polipeptit", "NH2", "COOH", "bazơ",
    "trùng ngưng", "enzyme", "xúc tác sinh học",
  ],
  4: [
    "polymer", "polime", "trùng hợp", "trùng ngưng", "monome", "PE",
    "PVC", "PP", "polietilen", "polivinyl", "polipropilen", "nylon",
    "nilon", "cao su", "tơ", "nhựa", "caprolactam", "isopren",
    "buna", "mắt xích", "hệ số trùng hợp",
  ],
  5: [
    "kim loại", "tính chất kim loại", "dãy điện hóa", "ăn mòn",
    "điện phân", "điều chế kim loại", "ion kim loại", "nhường electron",
    "oxi hóa", "khử", "thế điện cực", "ăn mòn điện hóa", "ăn mòn hóa học",
    "dãy hoạt động", "mạ điện", "Fe Cu Ag Au Zn", "tế bào điện hóa",
  ],
  6: [
    "kim loại kiềm", "kim loại kiềm thổ", "nhôm", "natri", "kali",
    "canxi", "magie", "Na", "K", "Ca", "Mg", "Al", "lưỡng tính nhôm",
    "NaOH", "nước cứng", "thạch cao", "CaCO3", "NaAlO2",
    "nước vôi", "vôi sống", "vôi tôi", "soda",
  ],
  7: [
    "sắt", "Fe", "gang", "thép", "FeCl3", "FeSO4", "Fe2O3", "Fe3O4",
    "crom", "Cr", "đồng", "Cu", "Fe2+ Fe3+", "nhiệt nhôm",
    "hợp kim sắt", "oxit sắt", "ion sắt", "thụ động",
  ],
  8: [
    "nhận biết", "phân biệt", "thuốc thử", "AgNO3", "BaCl2",
    "quỳ tím", "phenolphthalein", "ion Cl", "ion SO4", "ion NH4",
    "ion CO3", "kết tủa", "mùi", "màu sắc", "nhận biết chất",
    "phân tích hóa học", "AgCl", "BaSO4",
  ],
  9: [
    "bền vững", "phát triển bền vững", "phân bón", "đạm", "lân", "kali",
    "NPK", "ure", "urea", "supephosphate", "lò cao", "sản xuất gang",
    "sản xuất thép", "H2SO4 công nghiệp", "điện phân NaCl",
    "ô nhiễm", "xử lý nước thải", "năng lượng tái tạo", "pin mặt trời",
  ],
};

function scoreChapter(chapter: ChapterTheory, query: string): number {
  const q = query.toLowerCase();
  const keywords = CHAPTER_KEYWORDS[chapter.id] || [];
  let score = 0;

  for (const kw of keywords) {
    if (q.includes(kw.toLowerCase())) {
      score += kw.length > 5 ? 3 : 2; // longer keywords = more specific
    }
  }

  // Also check against title and summary
  if (q.includes(chapter.shortTitle.toLowerCase())) score += 5;
  const summaryWords = chapter.summary.toLowerCase().split(/\s+/);
  for (const word of summaryWords) {
    if (word.length > 4 && q.includes(word)) score += 1;
  }

  return score;
}

function formatChapterContext(chapter: ChapterTheory): string {
  const lines: string[] = [];

  lines.push(`=== ${chapter.title} ===`);
  lines.push(`Tóm tắt: ${chapter.summary}`);

  lines.push("\nCông thức quan trọng:");
  for (const f of chapter.keyFormulas) {
    lines.push(`- ${f.label}: ${f.formula}`);
  }

  lines.push("\nPhản ứng hóa học chính:");
  for (const r of chapter.keyReactions) {
    lines.push(`- ${r.name}: ${r.equation}`);
    if (r.note) lines.push(`  Ghi chú: ${r.note}`);
  }

  lines.push("\nĐiểm cần nhớ:");
  for (const p of chapter.rememberPoints) {
    lines.push(`- ${p}`);
  }

  return lines.join("\n");
}

export function retrieveContext(query: string, topK = 2): string {
  const scored = chapterTheory
    .map((ch) => ({ chapter: ch, score: scoreChapter(ch, query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  if (scored.length === 0) {
    // No specific chapter found — return all chapters summary
    return chapterTheory
      .map((ch) => `${ch.title}: ${ch.summary}`)
      .join("\n\n");
  }

  return scored.map((x) => formatChapterContext(x.chapter)).join("\n\n---\n\n");
}
