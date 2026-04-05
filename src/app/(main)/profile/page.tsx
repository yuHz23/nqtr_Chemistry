"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { userStats, chapters } from "@/lib/data/mock";
import {
  Flame,
  Trophy,
  Target,
  Zap,
  BookOpen,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";

const badges = [
  { icon: "🔥", label: "Streak 15 ngày", color: "border-amber-500/30 bg-amber-500/5 text-amber-300" },
  { icon: "⚗️", label: "Giỏi Este – Lipit", color: "border-blue-500/30 bg-blue-500/5 text-blue-300" },
  { icon: "🧫", label: "50 câu đúng liên tiếp", color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-300" },
  { icon: "🤖", label: "Dùng AI 42 lần", color: "border-purple-500/30 bg-purple-500/5 text-purple-300" },
];

const recentActivity = [
  { action: "Hoàn thành bài luyện tập Chương 1", time: "10 phút trước", correct: 8, total: 10 },
  { action: "Ôn Flashcard — 15 thẻ", time: "1 giờ trước", correct: null, total: 15 },
  { action: "Thi thử đề chuẩn", time: "Hôm qua", correct: 32, total: 40 },
];

const chapterProgress = chapters.filter((c) => c.progress > 0);

export default function ProfilePage() {
  const overallProgress = Math.round(
    chapters.reduce((sum, c) => sum + c.progress, 0) / chapters.length
  );

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
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Flame size={16} />
                  <span className="text-sm font-semibold">{userStats.streak} ngày streak</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-400">
                  <Zap size={16} />
                  <span className="text-sm font-semibold">{userStats.xp} XP</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-400">
                  <Trophy size={16} />
                  <span className="text-sm font-semibold">Hạng #{userStats.rank}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Đề đã làm", value: userStats.completedExams, icon: <Target size={20} />, color: "text-emerald-400" },
          { label: "AI lần hỏi", value: userStats.aiRequests, icon: <BookOpen size={20} />, color: "text-blue-400" },
          { label: "Tiến độ tổng", value: `${overallProgress}%`, icon: <CheckCircle2 size={20} />, color: "text-purple-400" },
          { label: "Điểm trung bình", value: "7.8/10", icon: <Star size={20} />, color: "text-amber-400" },
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
                        ch.progress >= 80 ? "bg-emerald-500" : ch.progress >= 50 ? "bg-blue-500" : "bg-amber-500"
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
          </CardContent>
        </Card>

        {/* Activity & badges */}
        <div className="space-y-6">
          {/* Badges */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Trophy size={18} className="text-amber-400" />
                Huy hiệu đã đạt
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {badges.map((b) => (
                  <div
                    key={b.label}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${b.color}`}
                  >
                    <span>{b.icon}</span>
                    <span className="text-xs leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Clock size={18} className="text-slate-400" />
                Hoạt động gần đây
              </h3>
              <div className="space-y-3">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-300">{act.action}</p>
                      <p className="text-xs text-slate-500">{act.time}</p>
                    </div>
                    {act.correct !== null && (
                      <Badge variant={act.correct / act.total >= 0.7 ? "success" : "warning"}>
                        {act.correct}/{act.total}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
