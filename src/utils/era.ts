import type { PickerOption } from "../components/ui/PickerField";

export type Era = "BCE" | "CE";

export const CURRENT_YEAR = new Date().getFullYear();

export const maxYearIn = (era: Era) => (era === "BCE" ? 9999 : CURRENT_YEAR);

export const ERA_OPTIONS: PickerOption[] = [
  {
    value: "BCE",
    text: "BCE",
    title:
      "Before Common Era — years counting back from year 1, the same years BC refers to",
  },
  {
    value: "CE",
    text: "CE",
    title:
      "Common Era — years counting up from year 1, the same years AD refers to",
  },
];

export const toYearInput = (value: string, max: number) => {
  const digits = value.replace(/\D/g, "").replace(/^0+/, "").slice(0, 4);

  if (digits === "") return "";

  return Number.parseInt(digits, 10) <= max ? digits : digits.slice(0, -1);
};

export const signYear = (year: number, era: Era) =>
  era === "BCE" ? -year : year;

export const eraOf = (signed: number): Era => (signed < 0 ? "BCE" : "CE");

export const unsignYear = (signed: number) => `${Math.abs(signed)}`;
