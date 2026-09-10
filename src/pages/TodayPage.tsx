import { ContentWrapper } from "../components/partials/ContentWrapper";
import { EventList } from "../components/partials/EventList";
import { useFetch } from "../hooks/useFetch";
import { todayDay } from "../api/history";

export const TodayPage = () => {
  const { entries, error, loading } = useFetch(todayDay());

  return (
    <ContentWrapper
      label="On this day"
      description="What happened on this day - Here you can enter a specific date to only get events that happened on this date"
    >
      <EventList entries={entries} loading={loading} error={error} />
    </ContentWrapper>
  );
};
