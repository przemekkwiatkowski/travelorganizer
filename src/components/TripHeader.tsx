"use client";

import {
  Plane,
  Calendar,
  MapPin,
  Users,
  Clock,
  Download,
  Upload,
  Sun,
  Moon,
} from "lucide-react";
import type { TripData } from "@/types/trip";
import { formatDate, getTimezoneShift } from "@/lib/utils";

interface TripHeaderProps {
  trip: TripData["trip"];
  totalDays: number;
  darkMode: boolean;
  onToggleDark: () => void;
  onExport: () => void;
  onImport: () => void;
}

export function TripHeader({
  trip,
  totalDays,
  darkMode,
  onToggleDark,
  onExport,
  onImport,
}: TripHeaderProps) {
  const tzShift = getTimezoneShift(trip.homeTimezone, trip.destinationTimezone);

  return (
    <header className="relative overflow-hidden">
      {trip.coverPhoto && (
        <div className="absolute inset-0">
          <img
            src={trip.coverPhoto}
            alt={trip.destination}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
      )}

      <div className="relative px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-white/15 backdrop-blur-md p-2">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white/80">
              TravelOrganizer
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onImport}
              className="flex items-center gap-1.5 rounded-lg bg-white/15 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition-colors cursor-pointer"
            >
              <Upload className="h-3.5 w-3.5" />
              Import
            </button>
            <button
              onClick={onExport}
              className="flex items-center gap-1.5 rounded-lg bg-white/15 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
            <button
              onClick={onToggleDark}
              className="rounded-lg bg-white/15 backdrop-blur-md p-2 text-white hover:bg-white/25 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 max-w-3xl">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl tracking-tight">
            {trip.name}
          </h1>
          {trip.description && (
            <p className="mt-2 text-base text-white/70 sm:text-lg max-w-xl">
              {trip.description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {trip.destination}, {trip.country}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {totalDays} days
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {tzShift} from home
              </span>
            </span>
            {trip.travelers && trip.travelers.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {trip.travelers.join(", ")}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
