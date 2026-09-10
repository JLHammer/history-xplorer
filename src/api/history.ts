import type { HistoryEntry, HistoryLink } from "../types/history";

const BASE_URL = "https://history.muffinlabs.com";

export const byDateUrl = (month: number, day: number) =>
  `${BASE_URL}/date/${month}/${day}`;

export type DayOfYear = {
  month: number;
  day: number;
};

export const todayDay = (): DayOfYear => {
  const now = new Date();

  return { month: now.getMonth() + 1, day: now.getDate() };
};

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const lastDayOf = (month: number) => DAYS_IN_MONTH[month - 1];

export const hasLeapDay = (year: number) => {
  const astronomical = year < 0 ? year + 1 : year;

  if (astronomical % 4 !== 0) return false;

  return year < 1583 || astronomical % 100 !== 0 || astronomical % 400 === 0;
};

export const daysOf = (month?: number, leapDay = true): DayOfYear[] => {
  const months = month ? [month] : DAYS_IN_MONTH.map((_, index) => index + 1);

  return months.flatMap((current) => {
    const length =
      current === 2 && !leapDay
        ? DAYS_IN_MONTH[1] - 1
        : DAYS_IN_MONTH[current - 1];

    return Array.from({ length }, (_, index) => ({
      month: current,
      day: index + 1,
    }));
  });
};

export const formatDay = ({ month, day }: DayOfYear) =>
  `${MONTH_NAMES[month - 1]} ${day}`;

export const formatDate = ({ month, day }: DayOfYear, year: string | number) =>
  `${MONTH_NAMES[month - 1]} ${day}, ${year}`;

const stripFootnotes = (year: string) => year.replace(/\[\d+\]/g, "").trim();

export const parseEntryYear = (year: string) => {
  const cleaned = stripFootnotes(year);
  const value = Number.parseInt(cleaned, 10);

  if (Number.isNaN(value)) return null;

  return /bce?$/i.test(cleaned) ? -value : value;
};

export const formatEntryYear = (year: string) =>
  stripFootnotes(year).replace(/\s*(bce|bc|ce|ad)$/i, (_match, era: string) =>
    /^b/i.test(era) ? " BCE" : "",
  );

const LEAKED_ENTRY = /^(\d+)(?:\s*[-–—─]\s*|\s+)(\S+\s+\S.*)$/s;

export const unleakEntry = <T extends HistoryEntry>(entry: T): T => {
  if (entry.text !== null) return entry;

  const match = LEAKED_ENTRY.exec(entry.year);

  if (!match) return entry;

  return { ...entry, year: match[1], text: match[2] };
};

export const entriesWithYear = (entries: HistoryEntry[]) =>
  entries.filter((entry) => parseEntryYear(entry.year) !== null);

export const entriesInYear = <T extends HistoryEntry>(
  entries: T[],
  year: number,
) => entries.filter((entry) => parseEntryYear(entry.year) === year);

export const entriesSince = <T extends HistoryEntry>(
  entries: T[],
  year: number,
) =>
  entries.filter((entry) => {
    const entryYear = parseEntryYear(entry.year);

    return entryYear !== null && entryYear >= year;
  });

export const uniqueLinks = (links: HistoryLink[]) => {
  const seen = new Set<string>();

  return links.filter((link) => {
    if (seen.has(link.link)) return false;

    seen.add(link.link);

    return true;
  });
};
