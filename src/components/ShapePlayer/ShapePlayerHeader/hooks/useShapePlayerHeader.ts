import { useEffect, useRef } from "react";
import { useShapePlayerStore, useUiStore, useDataKeyStore } from "@/store";

export const useShapePlayerHeader = () => {
  const setKeyAndChordPickerExpanded = useUiStore(
    (state) => state.setKeyAndChordPickerExpanded,
  );
  const setShapePickerExpanded = useUiStore(
    (state) => state.setShapePickerExpanded,
  );

  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const shapeDataKey = useDataKeyStore((state) => state.shapeDataKey);

  const setUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.setUnifiedMusicKeysDataKey,
  );
  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );
  const setShapeDataKey = useDataKeyStore((state) => state.setShapeDataKey);

  const addShapePlayerBrick = useShapePlayerStore(
    (state) => state.addShapePlayerBrick,
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

  const isAddingProcessActive = useRef(false);

  useEffect(() => {
    const firstStepCompleted = unifiedMusicKeysDataKey && baseChordDataKey;
    const processFinalized = firstStepCompleted && shapeDataKey;

    if (!isAddingProcessActive.current) return;

    if (processFinalized) {
      addShapePlayerBrick(
        unifiedMusicKeysDataKey,
        baseChordDataKey,
        shapeDataKey,
      );

      isAddingProcessActive.current = false;
      setUnifiedMusicKeysDataKey(null);
      setBaseChordDataKey(null);
      setShapeDataKey(null);
      setShapePickerExpanded(false);
    } else if (firstStepCompleted) {
      setKeyAndChordPickerExpanded(false);
      setShapePickerExpanded(true);
    }
  }, [
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    shapeDataKey,
    addShapePlayerBrick,
    setUnifiedMusicKeysDataKey,
    setBaseChordDataKey,
    setShapeDataKey,
    setKeyAndChordPickerExpanded,
    setShapePickerExpanded,
  ]);

  const handleAddClick = () => {
    isAddingProcessActive.current = true;
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
