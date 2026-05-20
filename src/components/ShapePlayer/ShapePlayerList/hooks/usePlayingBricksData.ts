import { useEffect, useRef } from "react";
import {
  useControllersStore,
  useMetronomeStore,
  useShapePlayerStore,
  useMusicStore,
} from "@/store";
import { useShapePlayerBrickSelection } from "../../ShapePlayerBrick/hooks";
import { calculateActiveBrick, getTotalSteps } from "./utils";

export function usePlayingBricksData() {
  const lookAheadTargetNoteBeatsAmount = useControllersStore(
    (state) => state.lookAheadTargetNoteBeatsAmount,
  );
  const currentStep = useMetronomeStore((state) => state.currentStep);
  const isCountingIn = useMetronomeStore((state) => state.isCountingIn);
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );
  const replaceTargetSharpNoteNames = useMusicStore(
    (state) => state.replaceTargetSharpNoteNames,
  );

  const lastProcessedStepRef = useRef<number | null>(null);
  const lookAheadTargetNoteProcessedStepRef = useRef<number | null>(null);

  const activeBrickInfo = calculateActiveBrick(
    guitarShapePlayerBricks,
    currentStep,
    isCountingIn,
  );

  const totalSteps = getTotalSteps(guitarShapePlayerBricks);

  const lookAheadTargetNoteStep =
    totalSteps > 0
      ? (currentStep + lookAheadTargetNoteBeatsAmount) % totalSteps
      : currentStep + lookAheadTargetNoteBeatsAmount;

  const lookAheadTargetNoteBrickInfo = calculateActiveBrick(
    guitarShapePlayerBricks,
    lookAheadTargetNoteStep,
    isCountingIn,
  );

  const currentSelection = useShapePlayerBrickSelection(
    activeBrickInfo?.guitarShapePlayerBrick,
  );
  const lookAheadTargetNoteSelection = useShapePlayerBrickSelection(
    lookAheadTargetNoteBrickInfo?.guitarShapePlayerBrick,
  );
  const firstBrickSelection = useShapePlayerBrickSelection(
    guitarShapePlayerBricks[0],
  );

  // Efekt dla current (bez offsetu) - visual + sound
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

  // Efekt dla target note + target shape lookahead
  useEffect(() => {
    if (!isPlaying || !lookAheadTargetNoteBrickInfo?.isFirstBeatOfBrick) {
      return;
    }

    if (
      lookAheadTargetNoteProcessedStepRef.current === lookAheadTargetNoteStep
    ) {
      return;
    }

    const targetNotes =
      lookAheadTargetNoteBrickInfo.guitarShapePlayerBrick
        .targetSharpNoteNames ?? [];
    replaceTargetSharpNoteNames(targetNotes);

    // Ustawiamy next* klucze dla target shape validation
    lookAheadTargetNoteSelection.restoreNextData();

    lookAheadTargetNoteProcessedStepRef.current = lookAheadTargetNoteStep;
  }, [
    lookAheadTargetNoteStep,
    isPlaying,
    lookAheadTargetNoteBrickInfo?.isFirstBeatOfBrick,
    lookAheadTargetNoteBrickInfo?.guitarShapePlayerBrick.id,
    lookAheadTargetNoteBrickInfo?.guitarShapePlayerBrick.targetSharpNoteNames,
    replaceTargetSharpNoteNames,
    lookAheadTargetNoteSelection,
  ]);

  const hasPreparedCountInRef = useRef(false);
  useEffect(() => {
    if (!isPlaying) {
      hasPreparedCountInRef.current = false;
      lastProcessedStepRef.current = null;
      lookAheadTargetNoteProcessedStepRef.current = null;
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
