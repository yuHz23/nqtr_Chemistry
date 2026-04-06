"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, PenTool, BrainCircuit, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
    { name: "Lý thuyết", href: "/chapters", icon: BookOpen },
    { name: "Luyện bài", href: "/practice", icon: PenTool },
    { name: "AI Giải", href: "/ai-solver", icon: BrainCircuit },
    { name: "Tài khoản", href: "/profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-header border-t border-slate-800 bg-slate-900/80 backdrop-blur-md pb-safe">
      <nav className="flex justify-around items-center px-2 py-2 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-blue-400" : "text-slate-400 hover:text-slate-300"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-full transition-all duration-300",
                isActive ? "bg-blue-500/20" : "bg-transparent"
              )}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className={cn(
                "text-[10px] sm:text-xs font-medium",
                isActive ? "font-bold" : "font-normal"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
