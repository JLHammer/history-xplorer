import { formatEntryYear } from "../../api/history";
import type { HistoryEntry } from "../../types/history";

type EventCardProps = {
  entry: HistoryEntry;
};

export const EventCard = ({ entry }: EventCardProps) => {
  const [primaryLink] = entry.links;

  return (
    <article>
      <h2>{formatEntryYear(entry.year)}</h2>
      {entry.text && <p>{entry.text}</p>}
      {primaryLink && (
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
