import { useCallback, useEffect, useRef } from "react";
import { useMetronome } from "./useMetronome";
import { useMetronomeStore, useShapePlayerStore } from "@/store";
import { useShapePlayerBrickSelection } from "../ShapePlayerBrick/hooks";
import type { ShapePlayerBrick } from "@/store";

interface ActiveBrickCalculation {
  brick: ShapePlayerBrick;
  isFirstBeatOfBrick: boolean;
  beatInsideBrick: number;
}

const calculateActiveBrick = (
  bricks: ShapePlayerBrick[],
  currentStep: number,
  isCountingIn: boolean,
): ActiveBrickCalculation | null => {
  const shouldSkipCalculation = isCountingIn || bricks.length === 0;

  if (shouldSkipCalculation) {
    return null;
  }

  let accumulatedSteps = 0;

  for (const brick of bricks) {
    const startOfBrick = accumulatedSteps;
    const endOfBrick = accumulatedSteps + brick.playLength;
    const isStepInsideBrick =
      currentStep >= startOfBrick && currentStep < endOfBrick;

    if (isStepInsideBrick) {
      return {
        brick,
        isFirstBeatOfBrick: currentStep === startOfBrick,
        beatInsideBrick: currentStep - startOfBrick,
      };
    }

    accumulatedSteps = endOfBrick;
  }

  return null;
};

export function usePlayingBricks() {
  const bpm = useMetronomeStore((state) => state.bpm);
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const isCountingIn = useMetronomeStore((state) => state.isCountingIn);
  const currentStep = useMetronomeStore((state) => state.currentStep);

  const bricks = useShapePlayerStore((state) => state.shapePlayerBricks);
  const nextStep = useMetronomeStore((state) => state.nextStep);

  const activeBrickInfo = calculateActiveBrick(
    bricks,
    currentStep,
    isCountingIn,
  );

  const currentSelection = useShapePlayerBrickSelection(activeBrickInfo?.brick);

  const firstBrick = bricks[0];
  const firstBrickSelection = useShapePlayerBrickSelection(firstBrick);

  useEffect(() => {
    const shouldRestoreData = activeBrickInfo?.isFirstBeatOfBrick;

    if (shouldRestoreData) {
      currentSelection.restoreData();
    }
  }, [
    activeBrickInfo?.isFirstBeatOfBrick,
    activeBrickInfo?.brick.id,
    currentSelection,
  ]);

  const hasPreparedCountInRef = useRef(false);

  useEffect(() => {
    if (!isPlaying) {
      hasPreparedCountInRef.current = false;
      return;
    }

    const canPrepareCountIn =
      isCountingIn && !hasPreparedCountInRef.current && firstBrick;

    if (canPrepareCountIn) {
      firstBrickSelection.restoreData();
      hasPreparedCountInRef.current = true;
    }
  }, [isPlaying, isCountingIn, firstBrick, firstBrickSelection]);

  const handleTick = useCallback(() => {
    return nextStep(bricks);
  }, [nextStep, bricks]);

  const { toggleMetronome } = useMetronome(bpm, handleTick);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);

  return {
    activeBrickId: activeBrickInfo?.brick.id,
    activeBeatIndex: activeBrickInfo?.beatInsideBrick,
  };
}
