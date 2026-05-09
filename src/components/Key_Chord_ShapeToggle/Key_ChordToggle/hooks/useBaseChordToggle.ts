import { useControlsStore, useMusicStore } from "@/store";
import { type BaseChordDataKey, type UnifiedMusicKeysDataKeys } from "@/data";

export function useBaseChordToggle() {
  const setBaseChordDataKey = useControlsStore(
    (state) => state.setBaseChordDataKey,
  );
  const setUnifiedMusicKeysDataKeys = useControlsStore(
    (state) => state.setUnifiedMusicKeysDataKeys,
  );
  const setShapeVariantDataKeys = useMusicStore(
    (state) => state.setShapeVariantDataKeys,
  );
  const setShapeVariantDataKeys_locked = useMusicStore(
    (state) => state.setShapeVariantDataKeys_locked,
  );
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const handleValueChange = (combinedValue: string | null) => {
    if (!combinedValue) {
      return;
    }

    const [newUnifiedMusicKeysDataKeys, newBaseChordDataKey] =
      combinedValue.split(":");

    setBaseChordDataKey(newBaseChordDataKey as BaseChordDataKey);
    setUnifiedMusicKeysDataKeys(
      newUnifiedMusicKeysDataKeys as UnifiedMusicKeysDataKeys,
    );
  };

  const handleKeyOnlyChange = (
    unifiedMusicKeysDataKey: UnifiedMusicKeysDataKeys,
  ) => {
    setUnifiedMusicKeysDataKeys(unifiedMusicKeysDataKey);
    setShapeVariantDataKeys(null);
    setShapeVariantDataKeys_locked(null);
  };

  const currentCombinedValue = baseChordDataKey
    ? `${unifiedMusicKeysDataKey}:${baseChordDataKey}`
    : "";

  return {
    currentValue: currentCombinedValue,
    handleValueChange,
    handleKeyOnlyChange,
    currentUnifiedMusicKeysDataKeys: unifiedMusicKeysDataKey,
  };
}
