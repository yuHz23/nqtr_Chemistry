"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { userStats, chapters } from "@/lib/data/mock";
import { getSessions, PracticeSession } from "@/lib/progress";
import {
  Target,
  Zap,
  BookOpen,
  CheckCircle2,
  Clock,
  Star,
  PenTool,
  GraduationCap,
} from "lucide-react";

const chapterProgress = chapters.filter((c) => c.progress > 0);

export default function ProfilePage() {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);

  useEffect(() => {
    // eslint-disable-next-line
    setSessions(getSessions());
  }, []);

  const overallProgress = Math.round(
    chapters.reduce((sum, c) => sum + c.progress, 0) / chapters.length
  );

  // Compute stats from real localStorage data
  const totalCorrect = sessions.reduce((s, r) => s + r.score, 0);
  const totalQuestions = sessions.reduce((s, r) => s + r.total, 0);
  const avgScore =
    totalQuestions > 0
      ? ((totalCorrect / totalQuestions) * 10).toFixed(1)
      : "—";
  const examSessions = sessions.filter((s) => s.type === "exam");
  const practiceSessions = sessions.filter((s) => s.type === "practice");

  // Recent activity from real sessions (last 5)
  const recentSessions = [...sessions].reverse().slice(0, 5);

  return (
    <div className="p-8 pb-20 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tài khoản</h1>
        <p className="text-slate-400">Theo dõi tiến độ và thành tích của bạn.</p>
      </div>

      {/* Profile header card */}
      <Card className="glass-card mb-6 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-black text-white shadow-lg">
              {userStats.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{userStats.name}</h2>
              <p className="text-slate-400 text-sm mb-3">Tài khoản miễn phí · Hóa Học 12 CTST</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 text-blue-400">
                  <Zap size={16} />
                  <span className="text-sm font-semibold">{sessions.length} sessions đã làm</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Target size={16} />
                  <span className="text-sm font-semibold">{totalCorrect}/{totalQuestions} câu đúng</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Đề đã thi",
            value: examSessions.length || "0",
            icon: <GraduationCap size={20} />,
            color: "text-emerald-400",
          },
          {
            label: "Bài luyện tập",
            value: practiceSessions.length || "0",
            icon: <PenTool size={20} />,
            color: "text-blue-400",
          },
          {
            label: "Tiến độ tổng",
            value: `${overallProgress}%`,
            icon: <CheckCircle2 size={20} />,
            color: "text-purple-400",
          },
          {
            label: "Điểm trung bình",
            value: avgScore === "—" ? "—" : `${avgScore}/10`,
            icon: <Star size={20} />,
            color: "text-amber-400",
          },
        ].map(({ label, value, icon, color }) => (
          <Card key={label} className="glass-card">
            <CardContent className="p-5 flex flex-col gap-2">
              <div className={`${color}`}>{icon}</div>
              <span className="text-2xl font-black text-white">{value}</span>
              <span className="text-xs text-slate-400">{label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chapter progress */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-400" />
              Tiến độ theo chương
            </h3>
            {chapterProgress.length === 0 ? (
              <p className="text-slate-500 text-sm">Chưa có tiến độ. Bắt đầu luyện tập để cập nhật.</p>
            ) : (
              <div className="space-y-4">
                {chapterProgress.map((ch) => (
                  <div key={ch.id}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-300 truncate pr-2">{ch.title}</span>
                      <span className="text-blue-400 font-medium shrink-0">{ch.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          ch.progress >= 80
                            ? "bg-emerald-500"
                            : ch.progress >= 50
                            ? "bg-blue-500"
                            : "bg-amber-500"
                        }`}
                        style={{ width: `${ch.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="text-xs text-slate-500 pt-2">
                  {chapters.filter((c) => c.progress === 0).length} chương chưa bắt đầu
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent activity from real data */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Clock size={18} className="text-slate-400" />
              Hoạt động gần đây
            </h3>
            {recentSessions.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-10 w-10 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">Chưa có hoạt động nào.</p>
                <p className="text-slate-600 text-xs mt-1">Hãy làm một bài luyện tập!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((s, i) => {
                  const label =
                    s.type === "exam"
                      ? s.mode ?? "Thi thử"
                      : `Luyện tập${s.chapter ? ` – Chương ${s.chapter}` : " tổng hợp"}`;
                  const timeAgo = formatTimeAgo(s.timestamp);
                  const pct = s.pct;
                  return (
                    <div key={i} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-300">{label}</p>
                        <p className="text-xs text-slate-500">{timeAgo}</p>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full ${
                          pct >= 70
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {s.score}/{s.total}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Vừa xong";
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Hôm qua";
  return `${days} ngày trước`;
}
