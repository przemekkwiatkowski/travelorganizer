"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import type { TripEvent } from "@/types/trip";
import { categoryConfig } from "@/lib/categories";
import { cn, formatTime } from "@/lib/utils";
import { MapModal } from "./MapModal";

interface EventCardProps {
  event: TripEvent;
  compact?: boolean;
}

export function EventCard({ event, compact }: EventCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const cat = categoryConfig[event.category];
  const Icon = cat.icon;

  return (
    <>
      <div
        className={cn(
          "group relative rounded-xl border border-gray-200 dark:border-gray-700/60",
          "bg-white dark:bg-gray-800/80 backdrop-blur-sm",
          "transition-all duration-200 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600",
          "hover:-translate-y-0.5",
          compact ? "p-3" : "p-4"
        )}
      >
        {event.isFlexible && (
          <div className="absolute -top-2 right-3 flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-300">
            <Sparkles className="h-3 w-3" />
            Flexible
          </div>
        )}

        <div className="flex gap-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              cat.bgLight,
              cat.bgDark
            )}
          >
            <Icon className={cn("h-[18px] w-[18px]", cat.textColor)} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h4
                className={cn(
                  "font-semibold text-gray-900 dark:text-gray-100 leading-tight",
                  compact ? "text-sm" : "text-[15px]"
                )}
              >
                {event.title}
              </h4>
              {event.cost && (
                <span className="flex shrink-0 items-center gap-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <DollarSign className="h-3 w-3" />
                  {event.cost.amount}
                </span>
              )}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              {(event.startTime || event.endTime) && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {event.startTime && formatTime(event.startTime)}
                  {event.endTime && ` – ${formatTime(event.endTime)}`}
                </span>
              )}
              {event.location && (
                <button
                  onClick={() => setMapOpen(true)}
                  className="flex items-center gap-1 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <MapPin className="h-3 w-3" />
                  <span className="truncate max-w-[140px]">
                    {event.location.name}
                  </span>
                </button>
              )}
              <span className={cn("font-medium", cat.textColor)}>
                {cat.label}
              </span>
            </div>

            {event.photo && !compact && (
              <div className="mt-2.5 overflow-hidden rounded-lg">
                <img
                  src={event.photo}
                  alt={event.title}
                  className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            {event.description && !compact && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                {event.description}
              </p>
            )}

            {(event.notes || event.links) && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 flex items-center gap-1 text-xs font-medium text-blue-500 dark:text-blue-400 cursor-pointer hover:text-blue-600"
              >
                {expanded ? (
                  <>
                    Less <ChevronUp className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    More <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </button>
            )}

            {expanded && (
              <div className="mt-2 space-y-2 text-sm">
                {event.notes && (
                  <p className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-2.5 text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                    {event.notes}
                  </p>
                )}
                {event.links?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-600"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
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
