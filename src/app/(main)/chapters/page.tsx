"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BookOpen, ChevronRight, FlaskConical, Beaker, ListChecks } from "lucide-react";
import { chapterTheory } from "@/lib/data/theory";
import Link from "next/link";

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  red: "bg-red-500/10 text-red-400 border-red-500/30",
  teal: "bg-teal-500/10 text-teal-400 border-teal-500/30",
  green: "bg-green-500/10 text-green-400 border-green-500/30",
};

const cardHoverMap: Record<string, string> = {
  blue: "hover:border-blue-500/50",
  emerald: "hover:border-emerald-500/50",
  purple: "hover:border-purple-500/50",
  orange: "hover:border-orange-500/50",
  cyan: "hover:border-cyan-500/50",
  yellow: "hover:border-yellow-500/50",
  red: "hover:border-red-500/50",
  teal: "hover:border-teal-500/50",
  green: "hover:border-green-500/50",
};

type Tab = "formulas" | "reactions" | "notes";

function ChapterDetailView({ chapterId, onBack }: { chapterId: number; onBack: () => void }) {
  const chapter = chapterTheory.find((c) => c.id === chapterId);
  const [tab, setTab] = useState<Tab>("formulas");

  if (!chapter) return null;
  const colorCls = colorMap[chapter.color] ?? colorMap.blue;
  const badgeBg = colorCls.split(" ").find((c) => c.startsWith("bg-")) ?? "bg-blue-500/10";
  const badgeText = colorCls.split(" ").find((c) => c.startsWith("text-")) ?? "text-blue-400";

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "formulas", label: "Công thức", icon: <FlaskConical size={16} /> },
    { key: "reactions", label: "Phản ứng", icon: <Beaker size={16} /> },
    { key: "notes", label: "Ghi nhớ", icon: <ListChecks size={16} /> },
  ];

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
      >
        <ChevronRight className="rotate-180" size={18} />
        <span className="text-sm">Quay lại danh sách</span>
      </button>

      {/* Chapter header */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium mb-4 ${colorCls}`}>
        Chương {chapter.id}
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">{chapter.title}</h2>
      <p className="text-slate-400 mb-8 max-w-2xl leading-relaxed">{chapter.summary}</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-800 pb-0">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === t.key
                ? `${badgeText} border-current`
                : "text-slate-400 border-transparent hover:text-slate-200"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "formulas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapter.keyFormulas.map((f, i) => (
            <div key={i} className="glass-card rounded-xl p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">{f.label}</p>
              <p className={`text-xl font-mono font-bold ${badgeText}`}>{f.formula}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "reactions" && (
        <div className="space-y-4">
          {chapter.keyReactions.map((r, i) => (
            <div key={i} className="glass-card rounded-xl p-5">
              <p className={`text-sm font-bold mb-2 ${badgeText}`}>{r.name}</p>
              <pre className="text-white font-mono text-sm bg-slate-900/60 rounded-lg p-3 whitespace-pre-wrap leading-relaxed mb-3">
                {r.equation}
              </pre>
              {r.note && (
                <p className="text-xs text-slate-400 leading-relaxed">💡 {r.note}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "notes" && (
        <ul className="space-y-3">
          {chapter.rememberPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3 glass-card rounded-xl p-4">
              <span className={`shrink-0 w-6 h-6 rounded-full ${badgeBg} ${badgeText} flex items-center justify-center text-xs font-bold`}>
                {i + 1}
              </span>
              <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Practice link */}
      <div className="mt-10 pt-6 border-t border-slate-800">
        <Link href="/practice">
          <button className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${colorCls} hover:opacity-90`}>
            <FlaskConical size={16} />
            Luyện bài tập chương này →
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function ChaptersPage() {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  if (selectedChapter !== null) {
    return (
      <div className="p-8 pb-20 max-w-5xl mx-auto">
        <ChapterDetailView chapterId={selectedChapter} onBack={() => setSelectedChapter(null)} />
      </div>
    );
  }

  return (
    <div className="p-8 pb-20 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
          <BookOpen className="mr-3 text-blue-400" /> Lý Thuyết
        </h1>
        <p className="text-slate-400">Tóm tắt lý thuyết, phản ứng và công thức Hóa Học 12 CTST (9 chương).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapterTheory.map((chapter) => {
          const colorCls = colorMap[chapter.color] ?? colorMap.blue;
          const hoverCls = cardHoverMap[chapter.color] ?? cardHoverMap.blue;
          return (
            <button
              key={chapter.id}
              onClick={() => setSelectedChapter(chapter.id)}
              className={`text-left glass-card rounded-xl p-6 transition-all duration-200 ${hoverCls} hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold ${colorCls}`}
                >
                  Chương {chapter.id}
                </span>
                <span className="text-4xl font-black text-slate-800 leading-none">
                  {String(chapter.id).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-slate-100 mb-2 leading-snug">
                {chapter.shortTitle}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{chapter.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                  {chapter.keyFormulas.length} công thức
                </span>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                  {chapter.keyReactions.length} phản ứng
                </span>
                <span className={`text-xs border px-2 py-1 rounded ${colorCls}`}>
                  Xem lý thuyết
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
