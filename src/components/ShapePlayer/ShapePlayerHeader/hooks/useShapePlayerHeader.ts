import { useEffect, useRef } from "react";
import { useShapePlayerStore, useUiStore, useDataKeyStore } from "@/store";

export const useShapePlayerHeader = () => {
  const setKeyAndChordPickerExpanded = useUiStore(
    (state) => state.setKeyAndChordPickerExpanded,
  );

  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const setUnifiedMusicKeysDataKeys = useDataKeyStore(
    (state) => state.setUnifiedMusicKeysDataKeys,
  );
  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );

  const addShapePlayerBrick = useShapePlayerStore(
    (state) => state.addShapePlayerBrick,
  );

  const isWaitingForData = useRef(false);

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

  useEffect(() => {
    const hasRequiredData = unifiedMusicKeysDataKey && baseChordDataKey;

    if (isWaitingForData.current && hasRequiredData) {
      addShapePlayerBrick(unifiedMusicKeysDataKey, baseChordDataKey);
      isWaitingForData.current = false;
      setUnifiedMusicKeysDataKeys(null);
      setBaseChordDataKey(null);
    }
  }, [
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    addShapePlayerBrick,
    setUnifiedMusicKeysDataKeys,
    setBaseChordDataKey,
  ]);

  const handleAddClick = () => {
    const hasRequiredData = unifiedMusicKeysDataKey && baseChordDataKey;

    if (hasRequiredData) {
      addShapePlayerBrick(unifiedMusicKeysDataKey, baseChordDataKey);
    } else {
      isWaitingForData.current = true;
      setKeyAndChordPickerExpanded(true);
    }
  };

  return {
    handleAddClick,
    clearShapePlayerBricks,
    restoreLastAction,
    isRestoreDisabled,
    isListEmpty,
  };
};
