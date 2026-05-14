import { useDataKeyStore, useShapePlayerStore, useUiStore } from "@/store";
import { useMetronomeStore } from "@/store/useMetronomeStore";

export const useShapePlayerHeader = () => {
  const setKeyAndChordPickerExpanded = useUiStore(
    (state) => state.setKeyAndChordPickerExpanded,
  );
  const clearShapePlayerBricks = useShapePlayerStore(
    (state) => state.clearShapePlayerBricks,
  );
  const restoreLastAction = useShapePlayerStore(
    (state) => state.restoreLastAction,
  );
  const isRestoreDisabled = useShapePlayerStore(
    (state) => state.shapePlayerHistory.length === 0,
  );
  const isListEmpty = useShapePlayerStore(
    (state) => state.shapePlayerBricks.length === 0,
  );
  const togglePlay = useMetronomeStore((state) => state.togglePlay);

  const resetDataKeys = useDataKeyStore((state) => state.resetDataKeys);

  const handleAdd = () => {
    setKeyAndChordPickerExpanded(true);
  };

  const handleClear = () => {
    clearShapePlayerBricks();
    resetDataKeys();
  };

  const handleMetronomeToggle = () => {
    togglePlay();
  };

  return {
    handleAdd,
    handleClear,
    restoreLastAction,
    handleMetronomeToggle,
    isRestoreDisabled,
    isListEmpty,
  };
};
