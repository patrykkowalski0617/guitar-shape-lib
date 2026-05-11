import { useControlsStore, useMusicStore } from "@/store";
import type { Snapshot } from ".";

export const useApplySnapshotToStore = () => {
  const setUnifiedMusicKeysDataKeys = useControlsStore(
    (state) => state.setUnifiedMusicKeysDataKeys,
  );
  const setBaseChordDataKey = useControlsStore(
    (state) => state.setBaseChordDataKey,
  );
  const setShape = useControlsStore((state) => state.setShape);
  const setShapeVariantDataKeys = useMusicStore(
    (state) => state.setShapeVariantDataKeys,
  );

  return (snapshot: Snapshot) => {
    setShapeVariantDataKeys(snapshot.shapeVariantDataKeys);
    setUnifiedMusicKeysDataKeys(snapshot.unifiedMusicKeysDataKey);
    setBaseChordDataKey(snapshot.baseChordDataKey);
    setShape(snapshot.shapeDataKey, snapshot.semitoneOffsetFromMajorRoot);
  };
};
