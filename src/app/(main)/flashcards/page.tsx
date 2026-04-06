"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { flashcards as allFlashcards } from "@/lib/data/flashcards";
import { Zap, RotateCw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Minus, Trophy } from "lucide-react";

type CardState = {
  id: string;
  interval: number; // days
  easeFactor: number; // 1.3 – 2.5
  dueDate: Date;
  reps: number;
};

function sm2Next(state: CardState, quality: 0 | 1 | 2 | 3): CardState {
  let { interval, easeFactor, reps } = state;

  if (quality < 2) {
    // Forgot / Hard – reset
    interval = 1;
    reps = 0;
  } else {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 3;
    else interval = Math.round(interval * easeFactor);
    reps += 1;
  }

  const ef =
    easeFactor + 0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02);
  easeFactor = Math.max(1.3, Math.min(2.5, ef));

  const due = new Date();
  due.setDate(due.getDate() + interval);

  return { ...state, interval, easeFactor, dueDate: due, reps };
}

export default function FlashcardsPage() {
  const [filterChapter, setFilterChapter] = useState<number | null>(null);

  const deck = filterChapter
    ? allFlashcards.filter((f) => f.chapter === filterChapter)
    : allFlashcards;

  const [states, setStates] = useState<Record<string, CardState>>(() => {
    const now = new Date();
    return Object.fromEntries(
      allFlashcards.map((f) => [
        f.id,
        { id: f.id, interval: 1, easeFactor: 2.5, dueDate: now, reps: 0 },
      ])
    );
  });

  const dueCards = deck.filter((f) => states[f.id]?.dueDate <= new Date());
  const [sessionCards] = useState(() => [...deck].sort(() => Math.random() - 0.5));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reviewedToday, setReviewedToday] = useState(0);

  const currentCard = sessionCards[index % sessionCards.length];
  const cardState = states[currentCard?.id];

  const flip = () => {
    if (isAnimating) return;
    setFlipped((f) => !f);
  };

  const handleRating = (quality: 0 | 1 | 2 | 3) => {
    if (!currentCard || !cardState) return;
    const newState = sm2Next(cardState, quality);
    setStates((prev) => ({ ...prev, [currentCard.id]: newState }));
    setReviewedToday((n) => n + 1);
    setIsAnimating(true);
    setTimeout(() => {
      setFlipped(false);
      setIndex((i) => i + 1);
      setIsAnimating(false);
    }, 300);
  };

  const allDone = index >= sessionCards.length;

  const chapterColors: Record<number, string> = {
    1: "text-blue-400",
    2: "text-emerald-400",
    3: "text-purple-400",
  };

  return (
    <div className="p-8 pb-20 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
          <Zap className="mr-3 text-amber-400" /> Flashcards SM-2
        </h1>
        <p className="text-slate-400 mb-4">Ôn tập thông minh theo thuật toán Spaced Repetition.</p>

        <div className="flex items-center justify-center gap-3">
          <div className="inline-flex items-center bg-slate-800 px-4 py-1.5 rounded-full text-sm text-slate-300">
            <strong className="text-amber-400 mr-2">{dueCards.length}</strong> thẻ cần ôn hôm nay
          </div>
          <div className="inline-flex items-center bg-slate-800 px-4 py-1.5 rounded-full text-sm text-slate-300">
            <strong className="text-emerald-400 mr-2">{reviewedToday}</strong> đã ôn
          </div>
        </div>
      </div>

      {/* Chapter filter */}
      <div className="flex justify-center gap-2 mb-8">
        {[null, 1, 2, 3].map((ch) => (
          <button
            key={String(ch)}
            onClick={() => {
              setFilterChapter(ch);
              setIndex(0);
              setFlipped(false);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterChapter === ch
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {ch === null ? "Tất cả" : `Chương ${ch}`}
          </button>
        ))}
      </div>

      {allDone ? (
        /* All cards done */
        <div className="flex flex-col items-center py-16">
          <div className="h-24 w-24 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
            <Trophy className="h-12 w-12 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Tuyệt vời! 🎉</h2>
          <p className="text-slate-400 mb-8">Bạn đã ôn hết {reviewedToday} thẻ trong phiên này.</p>
          <Button
            onClick={() => {
              setIndex(0);
              setFlipped(false);
            }}
            className="gap-2"
          >
            <RotateCw size={18} /> Ôn lại từ đầu
          </Button>
        </div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${(index / sessionCards.length) * 100}%` }}
            />
          </div>

          {/* Card */}
          <div style={{ perspective: "1200px" }} className="mb-6">
            <div
              onClick={flip}
              className="relative w-full aspect-[4/3] cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.5s cubic-bezier(.4,2,.6,1)",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center shadow-2xl"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="absolute top-5 left-6 text-xs uppercase tracking-widest text-slate-500 font-semibold">
                  Mặt Trước
                </span>
                <div className={`text-xs font-medium mb-2 ${chapterColors[currentCard?.chapter ?? 1]}`}>
                  Chương {currentCard?.chapter}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                  {currentCard?.front}
                </h2>
                <div className="absolute bottom-5 flex items-center gap-2 text-slate-500">
                  <RotateCw size={14} />
                  <span className="text-xs">Bấm để xem đáp án</span>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-900/90 to-blue-950/40 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center shadow-2xl"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="absolute top-5 left-6 text-xs uppercase tracking-widest text-blue-400/60 font-semibold">
                  Mặt Sau
                </span>
                <p className="text-slate-200 text-base leading-relaxed whitespace-pre-line">
                  {currentCard?.back}
                </p>
              </div>
            </div>
          </div>

          {/* Rating buttons — only show when flipped */}
          <div
            className={`transition-all duration-300 ${flipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          >
            <p className="text-center text-sm text-slate-400 mb-4">Bạn nhớ được đến đâu?</p>
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => handleRating(0)}
                className="flex flex-col items-center gap-1 p-3 rounded-xl border border-red-500/30 bg-red-500/5 hover:bg-red-500/15 transition-colors group"
              >
                <XCircle className="h-6 w-6 text-red-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-red-400 font-medium">Quên</span>
                <span className="text-xs text-slate-500">+1 ngày</span>
              </button>
              <button
                onClick={() => handleRating(1)}
                className="flex flex-col items-center gap-1 p-3 rounded-xl border border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/15 transition-colors group"
              >
                <Minus className="h-6 w-6 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-orange-400 font-medium">Khó</span>
                <span className="text-xs text-slate-500">+1 ngày</span>
              </button>
              <button
                onClick={() => handleRating(2)}
                className="flex flex-col items-center gap-1 p-3 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/15 transition-colors group"
              >
                <CheckCircle2 className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-blue-400 font-medium">Ổn</span>
                <span className="text-xs text-slate-500">
                  +{cardState?.reps === 0 ? 1 : cardState?.reps === 1 ? 3 : Math.round((cardState?.interval ?? 1) * (cardState?.easeFactor ?? 2.5))} ngày
                </span>
              </button>
              <button
                onClick={() => handleRating(3)}
                className="flex flex-col items-center gap-1 p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/15 transition-colors group"
              >
                <Zap className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-emerald-400 font-medium">Dễ</span>
                <span className="text-xs text-slate-500">
                  +{Math.round((cardState?.interval ?? 1) * (cardState?.easeFactor ?? 2.5) * 1.3)} ngày
                </span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIndex((i) => Math.max(0, i - 1));
                setFlipped(false);
              }}
              disabled={index === 0}
              className="gap-2"
            >
              <ChevronLeft size={16} /> Trước
            </Button>
            <span className="text-sm text-slate-400 self-center">
              {index + 1} / {sessionCards.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIndex((i) => i + 1);
                setFlipped(false);
              }}
              disabled={index >= sessionCards.length - 1}
              className="gap-2"
            >
              Tiếp <ChevronRight size={16} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
