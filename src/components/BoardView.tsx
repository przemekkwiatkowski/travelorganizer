"use client";

import { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  DollarSign,
  MapPin,
  Sparkles,
  Star,
  Hotel,
  GripVertical,
  StickyNote,
} from "lucide-react";
import type { TripDay, TripEvent } from "@/types/trip";
import { categoryConfig } from "@/lib/categories";
import { cn, formatDate, calculateDayCost } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { MapModal } from "./MapModal";

interface BoardViewProps {
  days: TripDay[];
}

export function BoardView({ days }: BoardViewProps) {
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
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  }

  const totalCost = days.reduce((sum, day) => {
    const dayCost = calculateDayCost(day.events);
    return sum + (dayCost?.amount ?? 0);
  }, 0);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {t.board.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.board.subtitle}
          </p>
        </div>
        {totalCost > 0 && (
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200/50 dark:border-green-800/30 px-4 py-2">
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              {t.board.totalCost}
            </p>
            <p className="text-lg font-bold text-green-700 dark:text-green-300">
              ${totalCost}
            </p>
          </div>
        )}
      </div>

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

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {days.map((day, i) => (
            <BoardColumn key={day.date} day={day} dayIndex={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BoardColumn({ day, dayIndex }: { day: TripDay; dayIndex: number }) {
  const [showBonus, setShowBonus] = useState(false);
  const dayCost = calculateDayCost(day.events);

  return (
    <div className="flex w-[300px] shrink-0 flex-col rounded-2xl bg-gray-100/80 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/30">
      <div className="rounded-t-2xl px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/30">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400">
            {t.day.day} {dayIndex + 1}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(day.date)}
          </span>
        </div>
        <h3 className="mt-0.5 text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight truncate">
          {day.label.replace(/^Day \d+ - /, "")}
        </h3>
        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
          <span>{day.events.length} {t.day.events}</span>
          {dayCost && (
            <span className="flex items-center gap-0.5">
              <DollarSign className="h-3 w-3" />{dayCost.amount} {dayCost.currency}
            </span>
          )}
          <span>{day.timezoneOffset}</span>
        </div>
      </div>

      {day.accommodation && (
        <div className="mx-3 mt-2 flex items-center gap-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/30 px-2 py-1.5">
          <Hotel className="h-3 w-3 text-teal-600 dark:text-teal-400 shrink-0" />
          <span className="text-[11px] font-medium text-teal-700 dark:text-teal-300 truncate">
            {day.accommodation.name}
          </span>
        </div>
      )}

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {day.events.map((event) => (
          <BoardCard key={event.id} event={event} />
        ))}
      </div>

      {day.bonusActivities && day.bonusActivities.length > 0 && (
        <div className="border-t border-gray-200/50 dark:border-gray-700/30 px-3 py-2">
          <button
            onClick={() => setShowBonus(!showBonus)}
            className="flex w-full items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 cursor-pointer"
          >
            <Star className="h-3.5 w-3.5" />
            {day.bonusActivities.length} {t.day.bonusActivities}
            {showBonus ? (
              <ChevronUp className="ml-auto h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="ml-auto h-3.5 w-3.5" />
            )}
          </button>
          {showBonus && (
            <div className="mt-1.5 space-y-1.5">
              {day.bonusActivities.map((bonus) => {
                const cat = categoryConfig[bonus.category];
                const BonusIcon = cat.icon;
                return (
                  <div
                    key={bonus.id}
                    className="flex items-center gap-2 rounded-lg border border-dashed border-amber-300/50 dark:border-amber-700/30 bg-amber-50/50 dark:bg-amber-950/20 px-2.5 py-2"
                  >
                    <BonusIcon className={cn("h-3.5 w-3.5 shrink-0", cat.textColor)} />
                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                      {bonus.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {day.notes && (
        <div className="border-t border-gray-200/50 dark:border-gray-700/30 px-3 py-2 flex items-start gap-1.5">
          <StickyNote className="h-3 w-3 mt-0.5 text-gray-400 shrink-0" />
          <p className="text-[11px] text-gray-500 dark:text-gray-400 italic line-clamp-2">
            {day.notes}
          </p>
        </div>
      )}
    </div>
  );
}

function BoardCard({ event }: { event: TripEvent }) {
  const [mapOpen, setMapOpen] = useState(false);
  const cat = categoryConfig[event.category];
  const Icon = cat.icon;

  return (
    <>
      <div
        className={cn(
          "group rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/50",
          "p-2.5 transition-all duration-150",
          "hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-0.5 cursor-grab active:cursor-grabbing"
        )}
      >
        <div className="flex items-start gap-2">
          <div className="flex items-center gap-1.5 mt-0.5">
            <GripVertical className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div
              className="h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: cat.color }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-1">
              <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                {event.title}
              </h4>
              {event.isFlexible && (
                <Sparkles className="h-3 w-3 shrink-0 text-amber-500" />
              )}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-gray-500 dark:text-gray-400">
              {event.startTime && (
                <span className="flex items-center gap-0.5">
                  <Clock className="h-2.5 w-2.5" />
                  {event.startTime}
                  {event.endTime && `–${event.endTime}`}
                </span>
              )}
              {event.cost && (
                <span className="flex items-center gap-0.5">
                  <DollarSign className="h-2.5 w-2.5" />
                  {event.cost.amount}
                </span>
              )}
            </div>

            <div className="mt-1.5 flex items-center justify-between">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                  cat.bgLight,
                  cat.bgDark,
                  cat.textColor
                )}
              >
                <Icon className="h-2.5 w-2.5" />
                {cat.label}
              </span>
              {event.location && (
                <button
                  onClick={() => setMapOpen(true)}
                  className="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
                >
                  <MapPin className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {mapOpen && event.location && (
        <MapModal
          location={event.location}
          title={event.title}
          onClose={() => setMapOpen(false)}
        />
      )}
    </>
  );
}
