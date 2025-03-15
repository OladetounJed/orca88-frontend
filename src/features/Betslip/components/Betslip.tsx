import { BetslipHeader } from "./BetslipHeader";
import { BetslipTabs } from "./BetslipTabs";
import { BetslipContent } from "./BetslipContent";
import { BetslipFooter } from "./BetslipFooter";
import { useBetslip } from "../hooks";

interface BetslipProps {
  onClose?: () => void;
}

export function Betslip({ onClose }: BetslipProps) {
  const {
    bet,
    activeTab,
    handleStakeChange,
    handleRemoveSelection,
    handleClearAll,
    handleTabChange,
  } = useBetslip();

  return (
    <div className="bg-goku rounded-lg overflow-hidden">
      <BetslipHeader onClose={onClose} />

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
