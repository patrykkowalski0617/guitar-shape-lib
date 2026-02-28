import { COLOR_PRESETS } from "@/data/colorPresets";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
  isRotated: boolean;
  setIsRotated: (val: boolean) => void;
  isTutorialOn: boolean;
  setIsTutorialOn: (val: boolean) => void;
  primaryColor: string;
  setPrimaryColor: (val: string) => void;
  resetToDefaults: () => void;
}

const initialState = {
  isFullscreen: false,
  isRotated: false,
  isTutorialOn: true,
  primaryColor: COLOR_PRESETS[0].value,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,

      setIsFullscreen: (val) => set({ isFullscreen: val }),

      setIsRotated: (val) => set({ isRotated: val }),

      setIsTutorialOn: (val) => set({ isTutorialOn: val }),

      setPrimaryColor: (val) => set({ primaryColor: val }),

      resetToDefaults: () => set(initialState),
    }),
    {
      name: "settings-storage",
    },
  ),
);
