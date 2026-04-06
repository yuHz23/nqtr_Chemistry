import * as React from "react";
import Link from "next/link";
import { LayoutDashboard, BookOpen, PenTool, GraduationCap, BrainCircuit, Zap, User, LogOut, ShieldAlert } from "lucide-react";

export function Sidebar() {
  const navItems = [
    { name: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
    { name: "Lý thuyết", href: "/chapters", icon: BookOpen },
    { name: "Luyện bài tập", href: "/practice", icon: PenTool },
    { name: "Luyện đề THPT", href: "/exam", icon: GraduationCap },
    { name: "AI Giải bài", href: "/ai-solver", icon: BrainCircuit },
    { name: "Flashcards", href: "/flashcards", icon: Zap },
    { name: "Tài khoản", href: "/profile", icon: User },
    { name: "Admin", href: "/admin", icon: ShieldAlert },
  ];

  return (
    <div className="flex h-screen w-64 flex-col glass-header border-r border-slate-800 bg-slate-900/50">
      <div className="flex h-16 items-center px-6 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
        Hóa 12 CTST
      </div>
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="flex flex-col space-y-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-blue-600/10 hover:text-blue-400 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800">
        <button className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
