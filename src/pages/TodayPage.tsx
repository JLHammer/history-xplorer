import { ContentWrapper } from "../components/partials/ContentWrapper";
import { EventList } from "../components/partials/EventList";
import { useFetch } from "../hooks/useFetch";
import { formatDay, todayDay } from "../api/history";

export const TodayPage = () => {
  const { entries, error, loading } = useFetch(todayDay());

  return (
    <ContentWrapper
      label="On this day:"
      subheading={formatDay(todayDay())}
      description="What happened on this day - historical events, deaths and births thoughout time"
    >
      <EventList entries={entries} loading={loading} error={error} />
    </ContentWrapper>
  );
};
