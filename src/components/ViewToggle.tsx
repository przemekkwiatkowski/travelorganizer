"use client";

import { LayoutList, GalleryHorizontalEnd } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "horizontal" | "vertical";

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-1">
      <button
        onClick={() => onChange("horizontal")}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all cursor-pointer",
          mode === "horizontal"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        )}
      >
        <GalleryHorizontalEnd className="h-4 w-4" />
        <span className="hidden sm:inline">Timeline</span>
      </button>
      <button
        onClick={() => onChange("vertical")}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all cursor-pointer",
          mode === "vertical"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        )}
      >
        <LayoutList className="h-4 w-4" />
        <span className="hidden sm:inline">Day View</span>
      </button>
    </div>
  );
}
