# History Xplorer

What happened on this day? History Xplorer answers with the events Wikipedia records for a day of the year, laid out along a timeline. It is a React front end for the [Today in History API](https://history.muffinlabs.com), built as a TechCollege school project.

## Pages

- **Today** (`/`) — the events that happened on today's date, across every year. The date is the visitor's own, not the API server's, so the heading and the list agree around midnight.
- **By Date** (`/by-date`) — the events of a year, a year and month, or a full date. A day on its own needs a month to go with it; the year is required, since the API answers for a day and month across all years and the year narrows it down. Years can be BCE or CE, and a calendar picker fills in CE dates.
- **Since** (`/since`) — today's events from a given year onwards, with a stepper that carries over from 1 BCE to 1 CE without a year 0.

Every entry is dated in full ("September 10, year 1947") and links to the Wikipedia article it is about. The list reveals itself in batches as the timeline is scrolled, and a Back to top button appears once the top is out of sight. The theme follows the system's light or dark preference and can be toggled from the header.

## How it talks to the API

The API answers for one day at a time and takes about a second to do it, so a month is thirty-odd requests and a year is 366. [useFetch](src/hooks/useFetch.ts) hands the days to six workers at a time, counts them in ("Loading 12 of 31 days…"), keeps each day's events in a cache so the next search reuses what has already arrived, and drops a request that has been outrun by a newer one.

Responses are validated with Zod against [historyResponseSchema](src/types/history.ts). The data is looser than documented — years arrive as `"1969"`, `"45 BC"`, `"214/15"`, and now and then a whole entry leaked into the year field with `null` for the text — so [api/history.ts](src/api/history.ts) reads the year out, puts leaked entries back together, drops what cannot be dated, and shows eras as BCE/CE rather than the API's BC/AD.

## Stack

- [React 19](https://react.dev) with the React Compiler, on [Vite](https://vite.dev)
- TypeScript
- [React Router](https://reactrouter.com) for the three pages
- [styled-components](https://styled-components.com) with a light and dark theme in [styles/theme.ts](src/styles/theme.ts)
- [Zod](https://zod.dev) for validating API responses
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) and Prettier

## Getting started

```sh
npm install
npm run dev
```

Other scripts:

| Script            | What it does                                       |
| ----------------- | -------------------------------------------------- |
| `npm run build`   | Type-checks and builds for production into `dist/` |
| `npm run preview` | Serves the production build locally                |
| `npm run lint`    | Lints with Oxlint                                  |

## Project layout

```
src/
  api/          API URLs, date helpers and the parsing of entry years
  components/
    icons/      SVG icons
    partials/   Header, NavBar, Timeline, EventList and page wrapper
    ui/         EventCard, PickerField, DatePickerButton, YearStepper, …
  contexts/     Light/dark theme context
  hooks/        useFetch, useYearOptions, useInView, useScrolledPastTop
  pages/        TodayPage, ByDatePage, SincePage
  router/       Route table
  styles/       Theme, global style and CSS reset
  types/        Zod schemas and the types inferred from them
  utils/        Era (BCE/CE) helpers
```
