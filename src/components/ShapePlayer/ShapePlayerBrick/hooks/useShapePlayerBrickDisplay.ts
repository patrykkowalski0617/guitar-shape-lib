import { useBaseChord, useShape, useUnifiedMusicKey } from "@/hooks";
import type { ShapePlayerBrick } from "@/store";

export const useShapePlayerBrickDisplay = (brick?: ShapePlayerBrick) => {
  const unifiedMusicKey = useUnifiedMusicKey({
    unifiedMusicKeysDataKey: brick?.unifiedMusicKeysDataKey,
  });

  const { getBaseChordName } = useBaseChord({
    baseChordDataKey: brick?.baseChordDataKey,
  });

  const { getShapeName } = useShape({
    shapeDataKey: brick?.shapeDataKey,
  });

  const keyName = `${unifiedMusicKey?.majorName} / ${unifiedMusicKey?.relativeMinorName}`;

  const chordName = getBaseChordName({
    unifiedMusicKeysDataKey: brick?.unifiedMusicKeysDataKey,
  });

  if (!brick) return {};

  const shapeName = getShapeName({
    semitoneOffsetFromMajorRoot: brick?.semitoneOffsetFromMajorRoot,
    unifiedMusicKeysDataKey: brick?.unifiedMusicKeysDataKey,
  });

  return {
    keyName,
    chordName,
    shapeName,
  };
};
