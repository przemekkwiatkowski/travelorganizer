"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TripDay } from "@/types/trip";
import { DayColumn } from "./DayColumn";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

interface HorizontalTimelineProps {
  days: TripDay[];
  activeDay: number;
  onDaySelect: (index: number) => void;
}

export function HorizontalTimeline({
  days,
  activeDay,
  onDaySelect,
}: HorizontalTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -360 : 360,
      behavior: "smooth",
    });
  }

  function scrollToDay(index: number) {
    onDaySelect(index);
    const el = scrollRef.current;
    if (!el) return;
    const columns = el.querySelectorAll("[data-day-column]");
    columns[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 dark:bg-gray-800/90 p-2 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
          aria-label="Przewiń w lewo"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 dark:bg-gray-800/90 p-2 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
          aria-label="Przewiń w prawo"
        >
          <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
      )}

      <div className="mb-4 flex items-center gap-1.5 overflow-x-auto px-1 pb-1 scrollbar-hide">
        {days.map((day, i) => (
          <button
            key={day.date}
            onClick={() => scrollToDay(i)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all cursor-pointer",
              activeDay === i
                ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
                : "bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
          >
            {t.day.day} {i + 1}
          </button>
        ))}
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollPaddingInline: "1rem" }}
      >
        {days.map((day, i) => (
          <div key={day.date} data-day-column className="snap-center">
            <DayColumn
              day={day}
              dayIndex={i}
              isActive={activeDay === i}
              onSelect={() => onDaySelect(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
