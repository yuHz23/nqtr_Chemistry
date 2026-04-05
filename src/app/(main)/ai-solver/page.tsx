"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BrainCircuit, Send, User, Sparkles, Info } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const DEMO_RESPONSES: Record<string, string> = {
  default: `Xin chào! Tôi là trợ giảng AI chuyên Hóa học 12 theo chương trình Chân Trời Sáng Tạo. 
  
Tôi có thể giúp bạn:
• Giải bài tập từng bước chi tiết 
• Giải thích lý thuyết và phản ứng hóa học
• Ôn tập các dạng bài THPT Quốc Gia
• Tra cứu công thức, tính chất hóa học

Hãy nhập câu hỏi của bạn! 🧪`,
  este: `**Phân tích bài toán Este:**

**Bước 1: Xác định dạng bài**
→ Đây là bài toán thủy phân este trong môi trường kiềm (xà phòng hóa)

**Bước 2: Viết phương trình**
RCOOR' + NaOH → RCOONa + R'OH

Đặc điểm:
• Phản ứng 1 chiều (không thuận nghịch)
• Tỉ lệ mol 1:1 giữa este và NaOH

**Bước 3: Tính toán**
Sử dụng bảo toàn khối lượng:
m(este) + m(NaOH) = m(muối) + m(ancol)

**→ Đáp án:** Xem phần tính toán cụ thể phía trên

*💡 Ghi chú SGK CTST:* Este bị thủy phân trong kiềm tạo muối, không thể phục hồi este ban đầu — khác với thủy phân trong axit (thuận nghịch).`,
  glucozo: `**Glucozơ — Phân tích tính chất hóa học:**

**CTPT:** C₆H₁₂O₆

**Dạng tồn tại:** Hỗn hợp của dạng mạch hở (andehit) ⇌ dạng vòng pyranose

**Các phản ứng quan trọng:**

**1. Phản ứng tráng bạc (nhận biết andehit):**
C₆H₁₂O₆ + 2AgNO₃ + 3NH₃ + H₂O → C₆H₁₂O₇ + 2Ag↓ + 2NH₄NO₃
→ Kết tủa Ag màu trắng sáng (gương bạc)

**2. Phản ứng với Cu(OH)₂/NaOH (đun nóng):**
C₆H₁₂O₆ + Cu(OH)₂ → Cu₂O↓ (đỏ gạch) + sản phẩm oxy hóa
→ Kết tủa Cu₂O màu đỏ gạch đặc trưng ✓

**3. Lên men rượu:**
C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂↑
(xúc tác: enzyme, 30-35°C)

**→ Đáp án câu hỏi của bạn:** Phản ứng cho kết tủa đỏ gạch là phản ứng 2 (với Cu(OH)₂/NaOH)`,
};

function getAIResponse(input: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lower = input.toLowerCase();
      if (lower.includes("este") || lower.includes("xà phòng") || lower.includes("thủy phân")) {
        resolve(DEMO_RESPONSES.este);
      } else if (lower.includes("glucoz") || lower.includes("đường") || lower.includes("tráng bạc")) {
        resolve(DEMO_RESPONSES.glucozo);
      } else {
        resolve(`Tôi đã nhận được câu hỏi của bạn về: **"${input}"**

Để giải bài này, tôi sẽ:

**Bước 1: Nhận dạng dạng bài**
Đây là bài tập thuộc chủ đề Hóa học 12 CTST. Tôi sẽ phân tích theo phương pháp học của SGK.

**Bước 2: Áp dụng kiến thức**
• Xác định chất và công thức liên quan
• Viết phương trình hóa học (nếu cần)
• Tính toán theo các bước logic

**Bước 3: Kết luận**
Sau khi phân tích, đáp án sẽ được trình bày rõ ràng.

*📌 Ghi chú:* Trong phiên bản demo này, tôi có thể trả lời chi tiết các câu hỏi về **Este, Glucozơ, Protein**. Tích hợp Claude API đầy đủ sẽ sớm có!
      
→ **Đáp án:** [Phân tích chi tiết sẽ hiển thị sau khi tích hợp API]`);
      }
    }, 1200 + Math.random() * 800);
  });
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? "bg-blue-600" : "bg-gradient-to-br from-purple-600 to-blue-600"
        }`}
      >
        {isUser ? <User size={16} className="text-white" /> : <BrainCircuit size={16} className="text-white" />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-sm"
            : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shrink-0">
        <BrainCircuit size={16} className="text-white" />
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

const QUICK_PROMPTS = [
  "Giải thích phản ứng este hóa?",
  "Glucozơ có bao nhiêu phản ứng đặc trưng?",
  "Phân biệt amin bậc 1, 2, 3?",
  "Tinh bột khác xenlulozơ thế nào?",
];

export default function AISolverPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: DEMO_RESPONSES.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const MAX_REQUESTS = 10;
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading || requestCount >= MAX_REQUESTS) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setRequestCount((n) => n + 1);

    try {
      const response = await getAIResponse(content);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, requestCount]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const remaining = MAX_REQUESTS - requestCount;

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden p-0">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-slate-800 shrink-0">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <BrainCircuit className="text-blue-400" size={26} /> AI Giải Bài
        </h1>
        <div className="flex items-center gap-3">
          <p className="text-slate-400 text-sm">Trợ giảng AI chuyên Hóa 12 CTST</p>
          <Badge variant={remaining <= 3 ? "warning" : "default"} className="text-xs">
            {remaining} lượt còn lại / ngày
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Demo notice */}
        <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-blue-300">
          <Info size={14} className="shrink-0 mt-0.5" />
          <span>
            Phiên bản demo — AI trả lời mẫu cho Este & Glucozơ. Tích hợp Claude API đầy đủ sẽ sớm có.
          </span>
        </div>

        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      <div className="px-6 pt-2 pb-0 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              disabled={isLoading || requestCount >= MAX_REQUESTS}
              className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700 disabled:opacity-40"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 bg-slate-900/50 border-t border-slate-800 shrink-0">
        {requestCount >= MAX_REQUESTS ? (
          <div className="text-center py-3 text-sm text-amber-400">
            ⚠️ Đã dùng hết 10 lượt hỏi hôm nay. Nâng cấp Premium để hỏi không giới hạn.
          </div>
        ) : (
          <div className="relative flex items-end gap-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Nhập đề bài hoặc câu hỏi... (Enter để gửi)"
              rows={2}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-500 leading-relaxed"
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-12 w-12 bg-blue-600 hover:bg-blue-700 rounded-xl shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >
              {isLoading ? (
                <Sparkles size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
