import { Skeleton } from "@/components/ui/skeleton";
import type { Sport } from "@/types";
import { SportCard } from "./SportCard";

interface SportsListProps {
  sports: Sport[];
  currentSport?: string;
  isLoading: boolean;
  error: Error | null;
}

export const SportsList = ({
  sports,
  currentSport,
  isLoading,
  error,
}: SportsListProps) => {
  if (error) {
    return (
      <div className="text-sm text-red-500">
        Failed to load sports. Please try again.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-24">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
      {sports.map((sport) => (
        <SportCard
          key={sport.id}
          sport={sport}
          isActive={currentSport === sport.slug}
        />
      ))}
    </div>
  );
};
