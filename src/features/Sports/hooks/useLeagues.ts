import { useState, useEffect } from "react";
import { listLeagues } from "@/mocks/api";
import type { League } from "@/types";

export function useLeagues(sportId: string) {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setIsLoading(true);
        const data = await listLeagues(sportId);
        setLeagues(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch leagues")
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (sportId) {
      fetchLeagues();
    }
  }, [sportId]);

  return {
    leagues,
    isLoading,
    error,
  };
}
