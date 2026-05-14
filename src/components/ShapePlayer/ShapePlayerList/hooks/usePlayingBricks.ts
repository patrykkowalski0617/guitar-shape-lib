import { useCallback, useEffect, useRef } from "react";
import {
  useMetronomeStore,
  useShapePlayerStore,
  type ShapePlayerBrick,
} from "@/store";
import { useShapePlayerBrickSelection } from "../../ShapePlayerBrick/hooks";
import { useMetronome } from "@/components/Player/hooks";

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
  if (shouldSkipCalculation) return null;

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

export function usePlayingBricksEngine() {
  const bpm = useMetronomeStore((state) => state.bpm);
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const bricks = useShapePlayerStore((state) => state.shapePlayerBricks);
  const nextStep = useMetronomeStore((state) => state.nextStep);

  const handleTick = useCallback(() => {
    return nextStep(bricks);
  }, [nextStep, bricks]);

  const { toggleMetronome } = useMetronome(bpm, handleTick);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);
}

export function usePlayingBricksData() {
  const currentStep = useMetronomeStore((state) => state.currentStep);
  const isCountingIn = useMetronomeStore((state) => state.isCountingIn);
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const bricks = useShapePlayerStore((state) => state.shapePlayerBricks);

  const lastProcessedStepRef = useRef<number | null>(null);

  const activeBrickInfo = calculateActiveBrick(
    bricks,
    currentStep,
    isCountingIn,
  );

  const currentSelection = useShapePlayerBrickSelection(activeBrickInfo?.brick);
  const firstBrickSelection = useShapePlayerBrickSelection(bricks[0]);

  /**
   * EFEKT 1: Przywracanie danych przy zmianie cegiełki (Restore)
   */
  useEffect(() => {
    if (!isPlaying || !activeBrickInfo?.isFirstBeatOfBrick) {
      return;
    }

    if (lastProcessedStepRef.current === currentStep) {
      return;
    }

    currentSelection.restoreData();

    lastProcessedStepRef.current = currentStep;
  }, [
    currentStep,
    isPlaying,
    activeBrickInfo?.isFirstBeatOfBrick,
    activeBrickInfo?.brick.id,
    currentSelection,
  ]);

  /**
   * EFEKT 2: Przygotowanie pierwszej cegiełki podczas Count-in
   */
  const hasPreparedCountInRef = useRef(false);
  useEffect(() => {
    if (!isPlaying) {
      hasPreparedCountInRef.current = false;
      lastProcessedStepRef.current = null;
      return;
    }

    const canPrepare =
      isCountingIn && !hasPreparedCountInRef.current && bricks[0];
    if (canPrepare) {
      firstBrickSelection.restoreData();
      hasPreparedCountInRef.current = true;
    }
  }, [isPlaying, isCountingIn, bricks, firstBrickSelection]);

  return {
    activeBrickId: activeBrickInfo?.brick.id,
    activeBeatIndex: activeBrickInfo?.beatInsideBrick,
  };
}
