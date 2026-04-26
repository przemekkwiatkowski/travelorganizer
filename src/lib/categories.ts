import {
  Camera,
  UtensilsCrossed,
  Train,
  Hotel,
  ShoppingBag,
  Music,
  Footprints,
  Landmark,
  Palette,
} from "lucide-react";
import type { Category } from "@/types/trip";
import type { LucideIcon } from "lucide-react";
import { t } from "./i18n";

interface CategoryConfig {
  label: string;
  icon: LucideIcon;
  color: string;
  bgLight: string;
  bgDark: string;
  textColor: string;
}

export const categoryConfig: Record<Category, CategoryConfig> = {
  sightseeing: {
    label: t.categories.sightseeing,
    icon: Landmark,
    color: "#3b82f6",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-950/40",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  museum: {
    label: t.categories.museum,
    icon: Palette,
    color: "#8b5cf6",
    bgLight: "bg-violet-50",
    bgDark: "dark:bg-violet-950/40",
    textColor: "text-violet-600 dark:text-violet-400",
  },
  food: {
    label: t.categories.food,
    icon: UtensilsCrossed,
    color: "#f97316",
    bgLight: "bg-orange-50",
    bgDark: "dark:bg-orange-950/40",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  transport: {
    label: t.categories.transport,
    icon: Train,
    color: "#6b7280",
    bgLight: "bg-gray-50",
    bgDark: "dark:bg-gray-800/40",
    textColor: "text-gray-600 dark:text-gray-400",
  },
  accommodation: {
    label: t.categories.accommodation,
    icon: Hotel,
    color: "#14b8a6",
    bgLight: "bg-teal-50",
    bgDark: "dark:bg-teal-950/40",
    textColor: "text-teal-600 dark:text-teal-400",
  },
  shopping: {
    label: t.categories.shopping,
    icon: ShoppingBag,
    color: "#ec4899",
    bgLight: "bg-pink-50",
    bgDark: "dark:bg-pink-950/40",
    textColor: "text-pink-600 dark:text-pink-400",
  },
  entertainment: {
    label: t.categories.entertainment,
    icon: Music,
    color: "#eab308",
    bgLight: "bg-yellow-50",
    bgDark: "dark:bg-yellow-950/40",
    textColor: "text-yellow-600 dark:text-yellow-400",
  },
  walk: {
    label: t.categories.walk,
    icon: Footprints,
    color: "#22c55e",
    bgLight: "bg-green-50",
    bgDark: "dark:bg-green-950/40",
    textColor: "text-green-600 dark:text-green-400",
  },
  "photo-spot": {
    label: t.categories["photo-spot"],
    icon: Camera,
    color: "#e11d48",
    bgLight: "bg-rose-50",
    bgDark: "dark:bg-rose-950/40",
    textColor: "text-rose-600 dark:text-rose-400",
  },
};
