import { useControlsStore, useMusicStore } from "@/store";
import type { Snapshot } from ".";

export const useApplySnapshotToStore = () => {
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const setShape = useControlsStore((state) => state.setShape);
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );

  return (snapshot: Snapshot) => {
    setShapeVariantLocationData(snapshot.shapeVariantLocationData);
    setTuneKeyId(snapshot.keyId);
    setIsMajorMode(snapshot.isMajorMode);
    setShape(snapshot.shapeId, snapshot.shapeSemitoneOffsetFromC);
  };
};
