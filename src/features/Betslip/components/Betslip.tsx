import { BetslipHeader } from "./BetslipHeader";
import { BetslipTabs } from "./BetslipTabs";
import { BetslipContent } from "./BetslipContent";
import { BetslipFooter } from "./BetslipFooter";
import { useBetslip } from "../hooks";

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

  return (
    <div className="rounded-lg overflow-hidden">
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
      />

      <BetslipFooter bet={bet} onStakeChange={handleStakeChange} />
    </div>
  );
}
