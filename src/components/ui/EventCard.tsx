import { formatDate, formatEntryYear } from "../../api/history";
import { TimelineItem } from "../partials/Timeline";
import type { DayOfYear } from "../../api/history";
import type { HistoryEntry } from "../../types/history";

type EventCardProps = {
  entry: HistoryEntry & Partial<DayOfYear>;
};

export const EventCard = ({ entry }: EventCardProps) => {
  const [primaryLink] = entry.links;

  const year = formatEntryYear(entry.year);
  const { month, day } = entry;

  return (
    <TimelineItem
      label={
        month && day
          ? formatDate({ month, day }, `year ${year}`)
          : `Year ${year}`
      }
      text={entry.text}
      link={primaryLink && { href: primaryLink.link, title: primaryLink.title }}
    />
  );
};
