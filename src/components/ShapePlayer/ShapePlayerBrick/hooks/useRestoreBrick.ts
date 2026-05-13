import { useDataKeyStore, type ShapePlayerBrick } from "@/store";

export const useRestoreBrick = () => {
  // const setUnifiedMusicKeysDataKey = useDataKeyStore(
  //   (state) => state.setUnifiedMusicKeysDataKey,
  // );
  // const setBaseChordDataKey = useDataKeyStore(
  //   (state) => state.setBaseChordDataKey,
  // );
  // const setShapeDataKey = useDataKeyStore((state) => state.setShapeDataKey);
  // const setSemitoneOffsetFromMajorRoot = useDataKeyStore(
  //   (state) => state.setSemitoneOffsetFromMajorRoot,
  // );

  const restoreBrickData = (brick: ShapePlayerBrick) => {
    // console.log(brick);
    // setUnifiedMusicKeysDataKey(brick.unifiedMusicKeysDataKey);
    // setBaseChordDataKey(brick.baseChordDataKey);
    // setShapeDataKey(brick.shapeDataKey);
    // setSemitoneOffsetFromMajorRoot(brick.semitoneOffsetFromMajorRoot);
  };

  return { restoreBrickData };
};
