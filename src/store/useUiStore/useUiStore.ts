import { create } from "zustand";
import type { UiState } from "./types";

export const useUiStore = create<UiState>((set) => ({
  isKeyAndChordPickerExpanded: false,
  isShapePickerExpanded: false,
  isEditShapeView: false,
  editingBrickId: null,

  selectedViewIndices: [1, 2, 3, 4, 5, 6, 7],
  setViewIndices: (selectedViewIndices) => set({ selectedViewIndices }),

  setKeyAndChordPickerExpanded: (isKeyAndChordPickerExpanded) =>
    set({ isKeyAndChordPickerExpanded }),

  setShapePickerExpanded: (isShapePickerExpanded) =>
    set({ isShapePickerExpanded }),

  toggleIsEditShapeView: () =>
    set((state) => ({
      isEditShapeView: !state.isEditShapeView,
    })),

  toggleKeyAndChordPicker: () =>
    set((state) => ({
      isKeyAndChordPickerExpanded: !state.isKeyAndChordPickerExpanded,
    })),

  toggleShapePicker: () =>
    set((state) => ({
      isShapePickerExpanded: !state.isShapePickerExpanded,
    })),

  setEditingBrickId: (editingBrickId) => set({ editingBrickId }),
}));
