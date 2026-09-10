import { useState } from "react";
import { ContentWrapper } from "../components/partials/ContentWrapper";
import { EventList } from "../components/partials/EventList";
import { InputField } from "../components/ui/InputField";
import { Message } from "../components/ui/Message";
import { useFetch } from "../hooks/useFetch";

const pad = (value: number) => `${value}`.padStart(2, "0");

const toDigits = (value: string) => value.replace(/\D/g, "").slice(0, 2);

export const ByDatePage = () => {
  const today = new Date();

  const [day, setDay] = useState(() => pad(today.getDate()));
  const [month, setMonth] = useState(() => pad(today.getMonth() + 1));

  const dayNumber = Number.parseInt(day, 10);
  const monthNumber = Number.parseInt(month, 10);

  const isValidDate =
    dayNumber >= 1 && dayNumber <= 31 && monthNumber >= 1 && monthNumber <= 12;

  const { entries, error, loading, loaded, total } = useFetch(
    isValidDate ? { month: monthNumber, day: dayNumber } : null,
  );

  return (
    <ContentWrapper
      label="On:"
      value={
        <>
          <InputField
            label="Day"
            type="text"
            inputMode="numeric"
            maxLength={2}
            width="2ch"
            value={day}
            onChange={(event) => setDay(toDigits(event.target.value))}
            onBlur={() => setDay((current) => current.padStart(2, "0"))}
          />
          /
          <InputField
            label="Month"
            type="text"
            inputMode="numeric"
            maxLength={2}
            width="2ch"
            value={month}
            onChange={(event) => setMonth(toDigits(event.target.value))}
            onBlur={() => setMonth((current) => current.padStart(2, "0"))}
          />
        </>
      }
      description="What happened on this day - Here you can enter a specific date to only get events that happened on this date"
    >
      {!isValidDate && (
        <Message>
          Showing the last date that worked — day must be 1-31 and month 1-12
        </Message>
      )}
      <EventList
        entries={entries}
        loading={loading}
        error={error}
        progress={{ loaded, total }}
      />
    </ContentWrapper>
  );
};
