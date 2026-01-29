import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  areAnimationsOn: boolean;
  setAreAnimationOn: (val: boolean) => void;
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
  areAnimationsOn: true,
  isTutorialOn: true,
  tonicColor: 193,
  subdominantColor: 40,
  dominantColor: 111,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,

      setAreAnimationOn: (val) => set({ areAnimationsOn: val }),
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
