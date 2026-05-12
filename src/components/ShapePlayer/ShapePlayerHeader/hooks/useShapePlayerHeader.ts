import { useShapePlayerStore, useUiStore } from "@/store";

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

  const handleAddClick = () => {
    setKeyAndChordPickerExpanded(true);
  };

  return {
    handleAddClick,
    clearShapePlayerBricks,
    restoreLastAction,
    isRestoreDisabled,
    isListEmpty,
  };
};
