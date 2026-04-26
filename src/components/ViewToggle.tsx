"use client";

import { GalleryHorizontalEnd, Kanban, List, Rows3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export type ViewMode = "timeline" | "board";
export type TimelineSubMode = "detailed" | "compact";

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  timelineSubMode?: TimelineSubMode;
  onTimelineSubModeChange?: (sub: TimelineSubMode) => void;
}

export function ViewToggle({
  mode,
  onChange,
  timelineSubMode,
  onTimelineSubModeChange,
}: ViewToggleProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="inline-flex items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-1">
        <button
          onClick={() => onChange("timeline")}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all cursor-pointer",
            mode === "timeline"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          )}
        >
          <GalleryHorizontalEnd className="h-4 w-4" />
          <span className="hidden sm:inline">{t.views.timeline}</span>
        </button>
        <button
          onClick={() => onChange("board")}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all cursor-pointer",
            mode === "board"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          )}
        >
          <Kanban className="h-4 w-4" />
          <span className="hidden sm:inline">{t.views.board}</span>
        </button>
      </div>

      {mode === "timeline" && onTimelineSubModeChange && (
        <div className="inline-flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-0.5">
          <button
            onClick={() => onTimelineSubModeChange("detailed")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer",
              timelineSubMode === "detailed"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            <List className="h-3.5 w-3.5" />
            {t.views.timelineDetailed}
          </button>
          <button
            onClick={() => onTimelineSubModeChange("compact")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer",
              timelineSubMode === "compact"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            <Rows3 className="h-3.5 w-3.5" />
            {t.views.timelineCompact}
          </button>
        </div>
      )}
    </div>
  );
}
