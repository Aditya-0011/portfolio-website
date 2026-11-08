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

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const formatMonthYear = (value: string): string => {
  const trimmed = value.trim();
  const match = /^(\d{4})-(\d{2})$/.exec(trimmed);
  if (!match) {
    return trimmed;
  }
  const month = MONTHS[Number(match[2]) - 1];
  return month ? `${month}'${match[1].slice(2)}` : trimmed;
};

export const collator = new Intl.Collator("en", { sensitivity: "accent" });
