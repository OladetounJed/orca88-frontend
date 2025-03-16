import { type Bet, BetType } from "@/types";
import { Trash2, X } from "lucide-react";
import { BetslipEmptyState } from "./BetslipEmptyState";
import { AnimatedOdds } from "@/components/ui/AnimatedOdds";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

interface BetslipContentProps {
  bet: Bet;
  onRemoveSelection: (id: string) => void;
  onClearAll: () => void;
  onStakeChange: (value: string, selectionId?: string) => void;
}

export function BetslipContent({
  bet,
  onRemoveSelection,
  onClearAll,
  onStakeChange,
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
                {selection.selectedTeam === "HOME"
                  ? selection.homeTeam
                  : selection.selectedTeam === "AWAY"
                  ? selection.awayTeam
                  : "Draw"}
              </span>
              <AnimatedOdds odds={selection.odds} />
            </div>

            {bet.type === BetType.SINGLE && (
              <div className="mt-2 space-y-2">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    placeholder="Enter stake"
                    value={selection.stake || ""}
                    onChange={(e) =>
                      onStakeChange(e.target.value, selection.id)
                    }
                    className="w-full bg-goku text-sm p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-vegeta"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    oRCA
                  </span>
                </div>
                {selection.stake && selection.potentialWinnings && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Potential Win</span>
                    <AnimatedNumber
                      value={selection.potentialWinnings}
                      suffix=" oRCA"
                      className="font-semibold text-piccolo"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
