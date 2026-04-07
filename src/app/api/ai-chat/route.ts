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
10. Ưu tiên sử dụng kiến thức từ TÀI LIỆU THAM KHẢO được cung cấp khi trả lời.`;

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const MODEL = "meta-llama/Llama-3.1-8B-Instruct";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.HF_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key chưa được cấu hình. Vui lòng thêm HF_API_KEY vào .env.local" },
        { status: 500 }
      );
    }

    // RAG: tìm context từ sách Hóa 12 CTST
    const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
    const ragContext = lastUserMsg ? retrieveContext(lastUserMsg.content) : "";

    const systemWithContext = ragContext
      ? `${SYSTEM_PROMPT}\n\n---\nTÀI LIỆU THAM KHẢO (từ sách Hóa 12 CTST):\n${ragContext}\n---`
      : SYSTEM_PROMPT;

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemWithContext },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        ],
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`HF API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? "";
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
