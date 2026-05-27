import { useDataKeyStore, useMusicStore, useUiStore } from "@/store";
import { type BaseChordDataKey, type UnifiedMusicKeysDataKey } from "@/data";
import { getKeyAndChordOptions } from "../utils/getKeyAndChordOptions";

export function useKeyAndChordPicker() {
  const isKeyAndChordPickerExpanded = useUiStore(
    (s) => s.isKeyAndChordPickerExpanded,
  );
  const setKeyAndChordPickerExpanded = useUiStore(
    (s) => s.setKeyAndChordPickerExpanded,
  );
  const setShapePickerExpanded = useUiStore((s) => s.setShapePickerExpanded);
  const editingBrickId = useUiStore((s) => s.editingBrickId);

  const setBaseChordDataKey = useDataKeyStore((s) => s.setBaseChordDataKey);
  const setUnifiedMusicKeysDataKey = useDataKeyStore(
    (s) => s.setUnifiedMusicKeysDataKey,
  );

  const unifiedMusicKeysDataKey = useDataKeyStore(
    (s) => s.unifiedMusicKeysDataKey,
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
