import { useRef } from "react";
import styled from "styled-components";

type DatePickerButtonProps = {
  label: string;
  day: string;
  month: string;
  year?: string;
  onPick: (day: string, month: string, year: string) => void;
};

const CURRENT_YEAR = new Date().getFullYear();

const pad = (value: number) => `${value}`.padStart(2, "0");

const toDateValue = (day: string, month: string, year?: string) => {
  const dayNumber = Number.parseInt(day, 10);
  const monthNumber = Number.parseInt(month, 10);
  const yearNumber = Number.parseInt(year ?? "", 10);

  const isValidDate =
    dayNumber >= 1 && dayNumber <= 31 && monthNumber >= 1 && monthNumber <= 12;

  if (!isValidDate) return "";

  const pickerYear = yearNumber >= 1 ? yearNumber : CURRENT_YEAR;

  return `${`${pickerYear}`.padStart(4, "0")}-${pad(monthNumber)}-${pad(dayNumber)}`;
};

const DatePickerButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 0;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;

  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.light.highlight};
  }

  body.dark-mode &:focus-visible {
    background-color: ${({ theme }) => theme.colors.dark.highlight};
  }
`;

const AnchoredDateInput = styled.input`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1px;
  height: 1px;
  padding: 0;
  border: none;
  opacity: 0;
  pointer-events: none;
`;

const CalendarIcon = styled.svg`
  width: 1.125rem;
  height: 1.125rem;
`;

export const DatePickerButton = ({
  label,
  day,
  month,
  year,
  onPick,
}: DatePickerButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    const input = inputRef.current;

    if (!input) return;

    try {
      input.showPicker();
    } catch {
      input.focus();
    }
  };

  return (
    <DatePickerButtonStyled
      type="button"
      onClick={openPicker}
      aria-label={label}
    >
      <CalendarIcon
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </CalendarIcon>
      <AnchoredDateInput
        ref={inputRef}
        type="date"
        tabIndex={-1}
        aria-label={label}
        value={toDateValue(day, month, year)}
        onChange={(event) => {
          const [pickedYear, pickedMonth, pickedDay] =
            event.target.value.split("-");

          if (!pickedDay || !pickedMonth || !pickedYear) return;

          onPick(pickedDay, pickedMonth, `${Number.parseInt(pickedYear, 10)}`);
        }}
      />
    </DatePickerButtonStyled>
  );
};
