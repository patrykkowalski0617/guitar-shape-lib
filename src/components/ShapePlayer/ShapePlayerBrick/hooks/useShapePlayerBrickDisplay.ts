import { useUnifiedMusicKey, useShape } from "@/hooks";
import { useBaseChordName } from "@/hooks/baseChord/useBaseChordName";
import type { ShapePlayerBrick } from "@/store";

export const useShapePlayerBrickDisplay = (
  shapePlayerBrick?: ShapePlayerBrick,
) => {
  const unifiedMusicKey = useUnifiedMusicKey({
    unifiedMusicKeysDataKey: shapePlayerBrick?.unifiedMusicKeysDataKey,
  });

  const chordName = useBaseChordName({
    baseChordDataKey: shapePlayerBrick?.baseChordDataKey,
    unifiedMusicKeysDataKey: shapePlayerBrick?.unifiedMusicKeysDataKey,
  });

  const { getShapeName } = useShape({
    shapeDataKey: shapePlayerBrick?.shapeDataKey,
  });

  const keyName = `${unifiedMusicKey?.majorName} / ${unifiedMusicKey?.relativeMinorName}`;

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
