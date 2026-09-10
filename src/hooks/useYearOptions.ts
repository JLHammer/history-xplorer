import { useState } from "react";
import type { PickerOption } from "../components/ui/PickerField";

const YEAR_WINDOW = 10;
const YEAR_WINDOW_STEP = 25;

type YearWindow = {
  earlier: number;
  later: number;
};

export type YearWindowEdge = "start" | "end";

export const yearRange = (
  centre: number,
  { earlier, later }: YearWindow,
  min: number,
  max: number,
) => {
  const clamp = (year: number) => Math.min(Math.max(year, min), max);
  const from = clamp(clamp(centre) + later);
  const to = clamp(clamp(centre) - earlier);

  return Array.from({ length: from - to + 1 }, (_, index) => from - index);
};

export const useYearOptions = (centre: number, min: number, max: number) => {
  const [span, setSpan] = useState<YearWindow>({
    earlier: YEAR_WINDOW,
    later: YEAR_WINDOW,
  });

  const extend = (edge: YearWindowEdge) =>
    setSpan((current) =>
      edge === "start"
        ? { ...current, later: current.later + YEAR_WINDOW_STEP }
        : { ...current, earlier: current.earlier + YEAR_WINDOW_STEP },
    );

  const reset = () => setSpan({ earlier: YEAR_WINDOW, later: YEAR_WINDOW });

  const options: PickerOption[] = yearRange(centre, span, min, max).map(
    (year) => ({ value: `${year}`, text: `${year}` }),
  );

  return { options, extend, reset };
};
