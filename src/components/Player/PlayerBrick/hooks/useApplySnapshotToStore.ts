import { useControlsStore, useMusicStore } from "@/store";
import type { Snapshot } from ".";

export const useApplySnapshotToStore = () => {
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
  const setBaseChordId = useControlsStore((state) => state.setBaseChordId);
  const setShape = useControlsStore((state) => state.setShape);
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );

  return (snapshot: Snapshot) => {
    setShapeVariantLocationData(snapshot.shapeVariantLocationData);
    setTuneKeyId(snapshot.keyId);
    setBaseChordId(snapshot.baseChordId);
    setShape(snapshot.shapeId, snapshot.shapeSemitoneOffsetFromC);
  };
};
