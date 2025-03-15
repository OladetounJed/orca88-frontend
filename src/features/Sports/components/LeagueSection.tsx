import type { League, TabType } from "@/types";
import { EventCard } from "./EventCard";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEvents } from "../hooks";
import { Skeleton } from "@/components/ui/skeleton";

interface LeagueSectionProps {
  league: League;
  tab: TabType;
}

export function LeagueSection({ league, tab }: LeagueSectionProps) {
  const { events, isLoading, error } = useEvents(league.id, tab);

  return (
    <AccordionItem
      value={league.id}
      className="space-y-3 border border-vegetalight rounded-lg"
    >
      <AccordionTrigger className="w-full p-4 data-[state=open]:border-b border-vegetalight">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{league.country}</span>
            <span className="text-gray-400">/</span>
            <span>{league.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {events.length > 0 && (
              <span className="bg-goku text-[8px] px-2 py-1 rounded">
                {events.length}
              </span>
            )}
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="space-y-3 px-4">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))
        ) : error ? (
          <div className="text-sm text-red-500 py-2">
            Failed to load events. Please try again.
          </div>
        ) : events.length === 0 ? (
          <div className="text-sm text-gray-500 py-2">No events available.</div>
        ) : (
          events.map((event, index) => (
            <div
              key={event.id}
              className={
                index !== events.length - 1
                  ? "border-b border-vegetalight pb-3"
                  : ""
              }
            >
              <EventCard event={event} />
            </div>
          ))
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
