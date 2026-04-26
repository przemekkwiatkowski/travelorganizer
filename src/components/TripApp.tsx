"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { TripData } from "@/types/trip";
import { TripHeader } from "./TripHeader";
import { ViewToggle } from "./ViewToggle";
import { CategoryLegend } from "./CategoryLegend";
import { HorizontalTimeline } from "./HorizontalTimeline";
import { VerticalTimeline } from "./VerticalTimeline";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TripAppProps {
  initialData: TripData;
}

export function TripApp({ initialData }: TripAppProps) {
  const [data, setData] = useState<TripData>(initialData);
  const [viewMode, setViewMode] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
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
        alert("Invalid JSON file");
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
          <ViewToggle mode={viewMode} onChange={setViewMode} />
          <CategoryLegend />
        </div>

        {viewMode === "horizontal" ? (
          <HorizontalTimeline
            days={data.days}
            activeDay={activeDay}
            onDaySelect={setActiveDay}
          />
        ) : (
          <div>
            <div className="mb-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setActiveDay(Math.max(0, activeDay - 1))}
                disabled={activeDay === 0}
                className="rounded-lg border border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 cursor-pointer transition-colors"
                aria-label="Previous day"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>

              <div className="flex gap-1.5">
                {data.days.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className={cn(
                      "h-2.5 rounded-full transition-all cursor-pointer",
                      activeDay === i
                        ? "w-8 bg-blue-500"
                        : "w-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                    )}
                    aria-label={`Go to day ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setActiveDay(Math.min(data.days.length - 1, activeDay + 1))
                }
                disabled={activeDay === data.days.length - 1}
                className="rounded-lg border border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 cursor-pointer transition-colors"
                aria-label="Next day"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <VerticalTimeline
              day={data.days[activeDay]}
              dayIndex={activeDay}
            />
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 px-4 py-6 text-center text-sm text-gray-400 dark:text-gray-500">
        TravelOrganizer &middot; Edit{" "}
        <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs">
          src/data/trip.json
        </code>{" "}
        to customize your trip
      </footer>
    </div>
  );
}
