"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BrainCircuit, Send, User, Sparkles, AlertTriangle, Trash2 } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const WELCOME_MSG = `Xin chào! Tôi là **Hóa AI** 🧪 — trợ giảng thông minh chuyên Hóa Học 12 CTST.

Tôi có thể giúp bạn:
• 📝 Giải bài tập từng bước chi tiết
• 🔬 Giải thích lý thuyết và phản ứng hóa học
• 📊 Ôn tập các dạng bài THPT Quốc Gia
• 🧮 Tính toán mol, khối lượng, nồng độ
• ⚗️ Tra cứu công thức, tính chất hóa học

Hãy nhập câu hỏi hoặc đề bài của bạn!`;

const QUICK_PROMPTS = [
  "Giải thích phản ứng este hóa?",
  "So sánh gang và thép?",
  "Cách nhận biết Fe²⁺ và Fe³⁺?",
  "Tính khối lượng Cu thu được khi điện phân 200ml CuSO₄ 1M?",
  "Polymer trùng hợp khác trùng ngưng thế nào?",
  "12 nguyên tắc hóa học xanh là gì?",
];

// Simple markdown-like rendering for bold and line breaks
function renderContent(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Process bold **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      }
      return <span key={j}>{part}</span>;
    });
    return (
      <span key={i}>
        {rendered}
        {i < lines.length - 1 && <br />}
      </span>
    );
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
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-sm"
            : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm"
        }`}
      >
        {renderContent(msg.content)}
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
      <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="text-xs text-slate-400 mr-2">Đang suy nghĩ</span>
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export default function AISolverPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MSG,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    setError(null);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Lỗi không xác định từ server");
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Không thể kết nối AI";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: WELCOME_MSG,
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  const msgCount = messages.filter((m) => m.role === "user").length;

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden p-0">
      {/* Header */}
      <div className="p-4 md:p-6 pb-3 border-b border-slate-800 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2">
              <BrainCircuit className="text-blue-400" size={24} /> Hóa AI
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-slate-400 text-xs md:text-sm">Trợ giảng AI thông minh — Gemini 2.0 Flash</p>
              <Badge variant="default" className="text-xs">
                {msgCount} câu hỏi
              </Badge>
            </div>
          </div>
          {msgCount > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10"
            >
              <Trash2 size={14} /> Xóa hội thoại
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      <div className="px-4 md:px-6 pt-2 pb-0 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              disabled={isLoading}
              className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700 disabled:opacity-40"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="p-3 md:p-4 bg-slate-900/50 border-t border-slate-800 shrink-0 mb-16 md:mb-0">
        <div className="relative flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Nhập đề bài hoặc câu hỏi Hóa học... (Enter để gửi)"
            rows={1}
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
      </div>
    </div>
  );
}
