import { useDataKeyStore } from "@/store";

export const useDataKeySelectors = () => {
  return {
    setBaseChordDataKey: useDataKeyStore((s) => s.setBaseChordDataKey),
    setSelectedShapesVariantDataKeys: useDataKeyStore(
      (s) => s.setSelectedShapesVariantDataKeys,
    ),
    setSemitoneOffsetFromMajorRoot: useDataKeyStore(
      (s) => s.setSemitoneOffsetFromMajorRoot,
    ),
    setUnifiedMusicKeysDataKey: useDataKeyStore(
      (s) => s.setUnifiedMusicKeysDataKey,
    ),

    setNextBaseChordDataKey: useDataKeyStore((s) => s.setNextBaseChordDataKey),
    setNextSelectedShapesVariantDataKeys: useDataKeyStore(
      (s) => s.setNextSelectedShapesVariantDataKeys,
    ),
    setNextSemitoneOffsetFromMajorRoot: useDataKeyStore(
      (s) => s.setNextSemitoneOffsetFromMajorRoot,
    ),
    setNextUnifiedMusicKeysDataKey: useDataKeyStore(
      (s) => s.setNextUnifiedMusicKeysDataKey,
    ),
  };
};
