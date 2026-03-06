import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
  isRotated: boolean;
  setIsRotated: (val: boolean) => void;
  isTutorialOn: boolean;
  setIsTutorialOn: (val: boolean) => void;
  resetToDefaults: () => void;
}

const initialState = {
  isFullscreen: false,
  isRotated: false,
  isTutorialOn: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,

      setIsFullscreen: (val) => set({ isFullscreen: val }),

      setIsRotated: (val) => set({ isRotated: val }),

      setIsTutorialOn: (val) => set({ isTutorialOn: val }),

      resetToDefaults: () => set(initialState),
    }),
    {
      name: "settings-storage",
    },
  ),
);
