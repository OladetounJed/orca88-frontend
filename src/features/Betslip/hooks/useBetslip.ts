import { useBetslipStore } from "@/stores/betslip";
import type { BetslipState } from "@/stores/betslip";

export function useBetslip() {
  const bet = useBetslipStore((state: BetslipState) => state.bet);
  const activeTab = useBetslipStore((state: BetslipState) => state.activeTab);
  const setStake = useBetslipStore((state: BetslipState) => state.setStake);
  const removeSelection = useBetslipStore(
    (state: BetslipState) => state.removeSelection
  );
  const clearAll = useBetslipStore((state: BetslipState) => state.clearAll);
  const addSelection = useBetslipStore(
    (state: BetslipState) => state.addSelection
  );
  const setActiveTab = useBetslipStore(
    (state: BetslipState) => state.setActiveTab
  );
  const setShowBetslip = useBetslipStore(
    (state: BetslipState) => state.setShowBetslip
  );
  const showBetslip = useBetslipStore(
    (state: BetslipState) => state.showBetslip
  );
  return {
    bet,
    activeTab,
    handleStakeChange: setStake,
    handleRemoveSelection: removeSelection,
    handleClearAll: clearAll,
    handleAddSelection: addSelection,
    handleTabChange: setActiveTab,
    handleShowBetslip: setShowBetslip,
    showBetslip,
  };
}
