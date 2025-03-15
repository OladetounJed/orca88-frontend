import { create } from "zustand";
import type { TabType } from "@/types";

interface SportsState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  eventStatusTabs: TabType[];
}

export const useSportsStore = create<SportsState>((set) => ({
  activeTab: "Live",
  setActiveTab: (tab: TabType) => set({ activeTab: tab }),
  eventStatusTabs: ["Live", "Upcoming"],
}));
