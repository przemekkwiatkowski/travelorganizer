"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { TripData } from "@/types/trip";
import { TripHeader } from "./TripHeader";
import { ViewToggle, type ViewMode, type TimelineSubMode } from "./ViewToggle";
import { CategoryLegend } from "./CategoryLegend";
import { HorizontalTimeline } from "./HorizontalTimeline";
import { TimelineDetailed } from "./TimelineDetailed";
import { VerticalTimeline } from "./VerticalTimeline";
import { BoardView } from "./BoardView";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

interface TripAppProps {
  initialData: TripData;
}

export function TripApp({ initialData }: TripAppProps) {
  const [data, setData] = useState<TripData>(initialData);
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
  const [timelineSubMode, setTimelineSubMode] =
    useState<TimelineSubMode>("detailed");
  const [activeDay, setActiveDay] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("travelorg-dark");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = stored ? stored === "true" : prefersDark;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleDark() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("travelorg-dark", String(next));
  }

  const handleExport = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.trip.name.replace(/\s+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  function handleImport() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (parsed.trip && parsed.days) {
          setData(parsed);
          setActiveDay(0);
        }
      } catch {
        alert("Nieprawidłowy plik JSON");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />

      <TripHeader
        trip={data.trip}
        totalDays={data.days.length}
        darkMode={darkMode}
        onToggleDark={toggleDark}
        onExport={handleExport}
        onImport={handleImport}
      />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ViewToggle
            mode={viewMode}
            onChange={setViewMode}
            timelineSubMode={timelineSubMode}
            onTimelineSubModeChange={setTimelineSubMode}
          />
          <CategoryLegend />
        </div>

        {viewMode === "timeline" && timelineSubMode === "detailed" && (
          <TimelineDetailed
            days={data.days}
            activeDay={activeDay}
            onDaySelect={setActiveDay}
          />
        )}

        {viewMode === "timeline" && timelineSubMode === "compact" && (
          <HorizontalTimeline
            days={data.days}
            activeDay={activeDay}
            onDaySelect={setActiveDay}
          />
        )}

        {viewMode === "board" && <BoardView days={data.days} />}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 px-4 py-6 text-center text-sm text-gray-400 dark:text-gray-500">
        {t.app.name} &middot; {t.app.editHint}{" "}
        <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs">
          src/data/trip.json
        </code>{" "}
        {t.app.editHintSuffix}
      </footer>
    </div>
  );
}
