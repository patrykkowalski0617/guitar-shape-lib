import { COLOR_PRESETS } from "@/data/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  isTutorialOn: boolean;
  setIsTutorialOn: (val: boolean) => void;
  tonicColor: number;
  setTonicColor: (val: number) => void;
  subdominantColor: number;
  setSubdominantColor: (val: number) => void;
  dominantColor: number;
  setDominantColor: (val: number) => void;
  resetToDefaults: () => void;
}

const initialState = {
  isTutorialOn: true,
  tonicColor: COLOR_PRESETS[3][0],
  subdominantColor: COLOR_PRESETS[3][1],
  dominantColor: COLOR_PRESETS[3][2],
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,

      setIsTutorialOn: (val) => set({ isTutorialOn: val }),

      setTonicColor: (val) => set({ tonicColor: val }),
      setSubdominantColor: (val) => set({ subdominantColor: val }),
      setDominantColor: (val) => set({ dominantColor: val }),

      resetToDefaults: () => set(initialState),
    }),
    {
      name: "settings-storage",
    },
  ),
);
