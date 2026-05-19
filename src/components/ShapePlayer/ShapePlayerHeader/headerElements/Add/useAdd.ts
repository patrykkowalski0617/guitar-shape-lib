import { useUiStore } from "@/store";

export const useAdd = () => {
  const setKeyAndChordPickerExpanded = useUiStore(
    (state) => state.setKeyAndChordPickerExpanded,
  );

  const handleAdd = () => {
    setKeyAndChordPickerExpanded(true);
  };

  return { handleAdd };
};
