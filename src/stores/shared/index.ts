import { create } from "zustand";

interface SharedState {
  theme: "light" | "dark";
  currency: string;
  setTheme: (theme: "light" | "dark") => void;
  setCurrency: (currency: string) => void;
}

export const useSharedStore = create<SharedState>((set) => ({
  theme: "dark",
  currency: "oRCA",

  setTheme: (theme) => set({ theme }),
  setCurrency: (currency) => set({ currency }),
}));
