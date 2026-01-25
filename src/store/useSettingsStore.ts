import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  areDescriptiveLabels: boolean;
  setAreDescriptiveLabels: (val: boolean) => void;
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
  areDescriptiveLabels: false,
  areAnimationsOn: true,
  isTutorialOn: true,
  tonicColor: 36,
  subdominantColor: 270,
  dominantColor: 111,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,

      setAreDescriptiveLabels: (val) => set({ areDescriptiveLabels: val }),
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
