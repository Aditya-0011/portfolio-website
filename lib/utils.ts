import { DateTime } from "luxon";

import {
  TechnologyCategory as Category,
  type TechnologyCategory,
} from "@/lib/objects";

export const getTechnologyCategoryLabel = (
  category: TechnologyCategory,
): string => {
  switch (category) {
    case Category.Frontend:
      return "Frontend";
    case Category.Backend:
      return "Backend";
    case Category.Db:
      return "Database";
    case Category.Language:
      return "Language";
    case Category.Tool:
      return "Tools";
    case Category.Academics:
      return "Academics";
    case Category.None:
      return "None";
    default:
      return "Invalid";
  }
};

export const formatMonthYear = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    return trimmed;
  }
  const parsed = DateTime.fromFormat(trimmed, "yyyy-MM", {
    zone: "utc",
    locale: "en-US",
  });
  if (!parsed.isValid) {
    return trimmed;
  }
  return parsed.toFormat("LLL''yy", { locale: "en-US" });
};

export const collator = new Intl.Collator("en", { sensitivity: "accent" });
