import { useState, useEffect } from "react";
import { getMarket, subscribeToLiveMarketUpdates } from "@/mocks/api";
import type { Market } from "@/types";

export function useMarket(eventId: string) {
  const [market, setMarket] = useState<Market | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        setIsLoading(true);
        const data = await getMarket(eventId);
        setMarket(data || null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch market")
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchMarket();
    }
  }, [eventId]);

  // Subscribe to live market updates
  useEffect(() => {
    if (!eventId || !market?.options) return;

    const unsubscribe = subscribeToLiveMarketUpdates((updatedOptions) => {
      const updatedMarketOptions = updatedOptions.filter(
        (option) => option.marketId === market.id
      );

      if (updatedMarketOptions.length > 0) {
        setMarket((prev) =>
          prev
            ? {
                ...prev,
                options: updatedMarketOptions,
                lastUpdated: new Date().toISOString(),
              }
            : null
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, [eventId, market?.id, market?.options]);

  return {
    market,
    isLoading,
    error,
  };
}
