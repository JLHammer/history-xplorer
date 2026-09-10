import { ContentWrapper } from "../components/partials/ContentWrapper";
import { EventList } from "../components/partials/EventList";
import { useFetch } from "../hooks/useFetch";
import { entriesWithYear, todayUrl } from "../api/history";
import { historyResponseSchema } from "../types/history";

export const TodayPage = () => {
  const { data, error, loading } = useFetch(todayUrl(), {
    schema: historyResponseSchema,
  });

  return (
    <ContentWrapper
      label="On this day"
      description="What happened on this day - Here you can enter a specific date to only get events that happened on this date"
    >
      <EventList
        entries={data && entriesWithYear(data.data.Events)}
        loading={loading}
        error={error}
      />
    </ContentWrapper>
  );
};
