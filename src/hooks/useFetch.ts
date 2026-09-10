import { useEffect, useState } from "react";
import { z } from "zod";
import {
  byDateUrl,
  daysOf,
  entriesWithYear,
  formatDay,
  unleakEntry,
} from "../api/history";
import { historyResponseSchema } from "../types/history";
import type { DayOfYear } from "../api/history";
import type { HistoryEntry } from "../types/history";

export type DatedEntry = HistoryEntry & DayOfYear;

export type DayScope = {
  month?: number;
  day?: number;
  leapDay?: boolean;
};

type DaysResult = {
  key: string;
  entries: DatedEntry[] | null;
  error: string | null;
};

type Progress = {
  key: string;
  loaded: number;
};

const CONCURRENCY = 6;

const dayCache = new Map<string, Promise<HistoryEntry[]>>();

const keyOf = ({ month, day }: DayOfYear) => `${month}/${day}`;

const scopeKey = ({ month, day, leapDay = true }: DayScope) => {
  const skipsLeapDay = !leapDay && !day && (!month || month === 2);

  return `${month ?? ""}/${day ?? ""}${skipsLeapDay ? "/short" : ""}`;
};

const daysIn = (key: string) => {
  const [month, day, flag] = key.split("/");
  const monthNumber = Number.parseInt(month, 10) || undefined;
  const dayNumber = Number.parseInt(day, 10);

  return dayNumber
    ? [{ month: monthNumber as number, day: dayNumber }]
    : daysOf(monthNumber, flag !== "short");
};

const fetchDay = async (date: DayOfYear) => {
  const response = await fetch(byDateUrl(date.month, date.day));

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const parsed = historyResponseSchema.safeParse(await response.json());

  if (!parsed.success) {
    throw new Error(z.prettifyError(parsed.error));
  }

  return entriesWithYear(parsed.data.data.Events.map(unleakEntry));
};

const loadDay = (date: DayOfYear) => {
  const key = keyOf(date);
  const cached = dayCache.get(key);

  if (cached) return cached;

  const pending = fetchDay(date).catch((caught: unknown) => {
    dayCache.delete(key);

    throw new Error(
      `${formatDay(date)}: ${caught instanceof Error ? caught.message : "Unknown error"}`,
    );
  });

  dayCache.set(key, pending);

  return pending;
};

const loadDays = async (
  days: DayOfYear[],
  onLoaded: (loaded: number) => void,
  isCancelled: () => boolean,
) => {
  const entries: HistoryEntry[][] = [];
  let next = 0;
  let loaded = 0;

  const work = async () => {
    while (next < days.length && !isCancelled()) {
      const index = next++;

      entries[index] = await loadDay(days[index]);
      loaded++;
      onLoaded(loaded);
    }
  };

  await Promise.all(Array.from({ length: CONCURRENCY }, work));

  return days.flatMap((date, index) =>
    entries[index].map((entry) => ({ ...entry, ...date })),
  );
};

export const useFetch = (scope: DayScope | null) => {
  const key = scope && scopeKey(scope);

  const [result, setResult] = useState<DaysResult | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    if (!key) return;

    const requestKey = key;
    let cancelled = false;

    loadDays(
      daysIn(requestKey),
      (loaded) => {
        if (!cancelled) setProgress({ key: requestKey, loaded });
      },
      () => cancelled,
    )
      .then((entries) => {
        if (!cancelled) setResult({ key: requestKey, entries, error: null });
      })
      .catch((caught: unknown) => {
        if (cancelled) return;

        setResult({
          key: requestKey,
          entries: null,
          error: caught instanceof Error ? caught.message : "Unknown error",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  const loading = key !== null && result?.key !== key;

  return {
    entries: result?.entries ?? null,
    error: result?.error ?? null,
    loading,
    loaded: progress?.key === key ? progress.loaded : 0,
    total: key ? daysIn(key).length : 0,
  };
};
