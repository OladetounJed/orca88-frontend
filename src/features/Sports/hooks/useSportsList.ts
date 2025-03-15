import { useState, useEffect } from "react";
import { listSports } from "@/mocks/api";
import type { Sport } from "@/types";

export function useSportsList(group?: string) {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        setIsLoading(true);
        const data = await listSports(group);
        setSports(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch sports")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSports();
  }, [group]);

  return {
    sports,
    isLoading,
    error,
  };
}
