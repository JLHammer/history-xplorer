import type { HistoryEntry, HistoryLink } from "../types/history";

const BASE_URL = "https://history.muffinlabs.com";

export const todayUrl = () => `${BASE_URL}/date`;

export const byDateUrl = (month: number, day: number) =>
  `${BASE_URL}/date/${month}/${day}`;

export const sinceUrl = () => todayUrl();

export const parseEntryYear = (year: string) => {
  const value = Number.parseInt(year, 10);

  if (Number.isNaN(value)) return null;

  return /bce?$/i.test(year) ? -value : value;
};

export const formatEntryYear = (year: string) =>
  year.replace(/\s*(bce|bc|ce|ad)$/i, (_match, era: string) =>
    /^b/i.test(era) ? " BCE" : "",
  );

export const entriesWithYear = (entries: HistoryEntry[]) =>
  entries.filter((entry) => parseEntryYear(entry.year) !== null);

export const entriesSince = (entries: HistoryEntry[], year: number) =>
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
