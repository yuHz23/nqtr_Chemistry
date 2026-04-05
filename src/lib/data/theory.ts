export interface ChapterTheory {
  id: number;
  title: string;
  shortTitle: string;
  color: string;
  summary: string;
  keyFormulas: { label: string; formula: string }[];
  keyReactions: { name: string; equation: string; note?: string }[];
  rememberPoints: string[];
}

export const chapterTheory: ChapterTheory[] = [
  {
    id: 1,
    title: "Chương 1: Este – Lipit",
    shortTitle: "Este – Lipit",
    color: "blue",
    summary: "Este là sản phẩm của phản ứng giữa axit carboxylic và ancol. Lipit (chất béo) là trieste của glycerol với axit béo. Đây là những hợp chất quan trọng trong hóa học hữu cơ và ứng dụng thực tiễn.",
    keyFormulas: [
      { label: "Este đơn chức", formula: "RCOOR'" },
      { label: "Este tổng quát (n chức)", formula: "CₙH₂ₙ₋₂₊₂ₖO₂ₖ (k: số nhóm chức)" },
      { label: "Chất béo (trieste)", formula: "(RCOO)₃C₃H₅" },
      { label: "Este no, đơn chức, mạch hở", formula: "CₙH₂ₙO₂ (n ≥ 2)" },
    ],
    keyReactions: [
      {
        name: "Este hóa (thuận nghịch)",
        equation: "RCOOH + R'OH ⇌ RCOOR' + H₂O",
        note: "Xúc tác: H₂SO₄ đặc, đun nóng. Tăng hiệu suất: dư axit hoặc ancol, hoặc loại nước.",
      },
      {
        name: "Thủy phân trong nước (axit)",
        equation: "RCOOR' + H₂O ⇌ RCOOH + R'OH",
        note: "Phản ứng thuận nghịch, xúc tác axit, đun nóng.",
      },
      {
        name: "Thủy phân trong kiềm (xà phòng hóa)",
        equation: "RCOOR' + NaOH → RCOONa + R'OH",
        note: "Phản ứng 1 chiều, cho muối carboxylat và ancol.",
      },
      {
        name: "Hidro hóa dầu thực vật (chất béo lỏng → rắn)",
        equation: "(RCHCH₂COO)₃C₃H₅ + 3H₂ → (R'CH₂CH₂COO)₃C₃H₅",
        note: "Xúc tác Ni, t°. Ứng dụng: sản xuất bơ thực vật (margarine).",
      },
      {
        name: "Xà phòng hóa chất béo",
        equation: "(RCOO)₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₅(OH)₃",
        note: "Sản phẩm: xà phòng (muối natri) + glycerol.",
      },
    ],
    rememberPoints: [
      "Este có mùi thơm đặc trưng: isoamyl axetat (chuối), etyl butyrat (dứa), etyl fomat (rum)",
      "Este nhẹ hơn nước, không tan trong nước, tan trong dung môi hữu cơ",
      "Chỉ số axit: mg KOH trung hòa axit béo tự do trong 1g chất béo",
      "Chỉ số xà phòng hóa: mg KOH xà phòng hóa hoàn toàn 1g chất béo",
      "Chỉ số iot: g I₂ cộng vào 100g chất béo (đánh giá độ không no)",
    ],
  },
  {
    id: 2,
    title: "Chương 2: Carbohydrate",
    shortTitle: "Carbohydrate",
    color: "emerald",
    summary: "Carbohydrate (saccarid) gồm monosaccarit (glucozơ, fructozơ), đisaccarit (saccarozơ, mantozơ) và polisaccarit (tinh bột, xenlulozơ). Glucozơ là nguồn năng lượng quan trọng nhất của cơ thể.",
    keyFormulas: [
      { label: "Glucozơ / Fructozơ", formula: "C₆H₁₂O₆" },
      { label: "Saccarozơ / Mantozơ", formula: "C₁₂H₂₂O₁₁" },
      { label: "Tinh bột / Xenlulozơ", formula: "(C₆H₁₀O₅)n" },
      { label: "Mắt xích xenlulozơ", formula: "[C₆H₇O₂(OH)₃]n" },
    ],
    keyReactions: [
      {
        name: "Tráng bạc (glucozơ)",
        equation: "C₆H₁₂O₆ + 2AgNO₃ + 2NH₃ + H₂O → C₆H₁₂O₇ + 2Ag↓ + 2NH₄NO₃",
        note: "Glucozơ có nhóm -CHO (andehit) nên tham gia phản ứng tráng bạc.",
      },
      {
        name: "Lên men rượu",
        equation: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂↑",
        note: "Xúc tác: enzyme (men rượu), 30–35°C.",
      },
      {
        name: "Thủy phân saccarozơ",
        equation: "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆",
        note: "Tạo glucozơ + fructozơ. Xúc tác: axit loãng hoặc enzyme invertase.",
      },
      {
        name: "Thủy phân tinh bột",
        equation: "(C₆H₁₀O₅)n + nH₂O → nC₆H₁₂O₆",
        note: "Xúc tác axit hoặc enzyme amylase. Qua trung gian: dextrin → mantozơ → glucozơ.",
      },
      {
        name: "Xenlulozơ trinitrat (thuốc súng không khói)",
        equation: "[C₆H₇O₂(OH)₃]n + 3nHNO₃ → [C₆H₇O₂(ONO₂)₃]n + 3nH₂O",
        note: "Xúc tác: H₂SO₄ đặc. Este của xenlulozơ với HNO₃.",
      },
    ],
    rememberPoints: [
      "Glucozơ và fructozơ là đồng phân, nhưng khác nhóm chức: glucozơ có -CHO (andehit), fructozơ có C=O ở C2 (xeton)",
      "Fructozơ vẫn có phản ứng tráng bạc do trong kiềm chuyển hóa thành glucozơ",
      "Saccarozơ KHÔNG có phản ứng tráng bạc (không có -CHO hoặc -C=O tự do)",
      "Nhận biết tinh bột: dung dịch iot → màu xanh tím đặc trưng",
      "Xenlulozơ cấu tạo từ β-glucozơ (mạch thẳng), tinh bột từ α-glucozơ (xoắn + phân nhánh)",
    ],
  },
  {
    id: 3,
    title: "Chương 3: Amin, Amino acid, Protein",
    shortTitle: "Amin – Protein",
    color: "purple",
    summary: "Amin là dẫn xuất của NH₃ khi thay nguyên tử H bằng gốc hydrocacbon. Amino axit là lưỡng tính, là đơn vị cấu tạo của protein. Protein là polipeptit có cấu trúc đa dạng và nhiều chức năng sinh học quan trọng.",
    keyFormulas: [
      { label: "Amin no đơn chức mạch hở", formula: "CₙH₂ₙ₊₃N (n ≥ 1)" },
      { label: "Anilin", formula: "C₆H₅NH₂" },
      { label: "Glyxin (amino axit đơn giản nhất)", formula: "H₂N-CH₂-COOH (M=75)" },
      { label: "Alanin", formula: "H₂N-CH(CH₃)-COOH (M=89)" },
    ],
    keyReactions: [
      {
        name: "Amin tác dụng với axit",
        equation: "R-NH₂ + HCl → R-NH₃⁺Cl⁻",
        note: "Amin có tính bazơ do cặp e tự do trên N, nhận H⁺ từ axit.",
      },
      {
        name: "Anilin + HCl",
        equation: "C₆H₅NH₂ + HCl → C₆H₅NH₃Cl (phenylamoni clorua)",
        note: "Anilin là bazơ yếu (yếu hơn NH₃).",
      },
      {
        name: "Amino axit + NaOH (tính axit)",
        equation: "H₂N-R-COOH + NaOH → H₂N-R-COONa + H₂O",
        note: "Nhóm -COOH thể hiện tính axit.",
      },
      {
        name: "Amino axit + HCl (tính bazơ)",
        equation: "H₂N-R-COOH + HCl → ClH₃N-R-COOH",
        note: "Nhóm -NH₂ thể hiện tính bazơ.",
      },
      {
        name: "Phản ứng trùng ngưng tạo peptit",
        equation: "nH₂N-R-COOH → [-NH-R-CO-]n + nH₂O",
        note: "Mỗi mắt xích mất 1 H₂O. n amino axit → (n-1) liên kết peptit.",
      },
    ],
    rememberPoints: [
      "Lực bazơ: (CH₃)₂NH > CH₃NH₂ > NH₃ > C₆H₅NH₂ (anilin)",
      "Anilin không làm quỳ tím đổi màu (bazơ quá yếu), nhưng phản ứng được với axit mạnh",
      "Amino axit tồn tại dưới dạng ion lưỡng cực (zwitterion): +H₃N-R-COO⁻",
      "Phản ứng biure: protein ≥ 2 liên kết peptit + Cu(OH)₂/NaOH → màu tím",
      "Phân biệt amin bậc 1: tác dụng HNO₂ tạo muối diazoni (bậc 2 tạo nitrosoamin vàng)",
    ],
  },
  {
    id: 4,
    title: "Chương 4: Polymer",
    shortTitle: "Polymer",
    color: "orange",
    summary: "Polime (polymer) là hợp chất có phân tử khối lớn, được tạo từ nhiều đơn vị monome liên kết nhau. Phân loại theo phương pháp điều chế: trùng hợp và trùng ngưng.",
    keyFormulas: [
      { label: "Polietilen (PE)", formula: "(-CH₂-CH₂-)n" },
      { label: "Polivinyl clorua (PVC)", formula: "(-CH₂-CHCl-)n" },
      { label: "Polipropilen (PP)", formula: "(-CH₂-CH(CH₃)-)n" },
      { label: "Nylon-6,6", formula: "(-NH-(CH₂)₆-NH-CO-(CH₂)₄-CO-)n" },
    ],
    keyReactions: [
      {
        name: "Trùng hợp etilen",
        equation: "nCH₂=CH₂ → (-CH₂-CH₂-)n",
        note: "Điều kiện: nhiệt độ, áp suất cao, xúc tác. Tạo PE.",
      },
      {
        name: "Trùng ngưng caprolactam → Nylon-6",
        equation: "n[NH-(CH₂)₅-CO] → [-NH-(CH₂)₅-CO-]n",
        note: "Mỗi mắt xích mất H₂O (hoặc mở vòng).",
      },
    ],
    rememberPoints: [
      "Trùng hợp: monome có liên kết đôi C=C (hoặc vòng căng)",
      "Trùng ngưng: monome có ≥2 nhóm chức (-OH, -COOH, -NH₂)",
      "Cao su thiên nhiên: (-CH₂-C(CH₃)=CH-CH₂-)n (cis-isopren)",
      "Cao su Buna: (-CH₂-CH=CH-CH₂-)n",
      "Tơ nilon kém bền trong axit, kiềm do có liên kết peptit (-CO-NH-)",
    ],
  },
  {
    id: 5,
    title: "Chương 5: Đại cương về kim loại",
    shortTitle: "Đại cương Kim loại",
    color: "cyan",
    summary: "Kim loại chiếm 80% số nguyên tố hóa học. Tính chất đặc trưng: dẫn điện, dẫn nhiệt, ánh kim, dẻo. Kim loại có xu hướng nhường electron tạo ion dương.",
    keyFormulas: [
      { label: "Phản ứng oxy hóa chung", formula: "M → Mⁿ⁺ + ne⁻" },
      { label: "Dãy điện hóa (trích)", formula: "K < Na < Mg < Al < Zn < Fe < Ni < Sn < Pb < H < Cu < Ag < Au" },
      { label: "Phản ứng với nước", formula: "2M + 2H₂O → 2MOH + H₂↑ (chỉ KL kiềm, kiềm thổ mạnh)" },
      { label: "Năng lượng mạng tinh thể", formula: "U ∝ Z⁺ × Z⁻ / r" },
    ],
    keyReactions: [
      {
        name: "Kim loại + axit (HCl, H₂SO₄ loãng)",
        equation: "Zn + H₂SO₄ → ZnSO₄ + H₂↑",
        note: "Chỉ kim loại đứng trước H trong dãy điện hóa phản ứng được.",
      },
      {
        name: "Kim loại + muối (phản ứng thay thế)",
        equation: "Fe + CuSO₄ → FeSO₄ + Cu",
        note: "Kim loại mạnh hơn đẩy kim loại yếu ra khỏi muối.",
      },
    ],
    rememberPoints: [
      "Dãy điện hóa: kim loại đứng trước sẽ khử ion của kim loại đứng sau",
      "Fe có 2 trạng thái oxy hóa thông dụng: Fe²⁺ và Fe³⁺",
      "Kim loại kiềm (Na, K) phản ứng mạnh với nước ở nhiệt độ thường",
      "Al bị thụ động hóa trong HNO₃ đặc nguội và H₂SO₄ đặc nguội",
      "Tính dẫn điện: Ag > Cu > Au > Al > Fe",
    ],
  },
  {
    id: 6,
    title: "Chương 6: Kim loại kiềm, kiềm thổ, nhôm",
    shortTitle: "KL Kiềm – Nhôm",
    color: "yellow",
    summary: "Kim loại kiềm (nhóm IA) và kiềm thổ (nhóm IIA) là kim loại hoạt động mạnh. Nhôm là kim loại nhẹ, bền nhờ lớp Al₂O₃ bảo vệ nhưng tan được trong cả axit và kiềm.",
    keyFormulas: [
      { label: "NaOH tác dụng Al", formula: "2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂↑" },
      { label: "Al₂O₃ (lưỡng tính)", formula: "Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O\nAl₂O₃ + 2NaOH → 2NaAlO₂ + H₂O" },
      { label: "Ca(OH)₂ dư + CO₂", formula: "Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O (thiếu CO₂)\nCaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂ (CO₂ dư)" },
      { label: "Na + H₂O", formula: "2Na + 2H₂O → 2NaOH + H₂↑" },
    ],
    keyReactions: [
      {
        name: "Nhôm + axit",
        equation: "2Al + 6HCl → 2AlCl₃ + 3H₂↑",
        note: "Al tan trong axit loãng. Thụ động trong HNO₃ đặc nguội.",
      },
      {
        name: "Nhôm + kiềm",
        equation: "2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂↑",
        note: "Tính LƯỠNG TÍNH: Al tan được trong cả axit và kiềm.",
      },
    ],
    rememberPoints: [
      "Al là kim loại lưỡng tính: tan trong cả HCl lẫn NaOH",
      "Na, K bảo quản trong dầu hỏa (phản ứng mạnh với nước và oxy)",
      "Nước cứng tạm thời: chứa Ca(HCO₃)₂, Mg(HCO₃)₂ → đun sôi mất đi",
      "Nước cứng vĩnh cửu: chứa CaSO₄, MgSO₄ → đun không mất, dùng Na₂CO₃ để làm mềm",
      "Thạch cao: CaSO₄.2H₂O (sống), CaSO₄.0,5H₂O (nung—thạch cao nửa nước)",
    ],
  },
  {
    id: 7,
    title: "Chương 7: Sắt và một số kim loại khác",
    shortTitle: "Sắt & Kim loại",
    color: "red",
    summary: "Sắt (Fe) là kim loại phổ biến nhất trong đời sống. Có 2 trạng thái oxy hóa phổ biến: Fe²⁺ và Fe³⁺. Hợp kim sắt: gang và thép có ứng dụng rộng rãi.",
    keyFormulas: [
      { label: "Fe³⁺ → Fe²⁺ (khử bởi Fe)", formula: "Fe + 2Fe³⁺ → 3Fe²⁺" },
      { label: "Fe + H₂SO₄ loãng", formula: "Fe + H₂SO₄ → FeSO₄ + H₂↑ (Fe²⁺)" },
      { label: "Fe + H₂SO₄ đặc nóng", formula: "2Fe + 6H₂SO₄(đặc,nóng) → Fe₂(SO₄)₃ + 3SO₂ + 6H₂O" },
      { label: "Phản ứng nhiệt nhôm", formula: "2Al + Fe₂O₃ → Al₂O₃ + 2Fe" },
    ],
    keyReactions: [
      {
        name: "Fe + Cl₂",
        equation: "2Fe + 3Cl₂ → 2FeCl₃",
        note: "Cl₂ oxi hóa Fe lên Fe³⁺.",
      },
      {
        name: "Fe + HNO₃ loãng",
        equation: "Fe + 4HNO₃(l) → Fe(NO₃)₃ + NO + 2H₂O (HNO₃ dư)\n3Fe + 8HNO₃ → 3Fe(NO₃)₂ + 2NO + 4H₂O (Fe dư)",
        note: "Nếu Fe dư: Fe³⁺ + Fe → Fe²⁺. Sản phẩm cuối có thể là Fe(NO₃)₂.",
      },
    ],
    rememberPoints: [
      "Fe thụ động trong HNO₃ đặc nguội và H₂SO₄ đặc nguội (như Al)",
      "Cu, Ag không phản ứng axit loãng (HCl, H₂SO₄ loãng) nhưng tan trong HNO₃",
      "Crom (Cr) cứng nhất trong kim loại phổ biến, dùng mạ điện",
      "Phân biệt Fe²⁺ và Fe³⁺: dùng NaOH → Fe(OH)₂ trắng xanh (Fe²⁺), Fe(OH)₃ đỏ nâu (Fe³⁺)",
      "Gang: hợp kim Fe-C (>2%C). Thép: hợp kim Fe-C (<2%C)",
    ],
  },
  {
    id: 8,
    title: "Chương 8: Phân biệt một số chất vô cơ",
    shortTitle: "Phân biệt chất VCQ",
    color: "teal",
    summary: "Kỹ năng nhận biết và phân biệt các chất vô cơ thông qua thuốc thử đặc trưng là kỹ năng quan trọng trong hóa học phân tích.",
    keyFormulas: [
      { label: "Thuốc thử ion Cl⁻", formula: "AgCl↓ trắng (với AgNO₃)" },
      { label: "Thuốc thử ion SO₄²⁻", formula: "BaSO₄↓ trắng (với BaCl₂/Ba(NO₃)₂)" },
      { label: "Thuốc thử ion NH₄⁺", formula: "NH₃↑ mùi khai (với NaOH đun)" },
      { label: "Thuốc thử ion CO₃²⁻", formula: "CO₂↑ làm đục Ca(OH)₂ (với HCl)" },
    ],
    keyReactions: [
      {
        name: "Nhận biết SO₄²⁻",
        equation: "BaCl₂ + Na₂SO₄ → BaSO₄↓ (trắng) + 2NaCl",
        note: "BaSO₄ không tan trong HCl loãng (phân biệt với BaSO₃).",
      },
      {
        name: "Nhận biết Cl⁻",
        equation: "AgNO₃ + NaCl → AgCl↓ (trắng) + NaNO₃",
        note: "AgCl tan trong NH₃ (khác AgBr, AgI).",
      },
    ],
    rememberPoints: [
      "Br₂/CCl₄: nhận biết liên kết đôi (mất màu vàng nâu)",
      "Quỳ tím: axit (đỏ), bazơ (xanh), trung tính (không đổi)",
      "Cu(OH)₂: hòa tan với glycerol/glucozơ tạo phức xanh lam",
      "Ag₂O/NH₃: phân biệt andehit (Ag↓) với xeton (không phản ứng)",
      "Thứ tự nhận biết: quan sát → mùi → thuốc thử đơn giản → thuốc thử phức tạp",
    ],
  },
  {
    id: 9,
    title: "Chương 9: Hóa học & Phát triển Bền vững",
    shortTitle: "Hóa học Bền vững",
    color: "green",
    summary: "Hóa học đóng vai trò quan trọng trong phát triển bền vững. Các vật liệu mới, năng lượng tái tạo, xử lý ô nhiễm đều cần đến hóa học.",
    keyFormulas: [
      { label: "Phản ứng điện phân NaCl (công nghiệp)", formula: "2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂" },
      { label: "Sản xuất H₂SO₄ (phương pháp tiếp xúc)", formula: "S → SO₂ → SO₃ → H₂SO₄" },
      { label: "Phân bón đạm", formula: "(NH₄)₂SO₄, NH₄NO₃, Ca(NO₃)₂, Urea CO(NH₂)₂" },
      { label: "Phân bón lân", formula: "Ca₃(PO₄)₂, Ca(H₂PO₄)₂ (supephosphate)" },
    ],
    keyReactions: [
      {
        name: "Sản xuất gang (lò cao)",
        equation: "Fe₂O₃ + 3CO → 2Fe + 3CO₂",
        note: "Chất khử CO từ than cốc (2C + O₂ → 2CO).",
      },
    ],
    rememberPoints: [
      "Ba nguyên tố dinh dưỡng chính: N (đạm), P (lân), K (kali)",
      "Phân bón NPK: chứa cả 3 nguyên tố (hỗn hợp hoặc phức hợp)",
      "Ô nhiễm không khí: SO₂, NOₓ, CO, bụi mịn PM2.5",
      "Xử lý nước thải: hóa học + sinh học + lý học",
      "Năng lượng mặt trời: pin mặt trời từ Si silic tinh khiết",
    ],
  },
];
