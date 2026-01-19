import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  areDescriptiveLabels: boolean;
  setAreDescriptiveLabels: (val: boolean) => void;
  areAnimationsOn: boolean;
  setAreAnimationOn: (val: boolean) => void;
  resetToDefaults: () => void;
}

const initialState = {
  areDescriptiveLabels: false,
  areAnimationsOn: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,

      setAreDescriptiveLabels: (val) => set({ areDescriptiveLabels: val }),
      setAreAnimationOn: (val) => set({ areAnimationsOn: val }),

      resetToDefaults: () => set(initialState),
    }),
    {
      name: "settings-storage",
    },
  ),
);
