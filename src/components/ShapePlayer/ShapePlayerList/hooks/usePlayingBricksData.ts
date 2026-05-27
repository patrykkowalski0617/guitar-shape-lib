import { useEffect, useRef, useMemo } from "react";
import { useMetronomeStore, useShapePlayerStore } from "@/store";
import { calculateActiveBrick } from "../utils";
import { applyBrickChange } from "../utils/applyBrickChange";

export function usePlayingBricksData(id: string) {
  const currentStep = useMetronomeStore((s) => s.currentStep);
  const isCountingIn = useMetronomeStore((s) => s.isCountingIn);
  const isPlaying = useMetronomeStore((s) => s.isPlaying);

  const guitarShapePlayerBricks = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks,
  );
  const playbackRange = useShapePlayerStore((s) => s.playbackRange);

  const hasPreparedCountInRef = useRef(false);

  const playableBricks = useMemo(() => {
    if (!playbackRange) return guitarShapePlayerBricks;
    return guitarShapePlayerBricks.slice(
      playbackRange.start,
      playbackRange.end + 1,
    );
  }, [guitarShapePlayerBricks, playbackRange]);

  const activeBrickInfo = calculateActiveBrick(
    playableBricks,
    currentStep,
    isCountingIn,
  );

  const isCurrentBrickPlayed =
    activeBrickInfo?.guitarShapePlayerBrick.id === id && isPlaying;

  useEffect(() => {
    if (!isPlaying) {
      hasPreparedCountInRef.current = false;
      return;
    }

    if (
      isCountingIn &&
      !hasPreparedCountInRef.current &&
      playableBricks.length > 0
    ) {
      const firstBrick = playableBricks[0];
      const secondBrick = playableBricks[1] ?? playableBricks[0];
      applyBrickChange(firstBrick, secondBrick);
      hasPreparedCountInRef.current = true;
    }
  }, [isPlaying, isCountingIn, playableBricks]);

  const activeBeatIndex = isCurrentBrickPlayed
    ? activeBrickInfo?.beatInsideBrick
    : undefined;

  return {
    isCurrentBrickPlayed,
    activeBeatIndex,
  };
}
