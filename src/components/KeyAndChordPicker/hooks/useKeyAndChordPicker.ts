import { useDataKeyStore, useUiStore } from "@/store";
import { type BaseChordDataKey, type UnifiedMusicKeysDataKey } from "@/data";
import { useKeyAndChordOptions } from "./useKeyAndChordOptions";

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

  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );
  const setUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.setUnifiedMusicKeysDataKey,
  );

  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const { optionsPerKey } = useKeyAndChordOptions();

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
    optionsPerKey,
    unifiedMusicKeysDataKey,
    handleChordSelection,
  };
}
