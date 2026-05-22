import {
  useUnifiedMusicKey,
  useBaseChordName,
  getGuitarShapeName,
} from "@/hooks";
import type { ShapePlayerBrick } from "@/store";

export const useShapePlayerBrickDisplay = (
  guitarShapePlayerBrick?: ShapePlayerBrick,
) => {
  const unifiedMusicKey = useUnifiedMusicKey(
    guitarShapePlayerBrick?.unifiedMusicKeysDataKey,
  );

  const baseChordName = useBaseChordName({
    baseChordDataKey: guitarShapePlayerBrick?.baseChordDataKey,
    unifiedMusicKeysDataKey: guitarShapePlayerBrick?.unifiedMusicKeysDataKey,
  });

  const keyName = `${unifiedMusicKey?.majorName} / ${unifiedMusicKey?.relativeMinorName}`;

  if (!guitarShapePlayerBrick) return {};

  const { guitarShapeNoteName, guitarShapeLabel, guitarShapeType } =
    getGuitarShapeName({
      guitarShapeDataKey: guitarShapePlayerBrick.guitarShapeDataKey,
      unifiedMusicKeysDataKey: guitarShapePlayerBrick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot:
        guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
    });

  const guitarShapeName = `${guitarShapeType !== "Set" ? guitarShapeNoteName : ""}${guitarShapeType === "Scale" ? " " : ""}${guitarShapeLabel}`;

  return {
    keyName,
    baseChordName,
    guitarShapeName,
  };
};
