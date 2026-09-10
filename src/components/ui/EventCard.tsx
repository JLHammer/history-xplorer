import { formatEntryYear } from "../../api/history";
import type { HistoryEntry } from "../../types/history";

type EventCardProps = {
  entry: HistoryEntry;
};

export const EventCard = ({ entry }: EventCardProps) => {
  // An entry links every subject its text mentions, which is up to a dozen
  // "Read more" in a row saying nothing different. The first is the one the
  // entry is actually about, so the card follows that and drops the rest.
  const [primaryLink] = entry.links;

  return (
    <article>
      <h2>{formatEntryYear(entry.year)}</h2>
      {/* A handful of entries per date come back without text, so the year and
          its link are all there is to show for those */}
      {entry.text && <p>{entry.text}</p>}
      {primaryLink && (
        // The label is the same on every card, so the subject it points at
        // goes to the accessible name instead
        <a
          href={primaryLink.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read more about ${primaryLink.title}`}
        >
          Read more
        </a>
      )}
    </article>
  );
};
