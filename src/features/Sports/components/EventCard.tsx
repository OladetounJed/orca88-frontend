import type { Event } from "@/types";
import { useMarket } from "../hooks";
import { Skeleton } from "@/components/ui/skeleton";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { market, isLoading, error } = useMarket(event.id);

  return (
    <div className="rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {event.isLive && (
            <span className="bg-[#ff4e64]/20 text-popo text-xs font-semibold px-1 py-1 rounded">
              LIVE
            </span>
          )}
          {event.minute && <span className="text-sm">{event.minute}'</span>}
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
          market.options.map((option) => (
            <button
              key={option.id}
              className="bg-goku rounded-md p-2 hover:bg-gokulight transition-colors"
            >
              <div className="text-piccolo text-[10px]">
                {option.name === "HOME"
                  ? event.homeTeamName
                  : option.name === "AWAY"
                  ? event.awayTeamName
                  : "Draw"}
              </div>
              <div className="text-sm font-semibold">
                {option.odds.toFixed(2)}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
