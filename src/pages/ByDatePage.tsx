import { useRef, useState } from "react";
import { ContentWrapper } from "../components/partials/ContentWrapper";
import { EventList } from "../components/partials/EventList";
import { PickerField } from "../components/ui/PickerField";
import { DatePickerButton } from "../components/ui/DatePickerButton";
import { Message } from "../components/ui/Message";
import { useFetch } from "../hooks/useFetch";
import { useYearOptions } from "../hooks/useYearOptions";
import {
  entriesInYear,
  hasLeapDay,
  lastDayOf,
  MONTH_NAMES,
} from "../api/history";
import { ERA_OPTIONS, maxYearIn, signYear, toYearInput } from "../utils/era";
import type { DayScope } from "../hooks/useFetch";
import type { Era } from "../utils/era";
import type { KeyboardEvent, RefObject } from "react";

const pad = (value: number) => `${value}`.padStart(2, "0");

const monthOptions = MONTH_NAMES.map((name, index) => ({
  value: pad(index + 1),
  text: `${pad(index + 1)}  ${name}`,
}));

const dayOptions = Array.from({ length: 31 }, (_, index) => ({
  value: pad(index + 1),
  text: pad(index + 1),
}));

const toRangedInput = (value: string, max: number) => {
  const digits = value.replace(/\D/g, "").slice(0, 2);

  if (digits.length < 2) return digits;

  const number = Number.parseInt(digits, 10);

  return number >= 1 && number <= max ? digits : digits.slice(0, 1);
};

const toMonthInput = (value: string) => toRangedInput(value, 12);

const toDayInput = (value: string) => toRangedInput(value, 31);

const isMonthComplete = (month: string) =>
  month.length === 2 || Number.parseInt(month, 10) >= 2;

const isYearComplete = (year: string, max: number) =>
  year.length === 4 || Number.parseInt(year, 10) * 10 > max;

const padField = (value: string) => value && value.padStart(2, "0");

const DEFAULT_YEAR = "2001";

const scopeOf = (
  month: number | null,
  day: number | null,
  year: number,
): DayScope | null =>
  day && !month
    ? null
    : {
        month: month ?? undefined,
        day: day ?? undefined,
        leapDay: hasLeapDay(year),
      };

export const ByDatePage = () => {
  const [year, setYear] = useState(DEFAULT_YEAR);
  const [era, setEra] = useState<Era>("CE");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");

  const yearRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);

  const maxYear = maxYearIn(era);
  const yearNumber = Number.parseInt(year, 10);
  const dayNumber = day ? Number.parseInt(day, 10) : null;
  const monthNumber = month ? Number.parseInt(month, 10) : null;

  const isValidMonth =
    monthNumber === null || (monthNumber >= 1 && monthNumber <= 12);

  const lastDay = monthNumber && isValidMonth ? lastDayOf(monthNumber) : 31;
  const isValidDay =
    dayNumber === null || (dayNumber >= 1 && dayNumber <= lastDay);

  const hasYear = yearNumber >= 1 && yearNumber <= maxYear;
  const signedYear = signYear(yearNumber, era);

  const scope =
    hasYear && isValidDay && isValidMonth
      ? scopeOf(monthNumber, dayNumber, signedYear)
      : null;

  const { entries, error, loading, loaded, total } = useFetch(scope);

  const events = hasYear && entries ? entriesInYear(entries, signedYear) : null;

  const years = useYearOptions(hasYear ? yearNumber : maxYear, 1, maxYear);

  const setCompleteYear = (next: string) => {
    setYear(next);
    monthRef.current?.focus();
  };

  const setCompleteMonth = (next: string) => {
    setMonth(next);
    dayRef.current?.focus();
  };

  const switchEra = (next: string) => {
    const nextEra = next as Era;

    setEra(nextEra);
    setYear((current) => toYearInput(current, maxYearIn(nextEra)));
  };

  const backTo = (
    event: KeyboardEvent<HTMLInputElement>,
    previous: RefObject<HTMLInputElement | null>,
  ) => {
    const { selectionStart, selectionEnd } = event.currentTarget;
    const isAtStart = selectionStart === 0 && selectionEnd === 0;

    if (!isAtStart) return;

    if (event.key === "Backspace" || event.key === "ArrowLeft") {
      event.preventDefault();
      previous.current?.focus();
    }
  };

  return (
    <ContentWrapper
      label="On:"
      valueEmpty={!year && !month && !day}
      value={
        <>
          <PickerField
            label="Year"
            inputRef={yearRef}
            maxLength={4}
            placeholder="YYYY"
            width={`${Math.max(4, year.length)}ch`}
            value={year}
            options={years.options}
            onChange={(next) => {
              const yearInput = toYearInput(next, maxYear);

              if (isYearComplete(yearInput, maxYear)) {
                setCompleteYear(yearInput);
              } else {
                setYear(yearInput);
              }
            }}
            onPick={setCompleteYear}
            onExtend={years.extend}
            onBlur={years.reset}
          />
          /
          <PickerField
            label="Month"
            inputRef={monthRef}
            maxLength={2}
            placeholder="MM"
            width={month ? "2ch" : "3ch"}
            value={month}
            options={monthOptions}
            onChange={(next) => {
              const monthInput = toMonthInput(next);

              if (isMonthComplete(monthInput)) {
                setCompleteMonth(monthInput);
              } else {
                setMonth(monthInput);
              }
            }}
            onPick={setCompleteMonth}
            onBlur={() => setMonth(padField)}
            onKeyDown={(event) => backTo(event, yearRef)}
          />
          /
          <PickerField
            label="Day"
            inputRef={dayRef}
            maxLength={2}
            placeholder="DD"
            width={day ? "2ch" : "2.5ch"}
            value={day}
            options={dayOptions.slice(0, lastDay)}
            onChange={(next) => setDay(toDayInput(next))}
            onPick={setDay}
            onBlur={() => setDay(padField)}
            onKeyDown={(event) => backTo(event, monthRef)}
          />
        </>
      }
      control={
        <>
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
          <DatePickerButton
            label="Pick a date"
            day={day}
            month={month}
            year={era === "CE" ? year : undefined}
            onPick={(pickedDay, pickedMonth, pickedYear) => {
              setDay(pickedDay);
              setMonth(pickedMonth);

              if (era === "CE") setYear(toYearInput(pickedYear, maxYear));
            }}
          />
        </>
      }
      description="What happened then - Here you can enter a year, a year and month, or a specific date to see the events that happened then"
    >
      {!hasYear && (
        <Message>
          Enter a year to see events — a month and day need one to go with them
        </Message>
      )}
      {hasYear && (!isValidDay || !isValidMonth) && (
        <Message>
          {isValidMonth && monthNumber && dayNumber && dayNumber > lastDay
            ? `Showing the last date that worked — ${MONTH_NAMES[monthNumber - 1]} only has ${lastDay} days`
            : "Showing the last date that worked — day must be 1-31 and month 1-12"}
        </Message>
      )}
      {hasYear && isValidDay && isValidMonth && !scope && (
        <Message>
          Showing the last date that worked — a day needs a month to go with it
        </Message>
      )}
      <EventList
        entries={events}
        loading={loading}
        error={hasYear ? error : null}
        progress={{ loaded, total }}
      />
    </ContentWrapper>
  );
};
