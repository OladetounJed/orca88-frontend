import { BetslipHeader } from "./BetslipHeader";
import { BetslipTabs } from "./BetslipTabs";
import { BetslipContent } from "./BetslipContent";
import { BetslipFooter } from "./BetslipFooter";
import { useBetslip } from "../hooks";
import { useBetslipMarketUpdates } from "../hooks/useBetslipMarketUpdates";

export function Betslip() {
  const {
    bet,
    activeTab,
    handleStakeChange,
    handleRemoveSelection,
    handleClearAll,
    handleTabChange,
    handleShowBetslip,
    betslipPage,
    handleBetslipPage,
  } = useBetslip();

  // Subscribe to market updates
  useBetslipMarketUpdates();

  return (
    <div className="rounded-lg overflow-hidden space-y-6">
      <BetslipHeader
        handleShowBetslip={handleShowBetslip}
        betslipPage={betslipPage}
        handleBetslipPage={handleBetslipPage}
      />

      <BetslipTabs
        activeTab={activeTab}
        onChange={handleTabChange}
        selectionsCount={bet.selections.length}
      />

      <BetslipContent
        bet={bet}
        onRemoveSelection={handleRemoveSelection}
        onClearAll={handleClearAll}
        onStakeChange={handleStakeChange}
      />

      <BetslipFooter bet={bet} onStakeChange={handleStakeChange} />
    </div>
  );
}
