"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { questions, Question } from "@/lib/data/questions";
import { logExamSession } from "@/lib/progress";
import {
  GraduationCap,
  Timer,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Trophy,
  AlertTriangle,
} from "lucide-react";

type ExamMode = "standard" | "chapter" | "quick";

type ExamConfig = {
  mode: ExamMode;
  totalQuestions: number;
  timeMinutes: number;
  label: string;
};

const EXAM_MODES: ExamConfig[] = [
  { mode: "standard", totalQuestions: 10, timeMinutes: 15, label: "Thi thử chuẩn (mô phỏng)" },
  { mode: "chapter", totalQuestions: 10, timeMinutes: 12, label: "Ôn tập theo chương" },
  { mode: "quick", totalQuestions: 5, timeMinutes: 5, label: "Thi nhanh (5 phút)" },
];

function useTimer(initialSeconds: number, onExpire: () => void) {
  const [remaining, setRemaining] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => {
    setRunning(false);
    setRemaining(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            setRunning(false);
            onExpire();
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, onExpire]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const pct = (remaining / initialSeconds) * 100;

  return { mm, ss, pct, remaining, start, stop, reset };
}

export default function ExamPage() {
  const [phase, setPhase] = useState<"lobby" | "exam" | "result">("lobby");
  const [selectedMode, setSelectedMode] = useState<ExamConfig>(EXAM_MODES[0]);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, "A" | "B" | "C" | "D">>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const handleTimeExpire = useCallback(() => {
    const correct = examQuestions.filter(
      (q, i) => selectedAnswers[i] === q.answer
    ).length;
    logExamSession(selectedMode.label, correct, examQuestions.length);
    setSubmitted(true);
    setPhase("result");
  }, [examQuestions, selectedAnswers, selectedMode.label]);

  const timerConfig = selectedMode.timeMinutes * 60;
  const { mm, ss, pct: timerPct, start, stop, reset: resetTimer } = useTimer(timerConfig, handleTimeExpire);

  const startExam = () => {
    const pool = [...questions].sort(() => Math.random() - 0.5);
    setExamQuestions(pool.slice(0, selectedMode.totalQuestions));
    setSelectedAnswers({});
    setCurrentQ(0);
    setSubmitted(false);
    setReviewMode(false);
    setPhase("exam");
    start();
  };

  const submitExam = () => {
    stop();
    const correct = examQuestions.filter(
      (q, i) => selectedAnswers[i] === q.answer
    ).length;
    logExamSession(selectedMode.label, correct, examQuestions.length);
    setSubmitted(true);
    setPhase("result");
  };

  const restartExam = () => {
    resetTimer();
    setPhase("lobby");
  };

  // Results
  const results = examQuestions.map((q, i) => ({
    q,
    selected: selectedAnswers[i] ?? null,
    correct: selectedAnswers[i] === q.answer,
  }));
  const correctCount = results.filter((r) => r.correct).length;
  const score = examQuestions.length > 0 ? ((correctCount / examQuestions.length) * 10).toFixed(1) : "0";
  const grade =
    Number(score) >= 8.5 ? "Giỏi" : Number(score) >= 6.5 ? "Khá" : Number(score) >= 5 ? "Trung bình" : "Yếu";

  // ====== LOBBY ======
  if (phase === "lobby") {
    return (
      <div className="p-8 pb-20 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <GraduationCap className="mr-3 text-red-500" /> Luyện Đề THPT
          </h1>
          <p className="text-slate-400">Mô phỏng 100% cấu trúc đề thi THPT Quốc Gia.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {EXAM_MODES.map((mode) => {
            const colors = {
              standard: { border: "border-red-500/30 hover:border-red-500", bar: "from-red-500 to-orange-500", icon: "text-red-400" },
              chapter: { border: "border-blue-500/30 hover:border-blue-500", bar: "from-blue-500 to-purple-500", icon: "text-blue-400" },
              quick: { border: "border-emerald-500/30 hover:border-emerald-500", bar: "from-emerald-500 to-teal-500", icon: "text-emerald-400" },
            }[mode.mode];
            return (
              <button
                key={mode.mode}
                onClick={() => setSelectedMode(mode)}
                className={`text-left glass-card rounded-xl overflow-hidden border transition-all duration-200 ${colors.border} ${selectedMode.mode === mode.mode ? "ring-2 ring-offset-1 ring-offset-slate-950" : ""}`}
              >
                <div className={`h-2 bg-gradient-to-r w-full ${colors.bar}`} />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2">{mode.label}</h2>
                  <div className="flex items-center space-x-4 text-sm text-slate-300 font-medium">
                    <span className={`flex items-center ${colors.icon}`}>
                      <GraduationCap className="w-4 h-4 mr-1.5" /> {mode.totalQuestions} câu
                    </span>
                    <span className="flex items-center text-amber-400">
                      <Timer className="w-4 h-4 mr-1.5" /> {mode.timeMinutes} phút
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={startExam}
            className="h-14 px-12 text-md rounded-full shadow-[0_0_25px_rgba(239,68,68,0.3)] bg-red-600 hover:bg-red-700 gap-3"
          >
            <Play size={20} /> Bắt đầu thi
          </Button>
        </div>
      </div>
    );
  }

  // ====== RESULT ======
  if (phase === "result") {
    const gradeColor =
      grade === "Giỏi" ? "text-emerald-400" : grade === "Khá" ? "text-blue-400" : grade === "Trung bình" ? "text-amber-400" : "text-red-400";

    return (
      <div className="p-8 pb-20 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Trophy className="mr-3 text-amber-400" /> Kết Quả Đề Thi
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card col-span-1 text-center">
            <CardContent className="p-8">
              <div className="w-28 h-28 rounded-full border-4 border-blue-500 flex flex-col items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                <span className="text-4xl font-black text-white">{score}</span>
                <span className="text-xs text-slate-400">/10</span>
              </div>
              <h2 className={`text-xl font-bold ${gradeColor}`}>{grade}</h2>
              <p className="text-slate-400 text-sm">
                {correctCount}/{examQuestions.length} câu đúng
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card col-span-2">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4">Phân tích theo câu</h3>
              <div className="grid grid-cols-5 gap-2">
                {results.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentQ(i);
                      setReviewMode(true);
                      setPhase("exam");
                    }}
                    className={`flex items-center justify-center h-10 rounded-lg text-sm font-bold transition-colors ${
                      r.correct
                        ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                        : r.selected
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500/30 inline-block" /> Đúng
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-red-500/30 inline-block" /> Sai
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-700 inline-block" /> Bỏ qua
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={restartExam} className="gap-2 h-12">
            <RotateCcw size={18} /> Thi lại
          </Button>
        </div>
      </div>
    );
  }

  // ====== EXAM ======
  const q = examQuestions[currentQ];
  const selected = selectedAnswers[currentQ];
  const answeredCount = Object.keys(selectedAnswers).length;
  const options = (["A", "B", "C", "D"] as const).map((k) => ({ key: k, text: q?.options[k] }));
  const isLowTime = mm === "00" && Number(ss) <= 30;

  return (
    <div className="p-6 pb-20">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800 -mx-6 px-6 py-3 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-red-400" />
            <span className="font-semibold text-white hidden md:block">{selectedMode.label}</span>
            <Badge variant="secondary">
              {answeredCount}/{examQuestions.length} đã trả lời
            </Badge>
          </div>

          {/* Timer */}
          {!reviewMode && (
            <div
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full border font-mono font-bold transition-colors ${
                isLowTime
                  ? "border-red-500 bg-red-500/10 text-red-400 animate-pulse"
                  : "border-slate-700 bg-slate-900 text-white"
              }`}
            >
              <Timer size={16} />
              {mm}:{ss}
            </div>
          )}

          {reviewMode && (
            <Badge variant="default">Chế độ xem lại</Badge>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Question grid sidebar */}
        <div className="md:col-span-1 order-2 md:order-1">
          <div className="glass-card rounded-xl p-4 sticky top-24">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Danh sách câu</p>
            <div className="grid grid-cols-5 md:grid-cols-3 gap-1.5">
              {examQuestions.map((_, i) => {
                const isAnswered = selectedAnswers[i] !== undefined;
                const isCurrent = i === currentQ;
                const isCorrect = reviewMode && results[i]?.correct;
                const isWrong = reviewMode && !results[i]?.correct && results[i]?.selected;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentQ(i)}
                    className={`h-9 rounded-lg text-sm font-bold transition-all ${
                      isCurrent
                        ? "ring-2 ring-blue-500 bg-blue-500/20 text-blue-300"
                        : isCorrect
                        ? "bg-emerald-500/20 text-emerald-400"
                        : isWrong
                        ? "bg-red-500/20 text-red-400"
                        : isAnswered
                        ? "bg-slate-700 text-white"
                        : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Question area */}
        <div className="md:col-span-3 order-1 md:order-2">
          {q && (
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <Badge variant="secondary">Câu {currentQ + 1}</Badge>
                    <Badge variant="secondary">Chương {q.chapter}</Badge>
                    <Badge
                      variant={q.difficulty === 1 ? "success" : q.difficulty === 2 ? "warning" : "danger"}
                    >
                      {q.difficulty === 1 ? "Dễ" : q.difficulty === 2 ? "Trung bình" : "Khó"}
                    </Badge>
                  </div>
                </div>

                <p className="text-lg font-medium text-white mb-6 leading-relaxed">{q.stem}</p>

                <div className="grid grid-cols-1 gap-3 mb-8">
                  {options.map(({ key, text }) => {
                    const isSelected = selected === key;
                    const isCorrect = key === q.answer;
                    let style = "border-slate-700 hover:border-slate-500 text-slate-300 cursor-pointer";

                    if (reviewMode) {
                      if (isCorrect) style = "border-emerald-500 bg-emerald-500/10 text-emerald-300";
                      else if (isSelected && !isCorrect) style = "border-red-500 bg-red-500/10 text-red-300";
                      else style = "border-slate-800 text-slate-500 opacity-50";
                    } else if (isSelected) {
                      style = "border-blue-500 bg-blue-500/10 text-white";
                    }

                    return (
                      <button
                        key={key}
                        disabled={reviewMode}
                        onClick={() =>
                          !reviewMode &&
                          setSelectedAnswers((prev) => ({ ...prev, [currentQ]: key }))
                        }
                        className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${style}`}
                      >
                        <span className="font-bold text-sm shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-current">
                          {key}
                        </span>
                        <span className="text-sm leading-relaxed flex-1">{text}</span>
                        {reviewMode && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 ml-auto" />}
                        {reviewMode && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-400 shrink-0 ml-auto" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation in review mode */}
                {reviewMode && (
                  <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 mb-4">
                    <p className="text-sm font-semibold text-emerald-400 mb-2">💡 Giải thích:</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
                  </div>
                )}

                {/* Nav buttons */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQ((i) => Math.max(0, i - 1))}
                    disabled={currentQ === 0}
                  >
                    ← Câu trước
                  </Button>
                  {currentQ < examQuestions.length - 1 ? (
                    <Button onClick={() => setCurrentQ((i) => i + 1)}>
                      Câu tiếp →
                    </Button>
                  ) : !reviewMode ? (
                    <Button
                      onClick={submitExam}
                      className="bg-red-600 hover:bg-red-700 gap-2"
                    >
                      <GraduationCap size={18} /> Nộp bài
                    </Button>
                  ) : (
                    <Button onClick={restartExam} className="gap-2">
                      <RotateCcw size={16} /> Thi lại
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit warning */}
          {!reviewMode && answeredCount < examQuestions.length && (
            <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm">
              <AlertTriangle size={16} />
              <span>
                Còn {examQuestions.length - answeredCount} câu chưa trả lời.
              </span>
            </div>
          )}

          {!reviewMode && (
            <div className="flex justify-end mt-4">
              <Button
                onClick={submitExam}
                variant="danger"
                className="gap-2"
              >
                <GraduationCap size={18} /> Nộp bài sớm
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
