"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSessions, resetAllSessions, PracticeSession } from "@/lib/progress";
import {
  BarChart2,
  Clock,
  Trophy,
  Target,
  BookOpen,
  RotateCcw,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Zap,
  ShieldAlert,
  GraduationCap,
  PenTool,
  ChevronRight,
  Lock,
} from "lucide-react";

// Encoded credentials (base64) — not plaintext security, just obfuscation
const _U = "aHV5aHV5MTYyMw==";
const _P = "QEh1eTIwMDMqKjop";
function checkCreds(u: string, p: string) {
  return btoa(u) === _U && btoa(p) === _P;
}
const SESSION_KEY = "chem12_admin_auth";

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkCreds(username, password)) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError("Sai tài khoản hoặc mật khẩu!");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-sm transition-transform duration-150 ${
          shake ? "animate-[shake_0.4s_ease]" : ""
        }`}
        style={shake ? { animation: "shake 0.4s ease" } : {}}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_40px_rgba(99,102,241,0.3)] mb-4">
            <ShieldAlert className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Hóa Học 12 — Khu vực quản trị</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm p-8 space-y-4"
        >
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2 block">
              Tài khoản
            </label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Nhập username"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2 block">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Nhập mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-xs px-1"
              >
                {showPass ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <Lock size={14} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] mt-2"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-center text-xs text-slate-700 mt-6">
          Chỉ dành cho quản trị viên
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

const CHAPTER_NAMES: Record<number, string> = {
  1: "Este – Lipit",
  2: "Carbohydrate",
  3: "Amin, Amino acid, Protein",
  4: "Polymer",
  5: "Đại cương KL",
  6: "KL kiềm, kiềm thổ, Al",
  7: "Sắt & KL khác",
  8: "Phân biệt chất vô cơ",
  9: "Hóa học bền vững",
};

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function StatCard({
  icon, label, value, sub, color,
}: {
  icon: React.ReactNode; label: string; value: string; sub?: string; color: string;
}) {
  return (
    <div className={`rounded-2xl border bg-slate-900/60 backdrop-blur-sm p-6 flex items-center justify-between border-slate-800 hover:border-slate-600 transition-colors`}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">{label}</p>
        <h3 className={`text-3xl font-black ${color}`}>{value}</h3>
        {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
      </div>
      <div className={`h-14 w-14 rounded-xl flex items-center justify-center bg-slate-800`}>
        {icon}
      </div>
    </div>
  );
}

function MiniBarChart({ data }: { data: { label: string; correct: number; total: number }[] }) {
  const maxTotal = Math.max(...data.map((d) => d.total), 1);
  return (
    <div className="space-y-3">
      {data.map((d, i) => {
        const pct = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
        const barW = Math.round((d.total / maxTotal) * 100);
        const color = pct >= 80 ? "from-emerald-500 to-teal-400" : pct >= 60 ? "from-blue-500 to-cyan-400" : pct >= 40 ? "from-amber-500 to-yellow-400" : "from-red-500 to-rose-400";
        return (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400 truncate max-w-[140px]">{d.label}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-blue-400" : pct >= 40 ? "text-amber-400" : "text-red-400"}`}>{pct}%</span>
                <span className="text-xs text-slate-600">{d.correct}/{d.total}</span>
              </div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-700`}
                style={{ width: `${barW}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ScoreLine({ sessions }: { sessions: PracticeSession[] }) {
  const last10 = sessions.slice(-10);
  if (last10.length < 2) {
    return <p className="text-slate-500 text-sm text-center py-6">Cần ít nhất 2 session để hiển thị xu hướng.</p>;
  }
  const points = last10.map((s, i) => {
    const x = (i / (last10.length - 1)) * 100;
    const y = 100 - s.pct;
    return `${x},${y}`;
  });
  const polyline = points.join(" ");
  return (
    <div className="relative">
      <svg viewBox="0 0 100 100" className="w-full h-28" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#1e293b" strokeWidth="0.5" />
        ))}
        {/* Area fill */}
        <polyline
          points={`0,100 ${polyline} 100,100`}
          fill="rgba(59,130,246,0.08)"
        />
        {/* Line */}
        <polyline
          points={polyline}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        {/* Dots */}
        {last10.map((s, i) => {
          const x = (i / (last10.length - 1)) * 100;
          const y = 100 - s.pct;
          return (
            <circle key={i} cx={x} cy={y} r="2.5"
              fill={s.pct >= 80 ? "#10b981" : s.pct >= 60 ? "#3b82f6" : s.pct >= 40 ? "#f59e0b" : "#ef4444"}
              stroke="#0f172a" strokeWidth="1" />
          );
        })}
      </svg>
      {/* Y axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-600 pointer-events-none -translate-x-6">
        <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
      </div>
    </div>
  );
}

function DonutChart({ correct, incorrect }: { correct: number; incorrect: number }) {
  const total = correct + incorrect;
  if (total === 0) return <p className="text-slate-500 text-sm text-center py-6">Chưa có dữ liệu.</p>;
  const pct = Math.round((correct / total) * 100);
  const circumference = 2 * Math.PI * 36;
  const correctArc = (pct / 100) * circumference;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 80 80" className="w-24 h-24 shrink-0" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="40" cy="40" r="36" fill="none" stroke="#1e293b" strokeWidth="10" />
        <circle cx="40" cy="40" r="36" fill="none" stroke="#10b981" strokeWidth="10"
          strokeDasharray={`${correctArc} ${circumference - correctArc}`}
          strokeLinecap="round" />
        <circle cx="40" cy="40" r="36" fill="none" stroke="#ef4444" strokeWidth="10"
          strokeDasharray={`${circumference - correctArc} ${circumference}`}
          strokeDashoffset={`${-correctArc}`}
          strokeLinecap="round" />
      </svg>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-sm text-slate-300">Đúng: <strong className="text-emerald-400">{correct}</strong> câu ({pct}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
          <span className="text-sm text-slate-300">Sai: <strong className="text-red-400">{incorrect}</strong> câu ({100 - pct}%)</span>
        </div>
        <p className="text-xs text-slate-500">Tổng: {total} câu</p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [tab, setTab] = useState<"overview" | "history" | "chapters">("overview");
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const ok = sessionStorage.getItem(SESSION_KEY) === "1";
    // eslint-disable-next-line
    setIsLoggedIn(ok);
    setAuthChecked(true);
    if (ok) setSessions(getSessions());
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setSessions(getSessions());
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsLoggedIn(false);
  };

  // Show nothing until auth check done (prevents flash)
  if (!authChecked) return null;
  // Show login gate if not authenticated
  if (!isLoggedIn) return <LoginGate onSuccess={handleLogin} />;

  const handleReset = () => {
    resetAllSessions();
    setSessions([]);
    setConfirmReset(false);
  };

  // Computed stats
  const totalSessions = sessions.length;
  const totalQuestions = sessions.reduce((s, r) => s + r.total, 0);
  const totalCorrect = sessions.reduce((s, r) => s + r.score, 0);
  const avgPct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const practiceCount = sessions.filter((s) => s.type === "practice").length;
  const examCount = sessions.filter((s) => s.type === "exam").length;
  const lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;

  // Chapter breakdown
  const chapterMap: Record<number, { correct: number; total: number }> = {};
  sessions.forEach((s) => {
    if (s.chapter !== null) {
      if (!chapterMap[s.chapter]) chapterMap[s.chapter] = { correct: 0, total: 0 };
      chapterMap[s.chapter].correct += s.score;
      chapterMap[s.chapter].total += s.total;
    }
  });
  const chapterData = Object.entries(chapterMap)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([ch, d]) => ({
      label: `Ch.${ch} ${CHAPTER_NAMES[Number(ch)] ?? ""}`,
      ...d,
    }));

  // Strongest/weakest chapter
  const strongest = [...chapterData].sort((a, b) =>
    b.total > 0 ? b.correct / b.total - (a.total > 0 ? a.correct / a.total : 0) : -1
  )[0];
  const weakest = [...chapterData].sort((a, b) =>
    a.total > 0 ? a.correct / a.total - (b.total > 0 ? b.correct / b.total : 0) : 1
  )[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <ShieldAlert className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-none">Admin Dashboard</h1>
              <p className="text-xs text-slate-500">Hóa Học 12 · Theo dõi học tập</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
              <ChevronRight className="rotate-180 h-4 w-4" /> Về trang học
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-400 transition-colors"
            >
              <Lock size={14} /> Đăng xuất
            </button>
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm transition-colors"
              >
                <RotateCcw size={14} /> Reset tiến độ
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-400">Xác nhận xóa?</span>
                <button onClick={handleReset} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-bold transition-colors">Xóa</button>
                <button onClick={() => setConfirmReset(false)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs transition-colors">Hủy</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Empty state */}
        {totalSessions === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 p-16 text-center mb-8">
            <BarChart2 className="h-12 w-12 text-slate-700 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-400 mb-2">Chưa có dữ liệu học tập</h2>
            <p className="text-slate-600 text-sm">Hãy làm một bài luyện tập hoặc thi thử để bắt đầu theo dõi tiến độ.</p>
            <a href="/practice" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-medium transition-colors">
              <PenTool size={16} /> Bắt đầu luyện tập
            </a>
          </div>
        )}

        {totalSessions > 0 && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={<Zap className="h-6 w-6 text-blue-400" />}
                label="Tổng sessions" value={String(totalSessions)}
                sub={`${practiceCount} luyện · ${examCount} thi`}
                color="text-blue-400"
              />
              <StatCard
                icon={<Target className="h-6 w-6 text-emerald-400" />}
                label="Tỉ lệ đúng TB" value={`${avgPct}%`}
                sub={`${totalCorrect}/${totalQuestions} câu`}
                color={avgPct >= 80 ? "text-emerald-400" : avgPct >= 60 ? "text-blue-400" : avgPct >= 40 ? "text-amber-400" : "text-red-400"}
              />
              <StatCard
                icon={<BookOpen className="h-6 w-6 text-purple-400" />}
                label="Tổng câu hỏi" value={String(totalQuestions)}
                sub={`${totalCorrect} đúng · ${totalQuestions - totalCorrect} sai`}
                color="text-purple-400"
              />
              <StatCard
                icon={<Clock className="h-6 w-6 text-amber-400" />}
                label="Session gần nhất"
                value={lastSession ? `${lastSession.pct}%` : "—"}
                sub={lastSession ? formatDate(lastSession.timestamp).split(",")[0] : "Chưa có"}
                color="text-amber-400"
              />
            </div>

            {/* Highlights */}
            {(strongest || weakest) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {strongest && (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-xs text-emerald-500 font-semibold uppercase tracking-wider mb-1">Chương mạnh nhất</p>
                      <p className="font-bold text-white">{strongest.label}</p>
                      <p className="text-sm text-emerald-400">{strongest.total > 0 ? Math.round((strongest.correct / strongest.total) * 100) : 0}% đúng ({strongest.correct}/{strongest.total} câu)</p>
                    </div>
                  </div>
                )}
                {weakest && weakest.label !== strongest?.label && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 flex items-center gap-4">
                    <TrendingUp className="h-8 w-8 text-red-400 shrink-0 scale-y-[-1]" />
                    <div>
                      <p className="text-xs text-red-500 font-semibold uppercase tracking-wider mb-1">Cần ôn thêm</p>
                      <p className="font-bold text-white">{weakest.label}</p>
                      <p className="text-sm text-red-400">{weakest.total > 0 ? Math.round((weakest.correct / weakest.total) * 100) : 0}% đúng ({weakest.correct}/{weakest.total} câu)</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-slate-800">
              {(["overview", "chapters", "history"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    tab === t ? "text-blue-400 border-blue-400" : "text-slate-400 border-transparent hover:text-slate-200"
                  }`}
                >
                  {{ overview: "Tổng quan", chapters: "Theo Chương", history: "Lịch sử" }[t]}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {tab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                  <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
                    <TrendingUp size={16} className="text-blue-400" /> Xu hướng điểm số
                  </h2>
                  <p className="text-xs text-slate-500 mb-5">10 session gần nhất</p>
                  <div className="pl-6">
                    <ScoreLine sessions={sessions} />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                  <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
                    <Target size={16} className="text-emerald-400" /> Tỉ lệ đúng/sai
                  </h2>
                  <p className="text-xs text-slate-500 mb-5">Toàn bộ thời gian</p>
                  <DonutChart correct={totalCorrect} incorrect={totalQuestions - totalCorrect} />
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:col-span-2">
                  <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
                    <GraduationCap size={16} className="text-purple-400" /> Phân bổ session
                  </h2>
                  <p className="text-xs text-slate-500 mb-5">Theo loại luyện tập</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1.5"><PenTool size={12} /> Luyện bài tập</span>
                        <span className="text-white font-bold">{practiceCount} session</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                          style={{ width: totalSessions > 0 ? `${Math.round(practiceCount / totalSessions * 100)}%` : "0%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1.5"><GraduationCap size={12} /> Thi thử</span>
                        <span className="text-white font-bold">{examCount} session</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                          style={{ width: totalSessions > 0 ? `${Math.round(examCount / totalSessions * 100)}%` : "0%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Chapters */}
            {tab === "chapters" && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
                  <BookOpen size={16} className="text-blue-400" /> Kết quả theo chương
                </h2>
                <p className="text-xs text-slate-500 mb-6">Tổng hợp từ tất cả session luyện bài tập</p>
                {chapterData.length === 0 ? (
                  <p className="text-slate-500 text-sm">Chưa có dữ liệu theo chương. Hãy luyện bài tập có chọn chương.</p>
                ) : (
                  <MiniBarChart data={chapterData} />
                )}
              </div>
            )}

            {/* Tab: History */}
            {tab === "history" && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                <div className="p-5 border-b border-slate-800">
                  <h2 className="font-semibold text-white flex items-center gap-2">
                    <Clock size={16} className="text-amber-400" /> Lịch sử sessions
                  </h2>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-[500px] overflow-y-auto">
                  {[...sessions].reverse().map((s, i) => {
                    const pctColor = s.pct >= 80 ? "text-emerald-400" : s.pct >= 60 ? "text-blue-400" : s.pct >= 40 ? "text-amber-400" : "text-red-400";
                    const Icon = s.type === "exam" ? GraduationCap : PenTool;
                    return (
                      <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800/30 transition-colors">
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${s.type === "exam" ? "bg-red-500/10" : "bg-emerald-500/10"}`}>
                          <Icon className={`h-4 w-4 ${s.type === "exam" ? "text-red-400" : "text-emerald-400"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {s.type === "exam" ? (s.mode ?? "Thi thử") : `Luyện tập${s.chapter ? ` – Ch.${s.chapter}` : " tổng hợp"}`}
                          </p>
                          <p className="text-xs text-slate-500">{formatDate(s.timestamp)}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`text-lg font-black ${pctColor}`}>{s.pct}%</p>
                          <p className="text-xs text-slate-500">{s.score}/{s.total} câu</p>
                        </div>
                        <div>
                          {s.pct >= 50 ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
