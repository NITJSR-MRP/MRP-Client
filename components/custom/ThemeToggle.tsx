"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  className?: string;
  variant?: "outline" | "ghost";
}

export function ThemeToggle({ className, variant = "outline" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant={variant}
        size="icon"
        className={`h-9 w-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 ${className || ""}`}
        aria-label="Toggle theme"
      >
        <span className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative h-9 w-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 shadow-sm ${className || ""}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-4 w-4 text-amber-500 transition-transform duration-300 ${
          isDark ? "-rotate-90 scale-0 absolute" : "rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`h-4 w-4 text-indigo-400 transition-transform duration-300 ${
          isDark ? "rotate-0 scale-100" : "rotate-90 scale-0 absolute"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeToggle;
