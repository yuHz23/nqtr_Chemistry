import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

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

// --- Round-robin API key rotation with model fallback ---
const MODELS = [
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
  "gemini-1.5-flash-8b",
  "gemini-1.5-pro",
  "gemini-2.5-flash-preview-04-17",
];

function getApiKeys(): string[] {
  const keysStr = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "";
  return keysStr.split(",").map((k) => k.trim()).filter(Boolean);
}

let requestCounter = 0;

function isRetryableError(errMsg: string): boolean {
  return (
    errMsg.includes("429") ||
    errMsg.includes("quota") ||
    errMsg.includes("RATE_LIMIT") ||
    errMsg.includes("RESOURCE_EXHAUSTED") ||
    errMsg.includes("limit") ||
    errMsg.includes("404") ||
    errMsg.includes("not found")
  );
}

async function tryWithKey(
  key: string,
  modelName: string,
  messages: { role: string; content: string }[]
): Promise<string> {
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
  });

  const history = messages.slice(0, -1).map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({ history });
  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
}

async function callWithRotation(
  keys: string[],
  messages: { role: string; content: string }[]
): Promise<string> {
  let lastError: unknown = null;

  // Try each model (each has separate quota)
  for (const modelName of MODELS) {
    // Try each key with this model
    for (let attempt = 0; attempt < keys.length; attempt++) {
      const keyIndex = requestCounter % keys.length;
      requestCounter++;
      const key = keys[keyIndex];

      try {
        console.log(`[AI Chat] Model: ${modelName} | Key #${keyIndex + 1}/${keys.length}`);
        return await tryWithKey(key, modelName, messages);
      } catch (error: unknown) {
        lastError = error;
        const errMsg = error instanceof Error ? error.message : String(error);
        console.warn(`[AI Chat] ${modelName} Key #${keyIndex + 1} thất bại: ${errMsg}`);

        if (!isRetryableError(errMsg)) {
          throw error; // Non-retryable → bail immediately
        }
      }
    }
    console.warn(`[AI Chat] Tất cả keys hết quota cho ${modelName}, thử model tiếp theo...`);
  }

  // All models × all keys exhausted
  throw lastError;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKeys = getApiKeys();
    if (apiKeys.length === 0) {
      return NextResponse.json(
        { error: "API key chưa được cấu hình. Vui lòng thêm GEMINI_API_KEYS vào file .env.local" },
        { status: 500 }
      );
    }

    const responseText = await callWithRotation(apiKeys, messages);
    return NextResponse.json({ content: responseText });
  } catch (error: unknown) {
    console.error("AI Chat Error:", error);
    const message = error instanceof Error ? error.message : "Lỗi không xác định";
    return NextResponse.json(
      { error: `Lỗi khi gọi AI: ${message}` },
      { status: 500 }
    );
  }
}

