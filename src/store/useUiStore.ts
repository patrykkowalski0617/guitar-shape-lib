import { create } from "zustand";

interface UiState {
  isKeyAndChordPickerExpanded: boolean;
  isShapePickerExpanded: boolean;
  setKeyAndChordPickerExpanded: (isExpanded: boolean) => void;
  setShapePickerExpanded: (isExpanded: boolean) => void;
  toggleKeyAndChordPicker: () => void;
  toggleShapePicker: () => void;
}

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
