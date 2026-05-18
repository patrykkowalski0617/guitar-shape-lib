import { useBaseChord, useShape, useUnifiedMusicKey } from "@/hooks";
import type { ShapePlayerBrick } from "@/store";

export const useShapePlayerBrickDisplay = (
  shapePlayerBrick?: ShapePlayerBrick,
) => {
  const unifiedMusicKey = useUnifiedMusicKey({
    unifiedMusicKeysDataKey: shapePlayerBrick?.unifiedMusicKeysDataKey,
  });

  const { getBaseChordName } = useBaseChord({
    baseChordDataKey: shapePlayerBrick?.baseChordDataKey,
  });

  const { getShapeName } = useShape({
    shapeDataKey: shapePlayerBrick?.shapeDataKey,
  });

  const keyName = `${unifiedMusicKey?.majorName} / ${unifiedMusicKey?.relativeMinorName}`;

  const chordName = getBaseChordName({
    unifiedMusicKeysDataKey: shapePlayerBrick?.unifiedMusicKeysDataKey,
  });

  if (!shapePlayerBrick) return {};

  const { shapeNoteName, shapeLabel, shapeType } = getShapeName({
    semitoneOffsetFromMajorRoot: shapePlayerBrick?.semitoneOffsetFromMajorRoot,
    unifiedMusicKeysDataKey: shapePlayerBrick?.unifiedMusicKeysDataKey,
  });

  const shapeName = `${shapeType !== "Set" ? shapeNoteName : ""}${shapeType === "Scale" ? " " : ""}${shapeLabel}`;

  return {
    keyName,
    chordName,
    shapeName,
  };
};
