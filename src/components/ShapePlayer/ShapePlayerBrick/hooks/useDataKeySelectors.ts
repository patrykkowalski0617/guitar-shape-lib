import { useDataKeyStore } from "@/store";

export const useDataKeySelectors = () => {
  return {
    setBaseChordDataKey: useDataKeyStore((state) => state.setBaseChordDataKey),
    setSelectedShapesVariantDataKeys: useDataKeyStore(
      (state) => state.setSelectedShapesVariantDataKeys,
    ),
    setSemitoneOffsetFromMajorRoot: useDataKeyStore(
      (state) => state.setSemitoneOffsetFromMajorRoot,
    ),
    setUnifiedMusicKeysDataKey: useDataKeyStore(
      (state) => state.setUnifiedMusicKeysDataKey,
    ),

    setNextBaseChordDataKey: useDataKeyStore(
      (state) => state.setNextBaseChordDataKey,
    ),
    setNextSelectedShapesVariantDataKeys: useDataKeyStore(
      (state) => state.setNextSelectedShapesVariantDataKeys,
    ),
    setNextSemitoneOffsetFromMajorRoot: useDataKeyStore(
      (state) => state.setNextSemitoneOffsetFromMajorRoot,
    ),
    setNextUnifiedMusicKeysDataKey: useDataKeyStore(
      (state) => state.setNextUnifiedMusicKeysDataKey,
    ),
  };
};
