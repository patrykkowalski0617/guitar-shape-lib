export interface UiState {
  isEditShapeView: boolean;
  isKeyAndChordPickerExpanded: boolean;
  isShapePickerExpanded: boolean;
  toggleIsEditShapeView: () => void;
  setKeyAndChordPickerExpanded: (isExpanded: boolean) => void;
  setShapePickerExpanded: (isExpanded: boolean) => void;
  toggleKeyAndChordPicker: () => void;
  toggleShapePicker: () => void;
  editingBrickId: string | null;
  setEditingBrickId: (id: string | null) => void;
}
