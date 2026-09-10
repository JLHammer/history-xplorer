import { Message } from "../ui/Message";
import type { HistoryEntry } from "../../types/history";
import { EventCard } from "../ui/EventCard";

type EventListProps = {
  entries: HistoryEntry[] | null;
  loading: boolean;
  error: string | null;
};

export const EventList = ({ entries, loading, error }: EventListProps) => {
  if (error) {
    return <Message role="alert">Could not load events — {error}</Message>;
  }

  // Entries from the previous date stay up while the next ones load, so the
  // loading message only shows when there is nothing to look at yet
  if (!entries) {
    return loading ? <Message>Loading…</Message> : null;
  }

  if (entries.length === 0) {
    return <Message>No events found.</Message>;
  }

  return (
    <ul>
      {entries.map((entry) => (
        // The year repeats within a date and the text can be absent, so the
        // rendered html is what reliably tells two entries apart
        <li key={entry.html}>
          <EventCard entry={entry} />
        </li>
      ))}
    </ul>
  );
};
