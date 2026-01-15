import { create } from "zustand";

interface ControlsState {
  areDescriptiveLabels: boolean;
  setAreDescriptiveLabels: (areDescriptiveLabels: boolean) => void;
}

export const useSettingsStore = create<ControlsState>((set) => ({
  areDescriptiveLabels: false,
  setAreDescriptiveLabels: (areDescriptiveLabels) => set({ areDescriptiveLabels }),
}));
