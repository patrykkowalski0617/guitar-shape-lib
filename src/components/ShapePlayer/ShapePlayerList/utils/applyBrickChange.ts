import { brickToBackingtrackNoteIds } from "@/utils/brickToBackingtrackNoteIds";
import { brickToSelectedShapes } from "@/utils/brickToSelectedShapes";
import { useMusicStore, useDataKeyStore } from "@/store";
import type { ShapePlayerBrick } from "@/store";
import { resolveTargetSharpNoteNames } from "@/utils";

// export const applyBrickChange = (
//   brick: ShapePlayerBrick,
//   nextBrick: ShapePlayerBrick | undefined,
// ) => {
//   const { restoreCurrentBrick } = useDataKeyStore.getState();
//   const { setBackingtrackNoteIds, replaceTargetSharpNoteNames } =
//     useMusicStore.getState();

//   restoreCurrentBrick({
//     baseChordDataKey: brick.baseChordDataKey,
//     unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
//     semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
//     selectedShapesVariantDataKeys: brickToSelectedShapes(brick),
//   });

//   const noteIds = brickToBackingtrackNoteIds(brick);
//   if (noteIds.length > 0) {
//     setBackingtrackNoteIds(noteIds);
//   }

//   if (nextBrick) {
//     const sharpNoteNames = resolveTargetSharpNoteNames(
//       nextBrick.unifiedMusicKeysDataKey,
//       nextBrick.baseChordDataKey,
//       nextBrick.guitarShapeDataKey,
//       nextBrick.semitoneOffsetFromMajorRoot,
//       nextBrick.targetNoteIndices ?? [1],
//     );

//     replaceTargetSharpNoteNames(sharpNoteNames);
//   }
// };

export const applyBrickChange = (
  brick: ShapePlayerBrick,
  nextBrick: ShapePlayerBrick | undefined,
) => {
  const { restoreCurrentBrick, restoreNextBrick } = useDataKeyStore.getState();
  const { setBackingtrackNoteIds, replaceTargetSharpNoteNames } =
    useMusicStore.getState();

  restoreCurrentBrick({
    baseChordDataKey: brick.baseChordDataKey,
    unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
    semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
    selectedShapesVariantDataKeys: brickToSelectedShapes(brick),
  });

  const noteIds = brickToBackingtrackNoteIds(brick);
  if (noteIds.length > 0) {
    setBackingtrackNoteIds(noteIds);
  }

  if (nextBrick) {
    restoreNextBrick({
      nextBaseChordDataKey: nextBrick.baseChordDataKey,
      nextUnifiedMusicKeysDataKey: nextBrick.unifiedMusicKeysDataKey,
      nextSemitoneOffsetFromMajorRoot: nextBrick.semitoneOffsetFromMajorRoot,
      nextSelectedShapesVariantDataKeys: brickToSelectedShapes(nextBrick),
    });

    const sharpNoteNames = resolveTargetSharpNoteNames(
      nextBrick.unifiedMusicKeysDataKey,
      nextBrick.baseChordDataKey,
      nextBrick.guitarShapeDataKey,
      nextBrick.semitoneOffsetFromMajorRoot,
      nextBrick.targetNoteIndices ?? [1],
    );
    replaceTargetSharpNoteNames(sharpNoteNames);
  }
};
