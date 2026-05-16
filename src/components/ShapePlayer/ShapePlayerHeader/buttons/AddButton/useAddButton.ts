import { useUiStore } from "@/store";

export const useAddButton = () => {
  const setKeyAndChordPickerExpanded = useUiStore(
    (state) => state.setKeyAndChordPickerExpanded,
  );

  const handleAdd = () => {
    setKeyAndChordPickerExpanded(true);
  };

  return { handleAdd };
};
