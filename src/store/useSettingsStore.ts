import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  areDescriptiveLabels: boolean;
  setAreDescriptiveLabels: (val: boolean) => void;
  resetToDefaults: () => void;
}

const initialState = {
  areDescriptiveLabels: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,

      setAreDescriptiveLabels: (val) => set({ areDescriptiveLabels: val }),

      resetToDefaults: () => set(initialState),
    }),
    {
      name: "settings-storage",
    },
  ),
);
