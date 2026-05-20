import { useEffect, useRef } from "react";
import {
  useControllersStore,
  useMetronomeStore,
  useShapePlayerStore,
} from "@/store";
import { useShapePlayerBrickSelection } from "../../ShapePlayerBrick/hooks";
import { calculateActiveBrick, getTotalSteps } from "./utils";

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
