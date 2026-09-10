import type { HistoryEntry, HistoryLink } from "../types/history";

const BASE_URL = "https://history.muffinlabs.com";

export const todayUrl = () => `${BASE_URL}/date`;

export const byDateUrl = (month: number, day: number) =>
  `${BASE_URL}/date/${month}/${day}`;

export const sinceUrl = () => todayUrl();

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
