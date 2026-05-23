import { useDataKeyStore, useMusicStore, useUiStore } from "@/store";
import { type BaseChordDataKey, type UnifiedMusicKeysDataKey } from "@/data";
import { getKeyAndChordOptions } from "../utils/getKeyAndChordOptions";

export function useKeyAndChordPicker() {
  const isKeyAndChordPickerExpanded = useUiStore(
    (state) => state.isKeyAndChordPickerExpanded,
  );
  const setKeyAndChordPickerExpanded = useUiStore(
    (state) => state.setKeyAndChordPickerExpanded,
  );
  const setShapePickerExpanded = useUiStore(
    (state) => state.setShapePickerExpanded,
  );
  const editingBrickId = useUiStore((state) => state.editingBrickId);

  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );
  const setUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.setUnifiedMusicKeysDataKey,
  );

  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const isMajorMode = useMusicStore((s) => s.isMajorMode);

  const { optionsPerKey } = getKeyAndChordOptions(isMajorMode);

  const handleChordSelection = (
    newUnifiedKey: UnifiedMusicKeysDataKey,
    newChordKey: BaseChordDataKey,
  ) => {
    setBaseChordDataKey(newChordKey);
    setUnifiedMusicKeysDataKey(newUnifiedKey);
    setKeyAndChordPickerExpanded(false);
    setShapePickerExpanded(true);
  };

  return {
    isKeyAndChordPickerExpanded,
    editingBrickId,
    optionsPerKey,
    unifiedMusicKeysDataKey,
    handleChordSelection,
  };
}
