export type Category =
  | "sightseeing"
  | "museum"
  | "food"
  | "transport"
  | "accommodation"
  | "shopping"
  | "entertainment"
  | "walk"
  | "photo-spot";

export interface TripEvent {
  id: string;
  title: string;
  category: Category;
  description?: string;
  startTime?: string; // HH:mm format in local time
  endTime?: string;
  isFlexible?: boolean; // loosely planned, no fixed time
  location?: {
    name: string;
    address?: string;
    lat?: number;
    lng?: number;
    googleMapsUrl?: string;
  };
  photo?: string; // URL
  notes?: string;
  cost?: {
    amount: number;
    currency: string;
  };
  links?: { label: string; url: string }[];
  tags?: string[];
}

export interface BonusActivity {
  id: string;
  title: string;
  category: Category;
  description?: string;
  location?: {
    name: string;
    address?: string;
    googleMapsUrl?: string;
  };
  photo?: string;
}

export interface TripDay {
  date: string; // YYYY-MM-DD
  label: string; // e.g. "Day 1 - Arrival"
  timezone: string; // e.g. "America/New_York"
  timezoneOffset: string; // e.g. "UTC-5"
  accommodation?: {
    name: string;
    address?: string;
    checkIn?: string;
    checkOut?: string;
    photo?: string;
    googleMapsUrl?: string;
    confirmationCode?: string;
  };
  events: TripEvent[];
  bonusActivities?: BonusActivity[];
  notes?: string;
}

export interface TripData {
  trip: {
    name: string;
    destination: string;
    country: string;
    startDate: string;
    endDate: string;
    homeTimezone: string;
    destinationTimezone: string;
    coverPhoto?: string;
    travelers?: string[];
    description?: string;
  };
  days: TripDay[];
  globalBonusActivities?: BonusActivity[];
}
