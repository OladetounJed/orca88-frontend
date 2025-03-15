// src/stores/betslip/index.ts
import { create } from "zustand";
import type { Bet, BetSelection } from "@/types";
import { BetType } from "@/types";

export enum BetSlipPage {
  BETSLIP = "betslip",
  MYBETS = "mybets",
}

export interface BetslipState {
  bet: Bet;
  activeTab: BetType;
  betslipPage: BetSlipPage;
  setStake: (value: string, selectionId?: string) => void;
  removeSelection: (selectionId: string) => void;
  clearAll: () => void;
  addSelection: (selection: BetSelection) => void;
  setActiveTab: (tab: BetType) => void;
  showBetslip: boolean;
  setShowBetslip: (show: boolean) => void;
  setBetslipPage: (state: BetSlipPage) => void;
}

export const useBetslipStore = create<BetslipState>((set, get) => ({
  activeTab: BetType.SINGLE,
  betslipPage: BetSlipPage.BETSLIP,
  bet: {
    id: "1",
    type: BetType.SINGLE,
    selections: [],
  },
  showBetslip: false,

  setStake: (value: string, selectionId?: string) => {
    const stake = parseFloat(value);
    const { bet } = get();

    if (bet.type === BetType.SINGLE && selectionId) {
      // Update individual selection stake
      set((state) => ({
        bet: {
          ...state.bet,
          selections: state.bet.selections.map((sel) =>
            sel.id === selectionId
              ? {
                  ...sel,
                  stake: isNaN(stake) ? undefined : stake,
                  potentialWinnings: isNaN(stake)
                    ? undefined
                    : stake * sel.odds,
                }
              : sel
          ),
        },
      }));
    } else {
      // Update multiple bet stake
      const potentialWin = isNaN(stake)
        ? undefined
        : stake * bet.selections.reduce((acc, sel) => acc * sel.odds, 1);

      set((state) => ({
        bet: {
          ...state.bet,
          stake: isNaN(stake) ? undefined : stake,
          potentialWinnings: potentialWin,
        },
      }));
    }
  },

  removeSelection: (selectionId: string) =>
    set((state) => ({
      bet: {
        ...state.bet,
        selections: state.bet.selections.filter(
          (sel) => sel.id !== selectionId
        ),
      },
    })),

  clearAll: () =>
    set((state) => ({
      bet: {
        ...state.bet,
        selections: [],
      },
    })),

  addSelection: (selection: BetSelection) =>
    set((state) => ({
      bet: {
        ...state.bet,
        selections: [...state.bet.selections, selection],
      },
    })),

  setActiveTab: (tab: BetType) =>
    set((state) => ({
      activeTab: tab,
      bet: {
        ...state.bet,
        type: tab,
      },
    })),

  setShowBetslip: (show: boolean) => set({ showBetslip: show }),
  setBetslipPage: (state: BetSlipPage) => set({ betslipPage: state }),
}));
