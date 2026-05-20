import { create } from "zustand";
import type { UiState } from "./types";

export const useUiStore = create<UiState>((set) => ({
  isKeyAndChordPickerExpanded: false,
  isShapePickerExpanded: false,

  setKeyAndChordPickerExpanded: (isKeyAndChordPickerExpanded) =>
    set({ isKeyAndChordPickerExpanded }),

  setShapePickerExpanded: (isShapePickerExpanded) =>
    set({ isShapePickerExpanded }),

  toggleKeyAndChordPicker: () =>
    set((state) => ({
      isKeyAndChordPickerExpanded: !state.isKeyAndChordPickerExpanded,
    })),

  toggleShapePicker: () =>
    set((state) => ({
      isShapePickerExpanded: !state.isShapePickerExpanded,
    })),
}));
