import { useCallback, useEffect, useRef } from "react";
import {
  useMetronomeStore,
  useShapePlayerStore,
  type ShapePlayerBrick,
} from "@/store";
import { useShapePlayerBrickSelection } from "../../ShapePlayerBrick/hooks";
import { useMetronome } from "../../hooks/useMetronome";

interface ActiveBrickCalculation {
  brick: ShapePlayerBrick;
  isFirstBeatOfBrick: boolean;
  beatInsideBrick: number;
}

const calculateActiveBrick = (
  shapePlayerBricks: ShapePlayerBrick[],
  currentStep: number,
  isCountingIn: boolean,
): ActiveBrickCalculation | null => {
  const shouldSkipCalculation = isCountingIn || shapePlayerBricks.length === 0;
  if (shouldSkipCalculation) return null;

  let accumulatedSteps = 0;
  for (const brick of shapePlayerBricks) {
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
  const shapePlayerBricks = useShapePlayerStore(
    (state) => state.shapePlayerBricks,
  );
  const nextStep = useMetronomeStore((state) => state.nextStep);

  const handleTick = useCallback(() => {
    return nextStep(shapePlayerBricks);
  }, [nextStep, shapePlayerBricks]);

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
  const shapePlayerBricks = useShapePlayerStore(
    (state) => state.shapePlayerBricks,
  );

  const lastProcessedStepRef = useRef<number | null>(null);

  const activeBrickInfo = calculateActiveBrick(
    shapePlayerBricks,
    currentStep,
    isCountingIn,
  );

  const currentSelection = useShapePlayerBrickSelection(activeBrickInfo?.brick);
  const firstBrickSelection = useShapePlayerBrickSelection(
    shapePlayerBricks[0],
  );

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
      isCountingIn && !hasPreparedCountInRef.current && shapePlayerBricks[0];
    if (canPrepare) {
      firstBrickSelection.restoreData();
      hasPreparedCountInRef.current = true;
    }
  }, [isPlaying, isCountingIn, shapePlayerBricks, firstBrickSelection]);

  return {
    activeBrickId: activeBrickInfo?.brick.id,
    activeBeatIndex: activeBrickInfo?.beatInsideBrick,
  };
}
