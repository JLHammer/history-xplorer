import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { ContentWrapper } from "../components/partials/ContentWrapper";
import { EventList } from "../components/partials/EventList";
import { InputField } from "../components/ui/InputField";
import { Message } from "../components/ui/Message";
import { entriesSince, parseEntryYear, todayDay } from "../api/history";

const MIN_YEAR = -9999;
const MAX_YEAR = new Date().getFullYear();

const toYearInput = (value: string) =>
  value
    .replace(/[^0-9abcde ]/gi, "")
    .toUpperCase()
    .slice(0, 8);

export const SincePage = () => {
  const [year, setYear] = useState("1947");

  const parsedYear = parseEntryYear(year);
  const isValidYear =
    parsedYear !== null && parsedYear >= MIN_YEAR && parsedYear <= MAX_YEAR;

  const { entries, error, loading } = useFetch(todayDay());

  const events =
    entries && (isValidYear ? entriesSince(entries, parsedYear) : entries);

  return (
    <ContentWrapper
      label="Since:"
      value={
        <InputField
          label="Year, for example 1947 or 500 BCE"
          type="text"
          maxLength={8}
          width={`${Math.max(4, year.length)}ch`}
          value={year}
          onChange={(event) => setYear(toYearInput(event.target.value))}
        />
      }
      description="What happened on this day - Here you can enter a specific year to get all the events that happened on this day, since that year"
    >
      {!isValidYear && (
        <Message>
          Showing all events — enter a year like 1947 or 500 BCE to filter
        </Message>
      )}
      <EventList entries={events} loading={loading} error={error} />
    </ContentWrapper>
  );
};
