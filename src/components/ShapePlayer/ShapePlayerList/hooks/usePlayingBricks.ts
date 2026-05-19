import { useCallback, useEffect, useRef } from "react";
import {
  useMetronomeStore,
  useShapePlayerStore,
  type ShapePlayerBrick,
} from "@/store";
import { useShapePlayerBrickSelection } from "../../ShapePlayerBrick/hooks";
import { useMetronome } from "../../hooks/useMetronome";

interface ActiveBrickCalculation {
  guitarShapePlayerBrick: ShapePlayerBrick;
  isFirstBeatOfBrick: boolean;
  beatInsideBrick: number;
}

const calculateActiveBrick = (
  guitarShapePlayerBricks: ShapePlayerBrick[],
  currentStep: number,
  isCountingIn: boolean,
): ActiveBrickCalculation | null => {
  const shouldSkipCalculation =
    isCountingIn || guitarShapePlayerBricks.length === 0;
  if (shouldSkipCalculation) return null;

  let accumulatedSteps = 0;
  for (const guitarShapePlayerBrick of guitarShapePlayerBricks) {
    const startOfBrick = accumulatedSteps;
    const endOfBrick = accumulatedSteps + guitarShapePlayerBrick.playLength;
    const isStepInsideBrick =
      currentStep >= startOfBrick && currentStep < endOfBrick;

    if (isStepInsideBrick) {
      return {
        guitarShapePlayerBrick,
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
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );
  const nextStep = useMetronomeStore((state) => state.nextStep);

  const handleTick = useCallback(() => {
    return nextStep(guitarShapePlayerBricks);
  }, [nextStep, guitarShapePlayerBricks]);

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
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );

  const lastProcessedStepRef = useRef<number | null>(null);

  const activeBrickInfo = calculateActiveBrick(
    guitarShapePlayerBricks,
    currentStep,
    isCountingIn,
  );

  const currentSelection = useShapePlayerBrickSelection(
    activeBrickInfo?.guitarShapePlayerBrick,
  );
  const firstBrickSelection = useShapePlayerBrickSelection(
    guitarShapePlayerBricks[0],
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
    activeBrickInfo?.guitarShapePlayerBrick.id,
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
      isCountingIn &&
      !hasPreparedCountInRef.current &&
      guitarShapePlayerBricks[0];
    if (canPrepare) {
      firstBrickSelection.restoreData();
      hasPreparedCountInRef.current = true;
    }
  }, [isPlaying, isCountingIn, guitarShapePlayerBricks, firstBrickSelection]);

  return {
    activeBrickId: activeBrickInfo?.guitarShapePlayerBrick.id,
    activeBeatIndex: activeBrickInfo?.beatInsideBrick,
  };
}
