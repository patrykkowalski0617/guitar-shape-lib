import { useEffect, useRef } from "react";
import { useMetronomeStore, useShapePlayerStore } from "@/store";
import { calculateActiveBrick } from "../utils";
import { brickToBackingtrackNoteIds } from "@/utils/brickToBackingtrackNoteIds";
import { brickToSelectedShapes } from "@/utils/brickToSelectedShapes";
import { useMusicStore, useDataKeyStore } from "@/store";
import type { ShapePlayerBrick } from "@/store";

const applyBrickChange = (
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
    replaceTargetSharpNoteNames(nextBrick.targetSharpNoteNames ?? []);
  }
};

export function usePlayingBricksData() {
  const currentStep = useMetronomeStore((state) => state.currentStep);
  const isCountingIn = useMetronomeStore((state) => state.isCountingIn);
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );

  const hasPreparedCountInRef = useRef(false);

  const activeBrickInfo = calculateActiveBrick(
    guitarShapePlayerBricks,
    currentStep,
    isCountingIn,
  );

  useEffect(() => {
    if (!isPlaying) {
      hasPreparedCountInRef.current = false;
      return;
    }

    if (
      isCountingIn &&
      !hasPreparedCountInRef.current &&
      guitarShapePlayerBricks[0]
    ) {
      const firstBrick = guitarShapePlayerBricks[0];
      const secondBrick =
        guitarShapePlayerBricks[1] ?? guitarShapePlayerBricks[0];
      applyBrickChange(firstBrick, secondBrick);
      hasPreparedCountInRef.current = true;
    }
  }, [isPlaying, isCountingIn, guitarShapePlayerBricks]);

  return {
    activeBrickId: activeBrickInfo?.guitarShapePlayerBrick.id,
    activeBeatIndex: activeBrickInfo?.beatInsideBrick,
  };
}
