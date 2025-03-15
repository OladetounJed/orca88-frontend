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
  setStake: (value: string) => void;
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

  setStake: (value: string) => {
    const stake = parseFloat(value);
    if (isNaN(stake)) {
      set((state) => ({
        bet: {
          ...state.bet,
          stake: undefined,
          potentialWinnings: undefined,
        },
      }));
      return;
    }

    const { bet } = get();
    const potentialWin =
      bet.type === BetType.SINGLE
        ? stake * (bet.selections[0]?.odds || 0)
        : stake *
          bet.selections.reduce(
            (acc: number, sel: BetSelection) => acc * sel.odds,
            1
          );

    set((state) => ({
      bet: {
        ...state.bet,
        stake,
        potentialWinnings: Number(potentialWin.toFixed(2)),
      },
    }));
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
    set(() => ({
      activeTab: tab,
      bet: {
        id: "1",
        type: tab,
        selections: [],
      },
    })),

  setShowBetslip: (show: boolean) => set({ showBetslip: show }),
  setBetslipPage: (state: BetSlipPage) => set({ betslipPage: state }),
}));
