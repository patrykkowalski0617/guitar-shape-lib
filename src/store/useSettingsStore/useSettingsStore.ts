import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SettingsState } from "./types";

const initialState = {
  isFullscreen: false,
  isRotated: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,

      setIsFullscreen: (val) => set({ isFullscreen: val }),

      setIsRotated: (val) => set({ isRotated: val }),

      resetToDefaults: () => set(initialState),
    }),
    {
      name: "settings-storage",
    },
  ),
);
