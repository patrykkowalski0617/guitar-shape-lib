import { create } from "zustand";

interface UiState {
  isKeyAndChordPickerExpanded: boolean;
  setKeyAndChordPickerExpanded: (isExpanded: boolean) => void;
  toggleKeyAndChordPicker: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isKeyAndChordPickerExpanded: false,

  setKeyAndChordPickerExpanded: (isKeyAndChordPickerExpanded) =>
    set({ isKeyAndChordPickerExpanded }),

  toggleKeyAndChordPicker: () =>
    set((state) => ({
      isKeyAndChordPickerExpanded: !state.isKeyAndChordPickerExpanded,
    })),
}));
