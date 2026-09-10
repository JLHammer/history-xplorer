import { useState } from "react";
import { Message } from "../ui/Message";
import { EventCard } from "../ui/EventCard";
import { Timeline } from "./Timeline";
import type { HistoryEntry } from "../../types/history";
import type { DayOfYear } from "../../api/history";

type Entry = HistoryEntry & Partial<DayOfYear>;

type EventListProps = {
  entries: Entry[] | null;
  loading: boolean;
  error: string | null;
  progress?: { loaded: number; total: number };
};

const BATCH = 15;

export const EventList = ({
  entries,
  loading,
  error,
  progress,
}: EventListProps) => {
  const [revealed, setRevealed] = useState({ of: entries, count: BATCH });

  const count = revealed.of === entries ? revealed.count : BATCH;

  const revealMore = () => setRevealed({ of: entries, count: count + BATCH });

  if (error) {
    return <Message role="alert">Could not load events — {error}</Message>;
  }

  const loadingMessage =
    progress && progress.total > 1
      ? `Loading ${progress.loaded} of ${progress.total} days…`
      : "Loading…";

  if (!entries) {
    return loading ? (
      <Message aria-live="polite">{loadingMessage}</Message>
    ) : null;
  }

  if (entries.length === 0) {
    return <Message>No events found.</Message>;
  }

  return (
    <>
      {loading && progress && progress.total > 1 && (
        <Message aria-live="polite">{loadingMessage}</Message>
      )}
      <Timeline hasMore={count < entries.length} onMore={revealMore}>
        {entries.slice(0, count).map((entry) => (
          <EventCard
            key={`${entry.month}/${entry.day}:${entry.html}`}
            entry={entry}
          />
        ))}
      </Timeline>
    </>
  );
};
