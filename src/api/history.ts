import type { HistoryEntry, HistoryLink } from "../types/history";

const BASE_URL = "https://history.muffinlabs.com";

export const todayUrl = () => `${BASE_URL}/date`;

export const byDateUrl = (month: number, day: number) =>
  `${BASE_URL}/date/${month}/${day}`;

// Since clientside calculated from current date (API does not provide endpoint for it)
export const sinceUrl = () => todayUrl();

// The API writes eras as BC/AD, so both are still recognised here. Everything
// the app shows or accepts uses the neutral BCE/CE instead, see formatEntryYear.
export const parseEntryYear = (year: string) => {
  const value = Number.parseInt(year, 10);

  if (Number.isNaN(value)) return null;

  // End-anchored so a stray "bc" inside leaked entry text cannot flip the sign,
  // but without \b so typed input like "500bce" still counts as before year 0
  return /bce?$/i.test(year) ? -value : value;
};

// Only years before the common era carry a suffix, matching the bare years the
// API sends for everything after it, so "45 BC" renders as "45 BCE". A trailing
// CE or AD is stripped rather than assumed absent; anything else passes through.
export const formatEntryYear = (year: string) =>
  year.replace(/\s*(bce|bc|ce|ad)$/i, (_match, era: string) =>
    /^b/i.test(era) ? " BCE" : "",
  );

// The API sometimes leaks a whole entry into the year field, which reads as
// broken wherever it is rendered, so those entries are dropped everywhere
export const entriesWithYear = (entries: HistoryEntry[]) =>
  entries.filter((entry) => parseEntryYear(entry.year) !== null);

export const entriesSince = (entries: HistoryEntry[], year: number) =>
  entries.filter((entry) => {
    const entryYear = parseEntryYear(entry.year);

    return entryYear !== null && entryYear >= year;
  });

// A subject named twice in one entry is linked twice, always with the same
// title, so the repeats are dropped rather than rendered as duplicate links
export const uniqueLinks = (links: HistoryLink[]) => {
  const seen = new Set<string>();

  return links.filter((link) => {
    if (seen.has(link.link)) return false;

    seen.add(link.link);

    return true;
  });
};
