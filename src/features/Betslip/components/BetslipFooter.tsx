import { BetType, type Bet } from "@/types";
import { AnimatedOdds } from "@/components/ui/AnimatedOdds";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

interface BetslipFooterProps {
  bet: Bet;
  onStakeChange: (value: string) => void;
}

export function BetslipFooter({ bet, onStakeChange }: BetslipFooterProps) {
  if (bet.selections.length === 0) {
    return null;
  }

  const totalOdds =
    bet.type === BetType.SINGLE
      ? bet.selections[0]?.odds || 0
      : bet.selections.reduce((acc, sel) => acc * sel.odds, 1);

  const totalStake =
    bet.type === BetType.SINGLE
      ? bet.selections.reduce((acc, sel) => acc + (sel.stake || 0), 0)
      : bet.stake || 0;

  const totalPotentialWinnings =
    bet.type === BetType.SINGLE
      ? bet.selections.reduce(
          (acc, sel) => acc + (sel.potentialWinnings || 0),
          0
        )
      : bet.potentialWinnings || 0;

  const isDisabled =
    bet.type === BetType.SINGLE
      ? bet.selections.some((sel) => !sel.stake || sel.stake <= 0)
      : !bet.stake || bet.stake <= 0;

  return (
    <div className="border-t border-gokulight p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Total Odds</span>
          <AnimatedOdds odds={totalOdds} className="font-semibold" />
        </div>

        {bet.type === BetType.MULTI && (
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="number"
                placeholder="Enter stake"
                value={bet.stake || ""}
                onChange={(e) => onStakeChange(e.target.value)}
                className="w-full bg-gokulight text-sm p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-vegeta"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                oRCA
              </span>
            </div>
          </div>
        )}

        {(totalStake > 0 || totalPotentialWinnings > 0) && (
          <>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Total Stake</span>
              <AnimatedNumber
                value={totalStake}
                suffix=" oRCA"
                className="font-semibold"
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Total Potential Win</span>
              <AnimatedNumber
                value={totalPotentialWinnings}
                suffix=" oRCA"
                className="font-semibold text-piccolo"
              />
            </div>
          </>
        )}
      </div>

      <button
        disabled={isDisabled}
        className="w-full bg-vegeta text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-vegeta/90 transition-colors"
      >
        Place Bet
      </button>
    </div>
  );
}
