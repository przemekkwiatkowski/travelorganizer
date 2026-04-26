"use client";

import { useEffect, useRef } from "react";
import { X, Navigation, ExternalLink } from "lucide-react";
import { t } from "@/lib/i18n";

interface MapModalProps {
  location: {
    name: string;
    address?: string;
    lat?: number;
    lng?: number;
    googleMapsUrl?: string;
  };
  title: string;
  onClose: () => void;
}

export function MapModal({ location, title, onClose }: MapModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const mapsUrl =
    location.googleMapsUrl ??
    (location.lat && location.lng
      ? `https://www.google.com/maps?q=${location.lat},${location.lng}`
      : `https://www.google.com/maps/search/${encodeURIComponent(location.name)}`);

  const embedQuery =
    location.lat && location.lng
      ? `${location.lat},${location.lng}`
      : location.address ?? location.name;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-5 py-3.5">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            {location.address && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {location.address}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            aria-label={t.map.closeMap}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="aspect-video bg-gray-100 dark:bg-gray-900">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(embedQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Mapa: ${location.name}`}
          />
        </div>

        <div className="flex items-center gap-3 px-5 py-3 border-t border-gray-200 dark:border-gray-700">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors cursor-pointer"
          >
            <Navigation className="h-4 w-4" />
            {t.map.openInGoogleMaps}
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <ExternalLink className="h-4 w-4" />
            {t.map.getDirections}
          </a>
        </div>
      </div>
    </div>
  );
}
