import { useState, useEffect } from "react";
import { listEvents, listLiveEvents } from "@/mocks/api";
import type { Event, TabType } from "@/types";

export function useEvents(leagueId: string, tab: TabType) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data =
          tab === "Live"
            ? await listLiveEvents(leagueId)
            : await listEvents(leagueId);
        setEvents(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch events")
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (leagueId) {
      fetchEvents();
    }
  }, [leagueId, tab]);

  return {
    events,
    isLoading,
    error,
  };
}
