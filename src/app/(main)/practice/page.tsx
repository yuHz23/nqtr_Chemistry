"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { questions, Question } from "@/lib/data/questions";
import { chapters } from "@/lib/data/mock";
import {
  PenTool,
  Filter,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Trophy,
  BookOpen,
} from "lucide-react";

type FilterState = {
  chapter: number | null;
  difficulty: 1 | 2 | 3 | null;
};

type AnswerState = {
  selected: "A" | "B" | "C" | "D" | null;
  revealed: boolean;
};

type SessionResult = {
  total: number;
  correct: number;
  answers: { question: Question; selected: string; correct: boolean }[];
};

function QuestionCard({
  question,
  answerState,
  onSelect,
  onReveal,
}: {
  question: Question;
  answerState: AnswerState;
  onSelect: (opt: "A" | "B" | "C" | "D") => void;
  onReveal: () => void;
}) {
  const options = (["A", "B", "C", "D"] as const).map((k) => ({
    key: k,
    text: question.options[k],
  }));

  const getOptionStyle = (key: "A" | "B" | "C" | "D") => {
    if (!answerState.revealed) {
      return answerState.selected === key
        ? "border-blue-500 bg-blue-500/10 text-white"
        : "border-slate-700 hover:border-slate-500 text-slate-300 cursor-pointer";
    }
    if (key === question.answer) return "border-emerald-500 bg-emerald-500/10 text-emerald-300";
    if (answerState.selected === key && key !== question.answer)
      return "border-red-500 bg-red-500/10 text-red-300";
    return "border-slate-800 text-slate-500 opacity-60";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <Badge variant="secondary">Chương {question.chapter}</Badge>
          <Badge
            variant={
              question.difficulty === 1 ? "success" : question.difficulty === 2 ? "warning" : "danger"
            }
          >
            {question.difficulty === 1 ? "Dễ" : question.difficulty === 2 ? "Trung bình" : "Khó"}
          </Badge>
        </div>
        <span className="text-xs text-slate-500">{question.source}</span>
      </div>

      <p className="text-lg font-medium text-white mb-6 leading-relaxed">{question.stem}</p>

      <div className="grid grid-cols-1 gap-3 mb-6">
        {options.map(({ key, text }) => (
          <button
            key={key}
            disabled={answerState.revealed}
            onClick={() => onSelect(key)}
            className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${getOptionStyle(key)}`}
          >
            <span className="font-bold text-sm shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-current">
              {key}
            </span>
            <span className="text-sm leading-relaxed">{text}</span>
            {answerState.revealed && key === question.answer && (
              <CheckCircle2 className="ml-auto shrink-0 h-5 w-5 text-emerald-400" />
            )}
            {answerState.revealed && answerState.selected === key && key !== question.answer && (
              <XCircle className="ml-auto shrink-0 h-5 w-5 text-red-400" />
            )}
          </button>
        ))}
      </div>

      {!answerState.revealed ? (
        <Button
          onClick={onReveal}
          disabled={!answerState.selected}
          className="w-full h-12"
        >
          Kiểm tra đáp án
        </Button>
      ) : (
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
          <p className="text-sm font-semibold text-emerald-400 mb-2">💡 Giải thích:</p>
          <p className="text-sm text-slate-300 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

function ResultScreen({
  result,
  onRestart,
}: {
  result: SessionResult;
  onRestart: () => void;
}) {
  const pct = Math.round((result.correct / result.total) * 100);
  const score = ((result.correct / result.total) * 10).toFixed(1);
  const grade =
    Number(score) >= 8.5 ? "Giỏi" : Number(score) >= 6.5 ? "Khá" : Number(score) >= 5 ? "Trung bình" : "Yếu";
  const gradeColor =
    grade === "Giỏi" ? "text-emerald-400" : grade === "Khá" ? "text-blue-400" : grade === "Trung bình" ? "text-amber-400" : "text-red-400";

  return (
    <div className="flex flex-col items-center">
      <div className="w-36 h-36 rounded-full border-4 border-blue-500 flex flex-col items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
        <span className="text-4xl font-black text-white">{score}</span>
        <span className="text-xs text-slate-400">/10</span>
      </div>

      <h2 className={`text-2xl font-bold mb-1 ${gradeColor}`}>{grade}!</h2>
      <p className="text-slate-400 mb-8">
        {result.correct}/{result.total} câu đúng ({pct}%)
      </p>

      <div className="w-full grid grid-cols-1 gap-3 mb-8 max-h-64 overflow-y-auto pr-1">
        {result.answers.map(({ question: q, selected, correct }, i) => (
          <div
            key={q.id}
            className={`flex items-center gap-3 p-3 rounded-lg border ${correct ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}
          >
            {correct ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-red-400 shrink-0" />
            )}
            <span className="text-sm text-slate-300 flex-1 line-clamp-1">
              {i + 1}. {q.stem}
            </span>
            {!correct && (
              <span className="text-xs text-emerald-400 shrink-0">→ {q.answer}</span>
            )}
          </div>
        ))}
      </div>

      <Button onClick={onRestart} className="w-full h-12 gap-2">
        <RotateCcw size={18} /> Làm lại bài khác
      </Button>
    </div>
  );
}

