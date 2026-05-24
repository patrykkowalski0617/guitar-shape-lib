import { useCallback, useEffect } from "react";
import { useMetronomeStore, useShapePlayerStore } from "@/store";
import { useMetronome } from "../../hooks/useMetronome";
import { metronomeInstance } from "@/components/metronome/metronomeInstance";
import { brickToBackingtrackNoteIds } from "@/utils/brickToBackingtrackNoteIds";
import { brickToSelectedShapes } from "@/utils/brickToSelectedShapes";
import { useMusicStore, useDataKeyStore } from "@/store";
import type { ScheduledEvent } from "@/components/metronome/ScheduledEventQueue";
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

export function usePlayingBricksEngine() {
  const bpm = useMetronomeStore((state) => state.bpm);
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );
  const peekNextStep = useMetronomeStore((state) => state.peekNextStep);
  const applyStep = useMetronomeStore((state) => state.applyStep);

  const handleTick = useCallback(() => {
    return peekNextStep(guitarShapePlayerBricks);
  }, [peekNextStep, guitarShapePlayerBricks]);

  const handleUIEvent = useCallback(
    (event: ScheduledEvent) => {
      applyStep(event);

      if (!event.isCountingIn && event.isNewBrick) {
        const bricks = useShapePlayerStore.getState().guitarShapePlayerBricks;
        const currentStep = event.currentStep ?? 0;

        let accumulated = 0;
        let activeBrick: ShapePlayerBrick | undefined;
        let activeBrickIndex = -1;

        for (let i = 0; i < bricks.length; i++) {
          if (currentStep === accumulated) {
            activeBrick = bricks[i];
            activeBrickIndex = i;
            break;
          }
          accumulated += bricks[i].playLength;
        }

        if (activeBrick) {
          const nextBrick = bricks[(activeBrickIndex + 1) % bricks.length];
          applyBrickChange(activeBrick, nextBrick);
        }
      }
    },
    [applyStep],
  );

  useEffect(() => {
    metronomeInstance.setUIEventCallback(handleUIEvent);
  }, [handleUIEvent]);

  const { toggleMetronome } = useMetronome(bpm, handleTick);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);
}
