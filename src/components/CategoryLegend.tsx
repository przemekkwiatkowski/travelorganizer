"use client";

import { categoryConfig } from "@/lib/categories";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/trip";

interface CategoryLegendProps {
  activeCategories?: Category[];
}

export function CategoryLegend({ activeCategories }: CategoryLegendProps) {
  const categories = Object.entries(categoryConfig) as [
    Category,
    (typeof categoryConfig)[Category],
  ][];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map(([key, cat]) => {
        const Icon = cat.icon;
        const active = !activeCategories || activeCategories.includes(key);
        return (
          <span
            key={key}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-opacity",
              cat.bgLight,
              cat.bgDark,
              cat.textColor,
              !active && "opacity-30"
            )}
          >
            <Icon className="h-3 w-3" />
            {cat.label}
          </span>
        );
      })}
    </div>
  );
}
