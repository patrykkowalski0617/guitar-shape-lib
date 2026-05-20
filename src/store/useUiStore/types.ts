export interface UiState {
  isKeyAndChordPickerExpanded: boolean;
  isShapePickerExpanded: boolean;
  setKeyAndChordPickerExpanded: (isExpanded: boolean) => void;
  setShapePickerExpanded: (isExpanded: boolean) => void;
  toggleKeyAndChordPicker: () => void;
  toggleShapePicker: () => void;
}
