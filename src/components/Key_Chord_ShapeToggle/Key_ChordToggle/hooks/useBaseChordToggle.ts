import { useControlsStore, useMusicStore } from "@/store";
import { type BaseChordDataKey, type UnifiedMusicKeysDataKey } from "@/data";

export function useBaseChordToggle() {
  const setBaseChordDataKey = useControlsStore(
    (state) => state.setBaseChordDataKey,
  );
  const setUnifiedMusicKeysDataKey = useControlsStore(
    (state) => state.setUnifiedMusicKeysDataKey,
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

    const [newUnifiedMusicKeysDataKey, newBaseChordDataKey] =
      combinedValue.split(":");

    setBaseChordDataKey(newBaseChordDataKey as BaseChordDataKey);
    setUnifiedMusicKeysDataKey(
      newUnifiedMusicKeysDataKey as UnifiedMusicKeysDataKey,
    );
  };

  const handleKeyOnlyChange = (
    unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey,
  ) => {
    setUnifiedMusicKeysDataKey(unifiedMusicKeysDataKey);
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
    currentUnifiedMusicKeysDataKey: unifiedMusicKeysDataKey,
  };
}
