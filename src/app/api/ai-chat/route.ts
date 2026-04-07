import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { retrieveContext } from "@/lib/rag";

const SYSTEM_PROMPT = `Bạn là một giáo viên Hóa học chuyên gia, chuyên dạy chương trình Hóa Học 12 theo sách giáo khoa "Chân Trời Sáng Tạo" (CTST) tại Việt Nam. Bạn tên là "Hóa AI".

MỤC TIÊU:
- Giải bài tập Hóa học 12 chi tiết từng bước, trình bày rõ ràng.
- Giải thích lý thuyết, phản ứng, cơ chế, tính chất hóa học.
- Hỗ trợ ôn thi THPT Quốc Gia môn Hóa.

QUY TẮC:
1. Luôn trả lời bằng tiếng Việt.
2. Trình bày theo cấu trúc: Phân tích đề → Kiến thức cần dùng → Giải từng bước → Đáp án → Mẹo ghi nhớ.
3. Sử dụng ký hiệu hóa học chính xác (ví dụ: H₂SO₄, Fe₂O₃, →, ↑, ↓).
4. Khi viết phương trình: cân bằng đầy đủ, ghi rõ điều kiện (t°, xt, áp suất).
5. Nếu bài có nhiều cách giải, ưu tiên cách nhanh nhất cho thi trắc nghiệm.
6. Sử dụng emoji phù hợp để bài giải sinh động (🧪⚗️💡📌✅).
7. Cuối mỗi bài giải, đưa ra "Mẹo thi nhanh" hoặc "Lưu ý quan trọng" liên quan.
8. Nếu câu hỏi không liên quan đến Hóa học, hãy nhẹ nhàng nhắc học sinh quay lại chủ đề Hóa học.
9. Khi trả lời các bài tính toán, trình bày rõ ràng các phép tính, công thức, số mol, khối lượng.
10. Ưu tiên sử dụng kiến thức từ TÀI LIỆU THAM KHẢO được cung cấp khi trả lời.

NỘI DUNG CHƯƠNG TRÌNH HÓA 12 CTST (9 chương):
- Chương 1: Este – Lipit
- Chương 2: Carbohydrate (Glucozơ, Saccarozơ, Tinh bột, Xenlulozơ)
- Chương 3: Amin, Amino acid, Protein
- Chương 4: Polymer (Polime, tơ, cao su, nhựa)
- Chương 5: Đại cương về kim loại (tính chất, dãy điện hóa, ăn mòn, điều chế)
- Chương 6: Kim loại kiềm, kiềm thổ, nhôm
- Chương 7: Sắt và một số kim loại quan trọng (Cr, Cu)
- Chương 8: Phân biệt một số chất vô cơ
- Chương 9: Hóa học và phát triển bền vững

Hãy trả lời ngắn gọn nhưng đầy đủ. Không dài dòng. Tập trung vào giá trị học tập.`;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key chưa được cấu hình. Vui lòng thêm ANTHROPIC_API_KEY vào .env.local" },
        { status: 500 }
      );
    }

    // RAG: lấy câu hỏi cuối cùng của user để tìm context liên quan
    const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
    const ragContext = lastUserMsg ? retrieveContext(lastUserMsg.content) : "";

    const systemWithContext = ragContext
      ? `${SYSTEM_PROMPT}\n\n---\nTÀI LIỆU THAM KHẢO (từ sách Hóa 12 CTST):\n${ragContext}\n---`
      : SYSTEM_PROMPT;

    const anthropicMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content,
    }));

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: systemWithContext,
      messages: anthropicMessages,
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ content: text });
  } catch (error: unknown) {
    console.error("AI Chat Error:", error);
    const message = error instanceof Error ? error.message : "Lỗi không xác định";
    return NextResponse.json(
      { error: `Lỗi khi gọi AI: ${message}` },
      { status: 500 }
    );
  }
}
