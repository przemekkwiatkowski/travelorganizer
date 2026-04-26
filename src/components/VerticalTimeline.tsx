"use client";

import { useState } from "react";
import {
  Hotel,
  MapPin,
  DollarSign,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  StickyNote,
} from "lucide-react";
import type { TripDay } from "@/types/trip";
import { categoryConfig } from "@/lib/categories";
import { EventCard } from "./EventCard";
import { cn, formatDate, formatDateLong, calculateDayCost } from "@/lib/utils";
import { t } from "@/lib/i18n";

interface VerticalTimelineProps {
  day: TripDay;
  dayIndex: number;
}

export function VerticalTimeline({ day, dayIndex }: VerticalTimelineProps) {
  const [showBonus, setShowBonus] = useState(false);
  const dayCost = calculateDayCost(day.events);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400">
          {t.day.day} {dayIndex + 1}
        </span>
        <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
          {day.label.replace(/^Day \d+ - /, "")}
        </h2>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {formatDateLong(day.date)}
          <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
          {day.timezoneOffset}
        </p>
        <div className="mt-2 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {day.events.length} {t.day.events}
          </span>
          {dayCost && (
            <span className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5" />~{dayCost.amount}{" "}
              {dayCost.currency}
            </span>
          )}
        </div>
      </div>

      {day.accommodation && (
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200/50 dark:border-teal-800/30 px-4 py-3">
          <Hotel className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-teal-800 dark:text-teal-200">
              {day.accommodation.name}
            </p>
            {day.accommodation.address && (
              <p className="text-sm text-teal-600/80 dark:text-teal-400/70">
                {day.accommodation.address}
              </p>
            )}
            {(day.accommodation.checkIn || day.accommodation.checkOut) && (
              <p className="text-xs text-teal-600/60 dark:text-teal-400/60 mt-0.5">
                {day.accommodation.checkIn &&
                  `${t.day.checkIn}: ${day.accommodation.checkIn}`}
                {day.accommodation.checkOut &&
                  ` | ${t.day.checkOut}: ${day.accommodation.checkOut}`}
              </p>
            )}
          </div>
          {day.accommodation.googleMapsUrl && (
            <a
              href={day.accommodation.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg bg-teal-100 dark:bg-teal-900/40 p-2 hover:bg-teal-200 dark:hover:bg-teal-800/50 transition-colors cursor-pointer"
            >
              <MapPin className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            </a>
          )}
        </div>
      )}

      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-4">
          {day.events.map((event, i) => {
            const cat = categoryConfig[event.category];
            return (
              <div key={event.id} className="relative flex gap-4">
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className="h-[38px] w-[38px] rounded-full border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center"
                    style={{ backgroundColor: cat.color }}
                  >
                    <span className="text-xs font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                </div>
                <div className="flex-1 pb-2">
                  <EventCard event={event} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {day.bonusActivities && day.bonusActivities.length > 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-amber-300 dark:border-amber-700/50 bg-amber-50/50 dark:bg-amber-950/20 p-4">
          <button
            onClick={() => setShowBonus(!showBonus)}
            className="flex w-full items-center gap-2 text-base font-semibold text-amber-700 dark:text-amber-400 cursor-pointer"
          >
            <Star className="h-5 w-5" />
            {t.day.bonusActivities} ({day.bonusActivities.length})
            {showBonus ? (
              <ChevronUp className="ml-auto h-5 w-5" />
            ) : (
              <ChevronDown className="ml-auto h-5 w-5" />
            )}
          </button>
          {showBonus && (
            <div className="mt-3 space-y-3">
              {day.bonusActivities.map((bonus) => {
                const cat = categoryConfig[bonus.category];
                const BonusIcon = cat.icon;
                return (
                  <div
                    key={bonus.id}
                    className="flex items-start gap-3 rounded-lg bg-white/60 dark:bg-gray-800/40 p-3"
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        cat.bgLight,
                        cat.bgDark
                      )}
                    >
                      <BonusIcon
                        className={cn("h-4 w-4", cat.textColor)}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {bonus.title}
                      </p>
                      {bonus.description && (
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                          {bonus.description}
                        </p>
                      )}
                      {bonus.location?.googleMapsUrl && (
                        <a
                          href={bonus.location.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 cursor-pointer"
                        >
                          <MapPin className="h-3 w-3" />
                          {t.map.viewOnMap}
                        </a>
                      )}
                    </div>
                    {bonus.photo && (
                      <img
                        src={bonus.photo}
                        alt={bonus.title}
                        className="ml-auto h-16 w-20 shrink-0 rounded-lg object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {day.notes && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 px-4 py-3">
          <StickyNote className="h-4 w-4 mt-0.5 text-gray-400 shrink-0" />
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            {day.notes}
          </p>
        </div>
      )}
    </div>
  );
}
