import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "danger" | "success" | "glass";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.3)]": variant === "default",
            "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-200": variant === "outline",
            "hover:bg-slate-800 text-slate-200": variant === "ghost",
            "bg-red-600/90 text-white hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]": variant === "danger",
            "bg-emerald-600/90 text-white hover:bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]": variant === "success",
            "glass-card hover:bg-slate-800/80 text-white": variant === "glass",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
