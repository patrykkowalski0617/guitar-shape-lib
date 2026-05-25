import { useEffect, useRef } from "react";
import { useMetronomeStore, useShapePlayerStore } from "@/store";
import { calculateActiveBrick } from "../utils";
import { applyBrickChange } from "../utils/applyBrickChange";

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
