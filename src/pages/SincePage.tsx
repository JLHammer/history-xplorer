import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useYearOptions } from "../hooks/useYearOptions";
import { ContentWrapper } from "../components/partials/ContentWrapper";
import { EventList } from "../components/partials/EventList";
import { PickerField } from "../components/ui/PickerField";
import { YearStepper } from "../components/ui/YearStepper";
import { Message } from "../components/ui/Message";
import { entriesSince, todayDay } from "../api/history";
import {
  CURRENT_YEAR,
  ERA_OPTIONS,
  eraOf,
  maxYearIn,
  signYear,
  toYearInput,
  unsignYear,
} from "../utils/era";
import type { Era } from "../utils/era";

const MIN_SIGNED_YEAR = -maxYearIn("BCE");

const clampYear = (year: number) =>
  Math.min(Math.max(year, MIN_SIGNED_YEAR), CURRENT_YEAR);

const stepYear = (signed: number | null, delta: number) => {
  const next = clampYear((signed ?? CURRENT_YEAR) + delta);

  return next === 0 ? clampYear(delta) : next;
};

export const SincePage = () => {
  const [year, setYear] = useState("1947");
  const [era, setEra] = useState<Era>("CE");

  const maxYear = maxYearIn(era);
  const yearNumber = Number.parseInt(year, 10);
  const isValidYear = yearNumber >= 1 && yearNumber <= maxYear;
  const signedYear = isValidYear ? signYear(yearNumber, era) : null;

  const { entries, error, loading } = useFetch(todayDay());

  const events =
    entries && (signedYear !== null ? entriesSince(entries, signedYear) : entries);

  const years = useYearOptions(isValidYear ? yearNumber : maxYear, 1, maxYear);

  const step = (delta: number) => {
    const next = stepYear(signedYear, delta);

    setEra(eraOf(next));
    setYear(unsignYear(next));
  };

  const switchEra = (next: string) => {
    const nextEra = next as Era;

    setEra(nextEra);
    setYear((current) => toYearInput(current, maxYearIn(nextEra)));
  };

  return (
    <ContentWrapper
      label="Since:"
      valueEmpty={!year}
      value={
        <PickerField
          label="Year"
          maxLength={4}
          placeholder="YYYY"
          width={`${Math.max(4, year.length)}ch`}
          value={year}
          options={years.options}
          onChange={(next) => setYear(toYearInput(next, maxYear))}
          onPick={setYear}
          onExtend={years.extend}
          onBlur={years.reset}
        />
      }
      control={
        <>
          <YearStepper label="year" onStep={step} />
          <PickerField
            label="Era"
            readOnly
            inputMode="text"
            width={era === "CE" ? "2ch" : "3.1ch"}
            value={era}
            options={ERA_OPTIONS}
            onChange={() => {}}
            onPick={switchEra}
          />
        </>
      }
      description="What happened on this day - Here you can enter a specific year to get all the events that happened on this day, since that year"
    >
      {!isValidYear && (
        <Message>Showing all events — enter a year to filter</Message>
      )}
      <EventList entries={events} loading={loading} error={error} />
    </ContentWrapper>
  );
};
