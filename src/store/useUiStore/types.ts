export interface UiState {
  isKeyAndChordPickerExpanded: boolean;
  isShapePickerExpanded: boolean;
  setKeyAndChordPickerExpanded: (isExpanded: boolean) => void;
  setShapePickerExpanded: (isExpanded: boolean) => void;
  toggleKeyAndChordPicker: () => void;
  toggleShapePicker: () => void;
  editingBrickId: string | null;
  setEditingBrickId: (id: string | null) => void;
}
