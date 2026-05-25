import { useDataKeyStore, useMusicStore, useShapePlayerStore } from "@/store";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";
import { resolveTargetSharpNoteNames } from "@/utils";
import type { ShapePlayerBrick } from "@/store";

export function useRestoreBrick() {
  const restoreCurrentBrick = useDataKeyStore(
    (state) => state.restoreCurrentBrick,
  );
  const replaceTargetSharpNoteNames = useMusicStore(
    (state) => state.replaceTargetSharpNoteNames,
  );
  const setActiveBrickId = useShapePlayerStore(
    (state) => state.setActiveBrickId,
  );

  const restore = (brick: ShapePlayerBrick) => {
    const orderedLocations = getOrderedShapeVariantDataKeys({
      guitarShapeDataKey: brick.guitarShapeDataKey,
      unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
    });

    const sliderRange = brick.sliderRange ?? [
      0,
      Math.max(0, orderedLocations.length - 1),
    ];

    const selectedShapesVariantDataKeys = orderedLocations.slice(
      sliderRange[0],
      sliderRange[1] + 1,
    );

    restoreCurrentBrick({
      baseChordDataKey: brick.baseChordDataKey,
      unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
      selectedShapesVariantDataKeys,
    });

    setActiveBrickId(brick.id ?? null);

    const sharpNoteNames = resolveTargetSharpNoteNames(
      brick.unifiedMusicKeysDataKey,
      brick.baseChordDataKey,
      brick.guitarShapeDataKey,
      brick.semitoneOffsetFromMajorRoot,
      brick.targetNoteIndices ?? [1],
    );

    replaceTargetSharpNoteNames(sharpNoteNames);
  };

  return { restore };
}
