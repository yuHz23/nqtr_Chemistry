export interface Flashcard {
  id: string;
  chapter: number;
  front: string;
  back: string;
  tags: string[];
}

export const flashcards: Flashcard[] = [
  // Chapter 1
  { id: "f1-001", chapter: 1, front: "Công thức chung este đơn chức?", back: "RCOOR'\n\nTrong đó:\n• R là gốc axit\n• R' là gốc ancol\n\nVí dụ: CH₃COO-C₂H₅ (etyl axetat)", tags: ["este", "công thức"] },
  { id: "f1-002", chapter: 1, front: "Phản ứng xà phòng hóa este (kiềm)?", back: "RCOOR' + NaOH → RCOONa + R'OH\n\nĐặc điểm:\n• Phản ứng 1 chiều (bất thuận nghịch)\n• Sản phẩm: muối carboxylat + ancol", tags: ["este", "thuỷ phân"] },
  { id: "f1-003", chapter: 1, front: "Chất béo là gì? Công thức tổng quát?", back: "Chất béo = Trieste của glycerol với axit béo\n\nCông thức: (RCOO)₃C₃H₅\nvới R: mạch C dài (≥ 15C), không phân nhánh\n\nVí dụ axit béo:\n• Axit oleic: C₁₇H₃₃COOH (1 nối đôi)\n• Axit linoleic: C₁₇H₃₁COOH (2 nối đôi)\n• Axit stearic: C₁₇H₃₅COOH (no)", tags: ["lipit", "chất béo"] },
  { id: "f1-004", chapter: 1, front: "Dầu thực vật vs Mỡ động vật — điểm khác nhau?", back: "Dầu thực vật:\n• Chứa nhiều axit béo KHÔNG NO\n• Ở thể LỎNG nhiệt độ thường\n• Có chỉ số iot cao\n\nMỡ động vật:\n• Chứa nhiều axit béo NO\n• Ở thể RẮN nhiệt độ thường\n• Chỉ số iot thấp", tags: ["lipit", "dầu mỡ"] },
  { id: "f1-005", chapter: 1, front: "Phản ứng este hóa (điều kiện)?", back: "RCOOH + R'OH ⇌ RCOOR' + H₂O\n\nĐiều kiện:\n• Xúc tác: H₂SO₄ đặc\n• Đun nóng\n• Phản ứng thuận nghịch ⇌\n\nCách tăng H: dùng dư axit hoặc ancol, lấy nước ra.", tags: ["este", "điều chế"] },

  // Chapter 2
  { id: "f2-001", chapter: 2, front: "Glucozơ — CTPT, dạng tồn tại chính?", back: "CTPT: C₆H₁₂O₆\n\nDạng mạch hở: CH₂OH-(CHOH)₄-CHO (andehit)\n\nDạng vòng (chính):\n• α-D-glucopyranose\n• β-D-glucopyranose\n\nTrong nước: cân bằng mạch hở ⇌ vòng (>99% ở dạng vòng)", tags: ["glucozơ", "cấu trúc"] },
  { id: "f2-002", chapter: 2, front: "4 phản ứng đặc trưng của Glucozơ?", back: "1. Tráng bạc: glucozơ + AgNO₃/NH₃ → Ag↓\n2. Cu(OH)₂/NaOH, đun → Cu₂O↓ (đỏ gạch)\n3. Cộng H₂ (Ni,t°) → sobitol\n4. Lên men (men rượu) → C₂H₅OH + CO₂\n\nNhớ: glucozơ có nhóm -CHO nên là andehit!", tags: ["glucozơ", "phản ứng"] },
  { id: "f2-003", chapter: 2, front: "Phân biệt Saccarozơ, Glucozơ, Tinh bột?", back: "Saccarozơ: không có phản ứng tráng bạc (không có -CHO)\n→ Nhận biết: thủy phân → glucozơ + fructozơ (kiểm tra:\n   glucozơ cho kết tủa Ag)\n\nGlucozơ: tráng bạc (AgNO₃/NH₃) tạo Ag↓\n\nTinh bột: + dung dịch I₂ → màu xanh tím\n\nThứ tự nhận biết: I₂ → tráng bạc → thủy phân", tags: ["cacbohydrat", "nhận biết"] },
  { id: "f2-004", chapter: 2, front: "Xenlulozơ — cấu trúc và phản ứng este với HNO₃?", back: "Cấu trúc: -[C₆H₇O₂(OH)₃]n- (mạch thẳng, β-glucozơ)\nĐộ polime hóa n = 7000 – 15000\n\nPhản ứng với HNO₃ đặc/H₂SO₄:\nXenlulozơ + HNO₃ → Xenlulozơ trinitrat\n[C₆H₇O₂(ONO₂)₃]n\n\nÚng dụng: Thuốc súng không khói (xenlulozơ trinitrat)", tags: ["xenlulozơ", "cấu trúc", "nitrat"] },
  { id: "f2-005", chapter: 2, front: "Phản ứng tổng hợp và thủy phân Saccarozơ?", back: "Saccarozơ: C₁₂H₂₂O₁₁\n\nThủy phân acid:\nC₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆\n             glucozơ   fructozơ\n\nVới enzyme (invertase): phản ứng xảy ra ở 37°C (nhiệt độ cơ thể)\n\nSaccarozơ KHÔNG có phản ứng tráng bạc (không có -CHO hoặc -CO dạng tự do)", tags: ["saccarozơ", "thủy phân"] },

  // Chapter 3
  { id: "f3-001", chapter: 3, front: "Phân loại amin — bậc và ví dụ?", back: "Bậc 1 (R-NH₂): CH₃NH₂ (metylamin)\nBậc 2 (R-NH-R'): (CH₃)₂NH (đimetylamin)\nBậc 3 (R₃N): (CH₃)₃N (trimetylamin)\n\nLực bazơ: Bậc 2 > Bậc 1 > NH₃ > Anilin (bậc 1 thơm)\n\nAnilin yếu vì vòng benzene hút cặp e trên N", tags: ["amin", "phân loại", "lực bazơ"] },
  { id: "f3-002", chapter: 3, front: "Amino axit — lưỡng tính?", back: "H₂N-R-COOH (amino axit)\n\nTính AXIT: –COOH + NaOH → –COONa + H₂O\nH₂N-CH₂-COOH + NaOH → H₂N-CH₂-COONa + H₂O\n\nTính BAZƠ: –NH₂ + HCl → –NH₃⁺Cl⁻\nH₂N-CH₂-COOH + HCl → ClH₃N-CH₂-COOH\n\n→ Amino axit là LƯỠNG TÍNH ✓", tags: ["amino acid", "lưỡng tính"] },
  { id: "f3-003", chapter: 3, front: "Liên kết peptit — định nghĩa và hình thành?", back: "Liên kết peptit: –CO–NH–\n\nHình thành từ: nhóm –COOH của AA1 + nhóm –NH₂ của AA2\n→ Mất H₂O\n\nVí dụ đipeptit Gly-Ala:\nH₂N-CH₂-CO-NH-CH(CH₃)-COOH\n              ↑\n           liên kết peptit\n\nn amino axit → (n-1) liên kết peptit", tags: ["peptit", "liên kết peptit"] },
  { id: "f3-004", chapter: 3, front: "Phản ứng nhận biết Protein — điều kiện và hiện tượng?", back: "1. Phản ứng Biure:\nProtein + Cu(OH)₂/NaOH → MÀU TÍM đặc trưng\n(điều kiện: không đun nóng, lạnh)\n\n2. Phản ứng Xanthoprotein:\nProtein + HNO₃ đặc → kết tủa VÀNG\n(do nitro hóa vòng benzene của tyrosine, phenylalanine)\n\nBiure: để nhận biết PEPTIT ≥ 2 liên kết peptit", tags: ["protein", "nhận biết", "biure"] },
  { id: "f3-005", chapter: 3, front: "Glyxin, Alanin — công thức và tính chất?", back: "Glyxin (Gly, G):\nCTCT: H₂N-CH₂-COOH\nM = 75 g/mol\nDạng ion lưỡng cực: +H₃N-CH₂-COO⁻\n\nAlanin (Ala, A):\nCTCT: H₂N-CH(CH₃)-COOH\nM = 89 g/mol\n\nCả hai đều:\n• Tinh thể trắng\n• Tan trong nước\n• Nhiệt độ nóng chảy cao (tồn tại ion lưỡng cực)", tags: ["glyxin", "alanin", "amino acid"] },
];
