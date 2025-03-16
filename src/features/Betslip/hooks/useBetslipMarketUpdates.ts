import { useEffect } from "react";
import { subscribeToLiveMarketUpdates } from "@/mocks/api";
import { useBetslipStore } from "@/stores/betslip";
import type { MarketOption } from "@/types";

export function useBetslipMarketUpdates() {
  const bet = useBetslipStore((state) => state.bet);
  const updateSelectionOdds = useBetslipStore(
    (state) => state.updateSelectionOdds
  );

  useEffect(() => {
    if (bet.selections.length === 0) return;

    const unsubscribe = subscribeToLiveMarketUpdates(
      (updatedOptions: MarketOption[]) => {
        // Group options by market ID for easier lookup
        const optionsByMarket = updatedOptions.reduce<
          Record<string, MarketOption[]>
        >((acc, option) => {
          if (!acc[option.marketId]) {
            acc[option.marketId] = [];
          }
          acc[option.marketId].push(option);
          return acc;
        }, {});

        // Update each selection if its market has new odds
        bet.selections.forEach((selection) => {
          // Try both market ID formats since we have matches from different sources
          const marketIds = [
            `${selection.matchId}-1x2`, // Format from generateEvents
            `${selection.matchId}`, // Direct market ID
          ];

          for (const marketId of marketIds) {
            const marketOptions = optionsByMarket[marketId];
            if (marketOptions) {
              const updatedOption = marketOptions.find(
                (option) => option.name === selection.selectedTeam
              );

              if (updatedOption && updatedOption.odds !== selection.odds) {
                console.log("Updating odds for selection:", {
                  matchId: selection.matchId,
                  selectedTeam: selection.selectedTeam,
                  oldOdds: selection.odds,
                  newOdds: updatedOption.odds,
                });
                updateSelectionOdds(
                  selection.matchId,
                  selection.selectedTeam,
                  updatedOption.odds
                );
                break; // Found and updated the odds, no need to check other market ID formats
              }
            }
          }
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, [bet.selections, updateSelectionOdds]);
}
