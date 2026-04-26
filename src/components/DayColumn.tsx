"use client";

import { useState } from "react";
import {
  Hotel,
  ChevronDown,
  ChevronUp,
  MapPin,
  DollarSign,
  Star,
} from "lucide-react";
import type { TripDay } from "@/types/trip";
import { categoryConfig } from "@/lib/categories";
import { EventCard } from "./EventCard";
import { cn, formatDate, calculateDayCost } from "@/lib/utils";
import { t } from "@/lib/i18n";

interface DayColumnProps {
  day: TripDay;
  dayIndex: number;
  isActive?: boolean;
  onSelect?: () => void;
}

export function DayColumn({ day, dayIndex, isActive, onSelect }: DayColumnProps) {
  const [showBonus, setShowBonus] = useState(false);
  const dayCost = calculateDayCost(day.events);

  return (
    <div
      className={cn(
        "flex w-[340px] shrink-0 flex-col rounded-2xl border transition-all duration-200",
        isActive
          ? "border-blue-300 dark:border-blue-600 shadow-lg shadow-blue-500/10"
          : "border-gray-200 dark:border-gray-700/60",
        "bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm"
      )}
    >
      <button
        onClick={onSelect}
        className={cn(
          "rounded-t-2xl px-5 py-4 text-left transition-colors cursor-pointer",
          isActive
            ? "bg-blue-50 dark:bg-blue-950/40"
            : "bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700/50"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400">
            {t.day.day} {dayIndex + 1}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {day.timezoneOffset}
          </span>
        </div>
        <h3 className="mt-1 text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
          {day.label.replace(/^Day \d+ - /, "")}
        </h3>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          {formatDate(day.date)}
        </p>
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span>{day.events.length} {t.day.events}</span>
          {dayCost && (
            <span className="flex items-center gap-0.5">
              <DollarSign className="h-3 w-3" />~{dayCost.amount}{" "}
              {dayCost.currency}
            </span>
          )}
        </div>
      </button>

      {day.accommodation && (
        <div className="mx-4 mt-3 flex items-center gap-2 rounded-lg bg-teal-50 dark:bg-teal-950/30 px-3 py-2">
          <Hotel className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          <div className="min-w-0">
            <p className="text-xs font-medium text-teal-700 dark:text-teal-300 truncate">
              {day.accommodation.name}
            </p>
            {(day.accommodation.checkIn || day.accommodation.checkOut) && (
              <p className="text-[11px] text-teal-600/70 dark:text-teal-400/70">
                {day.accommodation.checkIn &&
                  `${t.day.checkIn}: ${day.accommodation.checkIn}`}
                {day.accommodation.checkOut &&
                  ` ${t.day.checkOut}: ${day.accommodation.checkOut}`}
              </p>
            )}
          </div>
          {day.accommodation.googleMapsUrl && (
            <a
              href={day.accommodation.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto shrink-0"
            >
              <MapPin className="h-3.5 w-3.5 text-teal-500 hover:text-teal-700 cursor-pointer" />
            </a>
          )}
        </div>
      )}

      <div className="flex-1 space-y-2.5 overflow-y-auto p-4">
        {day.events.map((event) => (
          <EventCard key={event.id} event={event} compact />
        ))}
      </div>

      {day.bonusActivities && day.bonusActivities.length > 0 && (
        <div className="border-t border-gray-100 dark:border-gray-700/50 px-4 py-3">
          <button
            onClick={() => setShowBonus(!showBonus)}
            className="flex w-full items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 cursor-pointer hover:text-amber-700"
          >
            <Star className="h-4 w-4" />
            {day.bonusActivities.length} {t.day.bonusActivities}
            {showBonus ? (
              <ChevronUp className="ml-auto h-4 w-4" />
            ) : (
              <ChevronDown className="ml-auto h-4 w-4" />
            )}
          </button>
          {showBonus && (
            <div className="mt-2 space-y-2">
              {day.bonusActivities.map((bonus) => {
                const cat = categoryConfig[bonus.category];
                const BonusIcon = cat.icon;
                return (
                  <div
                    key={bonus.id}
                    className="flex items-start gap-2 rounded-lg border border-dashed border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/20 p-2.5"
                  >
                    <BonusIcon
                      className={cn("h-4 w-4 mt-0.5 shrink-0", cat.textColor)}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {bonus.title}
                      </p>
                      {bonus.description && (
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          {bonus.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {day.notes && (
        <div className="border-t border-gray-100 dark:border-gray-700/50 px-4 py-2.5">
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            {day.notes}
          </p>
        </div>
      )}
    </div>
  );
}