export default function PracticePage() {
  const [filters, setFilters] = useState<FilterState>({ chapter: null, difficulty: null });
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (filters.chapter && q.chapter !== filters.chapter) return false;
      if (filters.difficulty && q.difficulty !== filters.difficulty) return false;
      return true;
    });
  }, [filters]);

  const startSession = useCallback(() => {
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setSessionQuestions(shuffled);
    setAnswers(shuffled.map(() => ({ selected: null, revealed: false })));
    setCurrentIndex(0);
    setSessionResult(null);
    setSessionStarted(true);
  }, [filteredQuestions]);

  const handleSelect = (opt: "A" | "B" | "C" | "D") => {
    if (answers[currentIndex]?.revealed) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = { ...next[currentIndex], selected: opt };
      return next;
    });
  };

  const handleReveal = () => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = { ...next[currentIndex], revealed: true };
      return next;
    });
  };

  const handleNext = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Calculate result
      const resultAnswers = sessionQuestions.map((q, i) => ({
        question: q,
        selected: answers[i].selected ?? "",
        correct: answers[i].selected === q.answer,
      }));
      setSessionResult({
        total: sessionQuestions.length,
        correct: resultAnswers.filter((r) => r.correct).length,
        answers: resultAnswers,
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const resetSession = () => {
    setSessionStarted(false);
    setSessionResult(null);
  };

  if (!sessionStarted) {
    return (
      <div className="p-8 pb-20 max-w-5xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <PenTool className="mr-3 text-emerald-400" /> Luyện Bài Tập
            </h1>
            <p className="text-slate-400">
              Ngân hàng {questions.length} câu hỏi trắc nghiệm Hóa Học 12 Chân Trời Sáng Tạo.
            </p>
          </div>
        </div>

        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={18} className="text-slate-400" />
              <h2 className="font-semibold text-white">Bộ lọc</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-400 mb-3 block">Chương</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilters((f) => ({ ...f, chapter: null }))}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      !filters.chapter ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    Tất cả
                  </button>
                  {chapters.slice(0, 3).map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setFilters((f) => ({ ...f, chapter: ch.id }))}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        filters.chapter === ch.id
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      Ch.{ch.id}
                    </button>
                  ))}
                  <span className="px-3 py-1.5 text-xs text-slate-500 bg-slate-900 rounded-full border border-dashed border-slate-700">
                    Ch.4–9 sắp có
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-3 block">Độ khó</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilters((f) => ({ ...f, difficulty: null }))}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      !filters.difficulty ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    Tất cả
                  </button>
                  {([1, 2, 3] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setFilters((f) => ({ ...f, difficulty: d }))}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        filters.difficulty === d
                          ? d === 1
                            ? "bg-emerald-600 text-white"
                            : d === 2
                            ? "bg-amber-600 text-white"
                            : "bg-red-600 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {d === 1 ? "Dễ" : d === 2 ? "Trung bình" : "Khó"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-400">
            <span className="text-white font-semibold">{filteredQuestions.length}</span> câu phù hợp bộ lọc
          </p>
        </div>

        <Card className="glass-card text-center py-12">
          <CardContent className="flex flex-col items-center">
            <div className="h-20 w-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
              <PenTool className="h-10 w-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Sẵn sàng luyện tập?</h2>
            <p className="text-slate-400 mb-8 max-w-sm">
              Sẽ lấy ngẫu nhiên <strong className="text-white">10 câu</strong> từ bộ lọc đã chọn.
              Điểm số sẽ được tính sau khi hoàn thành.
            </p>
            <Button
              size="lg"
              onClick={startSession}
              disabled={filteredQuestions.length === 0}
              className="w-72 text-md h-12 bg-emerald-600 hover:bg-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              Bắt đầu luyện tập ({Math.min(10, filteredQuestions.length)} câu)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sessionResult) {
    return (
      <div className="p-8 pb-20 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Trophy className="mr-3 text-amber-400" /> Kết quả
          </h1>
        </div>
        <Card className="glass-card">
          <CardContent className="p-8">
            <ResultScreen result={sessionResult} onRestart={resetSession} />
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = sessionQuestions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const progress = ((currentIndex + 1) / sessionQuestions.length) * 100;

  return (
    <div className="p-8 pb-20 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={resetSession}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <BookOpen size={16} />
            <span className="text-sm">Thoát</span>
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-sm text-slate-400">
            Câu {currentIndex + 1}/{sessionQuestions.length}
          </span>
        </div>
        <div className="flex gap-1">
          {sessionQuestions.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i < currentIndex
                  ? answers[i].selected === sessionQuestions[i].answer
                    ? "bg-emerald-500 w-4"
                    : "bg-red-500 w-4"
                  : i === currentIndex
                  ? "bg-blue-500 w-6"
                  : "bg-slate-700 w-4"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-slate-800 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Card className="glass-card">
        <CardContent className="p-8">
          <QuestionCard
            question={currentQ}
            answerState={currentAnswer}
            onSelect={handleSelect}
            onReveal={handleReveal}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0} className="gap-2">
          <ChevronLeft size={18} /> Câu trước
        </Button>
        {currentAnswer.revealed && (
          <Button onClick={handleNext} className="gap-2">
            {currentIndex < sessionQuestions.length - 1 ? (
              <>
                Câu tiếp <ChevronRight size={18} />
              </>
            ) : (
              <>
                Xem kết quả <Trophy size={18} />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
