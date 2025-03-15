import { type Event, type BetSelection, BetSelectionType } from "@/types";
import { useMarket } from "../hooks";
import { useBetslip } from "@/features/Betslip/hooks";
import { Skeleton } from "@/components/ui/skeleton";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { market, isLoading, error } = useMarket(event.id);
  const { handleAddSelection, bet } = useBetslip();

  const handleSelectOption = (optionName: string, odds: number) => {
    // Check if selection already exists
    const existingSelection = bet.selections.find(
      (sel) => sel.matchId === event.id && sel.selectedTeam === optionName
    );

    if (existingSelection) return; // Don't add if already selected

    const selection: BetSelection = {
      id: `${event.id}-${optionName}`,
      matchId: event.id,
      homeTeam: event.homeTeamName,
      awayTeam: event.awayTeamName,
      league: event.league?.name || "",
      odds: odds,
      selectedTeam: optionName,
    };

    handleAddSelection(selection);
  };

  if (isLoading || !market) return null;

  return (
    <div className="rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {event.isLive && (
            <span className="bg-[#ff4e64]/20 text-popo text-xs font-semibold px-1 py-1 rounded">
              LIVE
            </span>
          )}
          {event.minute && (
            <span className="text-sm">{event.minute}&apos;</span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-sm font-bold">
        <div>{event.homeTeamName}</div>
        <div className="text-piccolo">
          {event.score ? `${event.score.home} : ${event.score.away}` : "VS"}
        </div>
        <div>{event.awayTeamName}</div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))
        ) : error ? (
          <div className="col-span-3 text-sm text-red-500">
            Failed to load odds
          </div>
        ) : !market ? (
          <div className="col-span-3 text-sm text-gray-500">
            No odds available
          </div>
        ) : (
          market.options.map((option) => {
            const isSelected = bet.selections.some(
              (sel) =>
                sel.matchId === event.id && sel.selectedTeam === option.name
            );

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.name, option.odds)}
                className={`
                  p-2 text-center rounded text-sm font-medium transition-colors
                  ${
                    isSelected
                      ? "bg-vegeta text-white"
                      : "bg-gokulight hover:bg-gokulight/80 text-white"
                  }
                `}
                disabled={isSelected}
              >
                <div className="text-piccolo text-[10px]">
                  {option.name === BetSelectionType.HOME
                    ? event.homeTeamName
                    : option.name === BetSelectionType.AWAY
                    ? event.awayTeamName
                    : "Draw"}
                </div>
                <div className="text-sm font-semibold">
                  {option.odds.toFixed(2)}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
