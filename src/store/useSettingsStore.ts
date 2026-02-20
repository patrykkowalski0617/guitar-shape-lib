import { COLOR_PRESETS } from "@/data/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
  isTutorialOn: boolean;
  setIsTutorialOn: (val: boolean) => void;
  primaryColor: number;
  setPrimaryColor: (val: number) => void;
  resetToDefaults: () => void;
}

const initialState = {
  isFullscreen: false,
  isTutorialOn: true,
  primaryColor: COLOR_PRESETS[0].hue,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,

      setIsFullscreen: (val) => set({ isFullscreen: val }),

      setIsTutorialOn: (val) => set({ isTutorialOn: val }),

      setPrimaryColor: (val) => set({ primaryColor: val }),

      resetToDefaults: () => set(initialState),
    }),
    {
      name: "settings-storage",
    },
  ),
);
