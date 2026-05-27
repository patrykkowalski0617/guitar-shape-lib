import { useCallback, useEffect, useMemo } from "react";
import { useMetronomeStore, useShapePlayerStore } from "@/store";
import { useMetronome } from "../../hooks/useMetronome";
import { metronomeInstance } from "@/components/metronome/metronomeInstance";
import type { ScheduledEvent } from "@/components/metronome/ScheduledEventQueue";
import type { ShapePlayerBrick } from "@/store";
import { applyBrickChange } from "../utils/applyBrickChange";

export const usePlayingBricksEngine = () => {
  const bpm = useMetronomeStore((s) => s.bpm);
  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const guitarShapePlayerBricks = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks,
  );
  const playbackRange = useShapePlayerStore((s) => s.playbackRange);
  const peekNextStep = useMetronomeStore((s) => s.peekNextStep);
  const applyStep = useMetronomeStore((s) => s.applyStep);

  const playableBricks = useMemo(() => {
    if (!playbackRange) return guitarShapePlayerBricks;
    const sliceStart = playbackRange.start;
    const sliceEnd = playbackRange.end + 1;
    return guitarShapePlayerBricks.slice(sliceStart, sliceEnd);
  }, [guitarShapePlayerBricks, playbackRange]);

  const handleTick = useCallback(() => {
    return peekNextStep(playableBricks);
  }, [peekNextStep, playableBricks]);

  const handleUIEvent = useCallback(
    (event: ScheduledEvent) => {
      applyStep(event);

      if (!event.isCountingIn && event.isNewBrick) {
        const storeState = useShapePlayerStore.getState();
        const allBricks = storeState.guitarShapePlayerBricks;
        const currentPlaybackRange = storeState.playbackRange;

        const activePlayableBricks = currentPlaybackRange
          ? allBricks.slice(
              currentPlaybackRange.start,
              currentPlaybackRange.end + 1,
            )
          : allBricks;

        const currentStep = event.currentStep ?? 0;

        let accumulated = 0;
        let activeBrick: ShapePlayerBrick | undefined;
        let activeBrickIndex = -1;

        for (let i = 0; i < activePlayableBricks.length; i++) {
          if (currentStep === accumulated) {
            activeBrick = activePlayableBricks[i];
            activeBrickIndex = i;
            break;
          }
          accumulated += activePlayableBricks[i].playLength;
        }

        if (activeBrick) {
          const nextBrickIndex =
            (activeBrickIndex + 1) % activePlayableBricks.length;
          const nextBrick = activePlayableBricks[nextBrickIndex];
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
};
