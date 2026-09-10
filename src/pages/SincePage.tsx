import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { ContentWrapper } from "../components/partials/ContentWrapper";
import { EventList } from "../components/partials/EventList";
import { InputField } from "../components/ui/InputField";
import { Message } from "../components/ui/Message";
import { historyResponseSchema } from "../types/history";
import {
  entriesSince,
  entriesWithYear,
  parseEntryYear,
  sinceUrl,
} from "../api/history";

// The oldest entries the API returns are a few thousand years BCE
const MIN_YEAR = -9999;
const MAX_YEAR = new Date().getFullYear();

// Digits plus the letters and space for every era the API uses: BC, BCE, AD, CE
const toYearInput = (value: string) =>
  value
    .replace(/[^0-9abcde ]/gi, "")
    .toUpperCase()
    .slice(0, 8);

export const SincePage = () => {
  const [year, setYear] = useState("1947");

  // Same interpretation the entries themselves get, so a BCE year lines up
  // with the API's equivalent BC entries
  const parsedYear = parseEntryYear(year);
  const isValidYear =
    parsedYear !== null && parsedYear >= MIN_YEAR && parsedYear <= MAX_YEAR;

  const { data, error, loading } = useFetch(sinceUrl(), {
    schema: historyResponseSchema,
  });

  // An unusable year falls back to the full list rather than emptying it while
  // a year is still being typed, since "19" is on the way to "1947"
  const events =
    data &&
    (isValidYear
      ? entriesSince(data.data.Events, parsedYear)
      : entriesWithYear(data.data.Events));

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
