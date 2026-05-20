import { useCallback, useEffect, useRef } from "react";
import {
  useControllersStore,
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

const getTotalSteps = (guitarShapePlayerBricks: ShapePlayerBrick[]): number =>
  guitarShapePlayerBricks.reduce((acc, brick) => acc + brick.playLength, 0);

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
  const lookAheadShapeBeatsAmount = useControllersStore(
    (state) => state.lookAheadShapeBeatsAmount,
  );
  const currentStep = useMetronomeStore((state) => state.currentStep);
  const isCountingIn = useMetronomeStore((state) => state.isCountingIn);
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );

  const lastProcessedStepRef = useRef<number | null>(null);
  const lookAheadShapeProcessedStepRef = useRef<number | null>(null);

  const activeBrickInfo = calculateActiveBrick(
    guitarShapePlayerBricks,
    currentStep,
    isCountingIn,
  );

  const totalSteps = getTotalSteps(guitarShapePlayerBricks);
  const lookAheadShapeStep =
    totalSteps > 0
      ? (currentStep + lookAheadShapeBeatsAmount) % totalSteps
      : currentStep + lookAheadShapeBeatsAmount;

  const lookAheadShapeBrickInfo = calculateActiveBrick(
    guitarShapePlayerBricks,
    lookAheadShapeStep,
    isCountingIn,
  );

  const currentSelection = useShapePlayerBrickSelection(
    activeBrickInfo?.guitarShapePlayerBrick,
  );
  const lookAheadShapeSelection = useShapePlayerBrickSelection(
    lookAheadShapeBrickInfo?.guitarShapePlayerBrick,
  );
  const firstBrickSelection = useShapePlayerBrickSelection(
    guitarShapePlayerBricks[0],
  );

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

  useEffect(() => {
    if (!isPlaying || !lookAheadShapeBrickInfo?.isFirstBeatOfBrick) {
      return;
    }

    if (lookAheadShapeProcessedStepRef.current === lookAheadShapeStep) {
      return;
    }

    lookAheadShapeSelection.restoreNextData();

    lookAheadShapeProcessedStepRef.current = lookAheadShapeStep;
  }, [
    lookAheadShapeStep,
    isPlaying,
    lookAheadShapeBrickInfo?.isFirstBeatOfBrick,
    lookAheadShapeBrickInfo?.guitarShapePlayerBrick.id,
    lookAheadShapeSelection,
  ]);

  const hasPreparedCountInRef = useRef(false);
  useEffect(() => {
    if (!isPlaying) {
      hasPreparedCountInRef.current = false;
      lastProcessedStepRef.current = null;
      lookAheadShapeProcessedStepRef.current = null;
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
