import { Message } from "../ui/Message";
import { EventCard } from "../ui/EventCard";
import type { HistoryEntry } from "../../types/history";
import type { DayOfYear } from "../../api/history";

type Entry = HistoryEntry & Partial<DayOfYear>;

type EventListProps = {
  entries: Entry[] | null;
  loading: boolean;
  error: string | null;
  progress?: { loaded: number; total: number };
};

export const EventList = ({
  entries,
  loading,
  error,
  progress,
}: EventListProps) => {
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
      <ul>
        {entries.map((entry) => (
          <li key={`${entry.month}/${entry.day}:${entry.html}`}>
            <EventCard entry={entry} />
          </li>
        ))}
      </ul>
    </>
  );
};
