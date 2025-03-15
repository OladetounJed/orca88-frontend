import { type Bet } from "@/types";
import { Trash2, X } from "lucide-react";
import { BetslipEmptyState } from "./BetslipEmptyState";

interface BetslipContentProps {
  bet: Bet;
  onRemoveSelection: (id: string) => void;
  onClearAll: () => void;
}

export function BetslipContent({
  bet,
  onRemoveSelection,
  onClearAll,
}: BetslipContentProps) {
  if (bet.selections.length === 0) {
    return <BetslipEmptyState />;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {bet.selections.length} Selection
          {bet.selections.length > 1 ? "s" : ""}
        </span>
        <button
          onClick={onClearAll}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <Trash2 className="h-3 w-3" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="space-y-3">
        {bet.selections.map((selection) => (
          <div
            key={selection.id}
            className="bg-gokulight rounded-lg p-3 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">{selection.league}</p>
                <p className="text-sm">
                  {selection.homeTeam} vs {selection.awayTeam}
                </p>
              </div>
              <button
                onClick={() => onRemoveSelection(selection.id)}
                className="p-1 hover:bg-goku rounded-md transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">
                {selection.selectedTeam === "home"
                  ? selection.homeTeam
                  : selection.selectedTeam === "away"
                  ? selection.awayTeam
                  : "Draw"}
              </span>
              <span className="font-semibold">{selection.odds.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
