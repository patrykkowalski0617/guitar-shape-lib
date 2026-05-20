import { useEffect, useRef } from "react";
import { useMetronomeStore, useShapePlayerStore, useMusicStore } from "@/store";
import { useShapePlayerBrickSelection } from "../../ShapePlayerBrick/hooks";
import { calculateActiveBrick } from "./utils";

export function usePlayingBricksData() {
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

  const nextBrick = (() => {
    if (!activeBrickInfo || guitarShapePlayerBricks.length === 0)
      return undefined;

    const currentIndex = guitarShapePlayerBricks.findIndex(
      (brick) => brick.id === activeBrickInfo.guitarShapePlayerBrick.id,
    );

    if (currentIndex === -1) return undefined;

    const nextIndex = (currentIndex + 1) % guitarShapePlayerBricks.length;
    return guitarShapePlayerBricks[nextIndex];
  })();

  const nextBrickSelection = useShapePlayerBrickSelection(nextBrick);

  // Define this at the top level as well
  const firstNextBrick =
    guitarShapePlayerBricks[1] || guitarShapePlayerBricks[0];
  const firstNextSelection = useShapePlayerBrickSelection(firstNextBrick);

  useEffect(() => {
    if (!isPlaying || !activeBrickInfo?.isFirstBeatOfBrick) {
      return;
    }

    if (lastProcessedStepRef.current === currentStep) {
      return;
    }

    currentSelection.restoreData();

    if (nextBrick) {
      nextBrickSelection.restoreNextData();
      const targetNotes = nextBrick.targetSharpNoteNames ?? [];
      replaceTargetSharpNoteNames(targetNotes);
    }

    lastProcessedStepRef.current = currentStep;
  }, [
    currentStep,
    isPlaying,
    activeBrickInfo?.isFirstBeatOfBrick,
    activeBrickInfo?.guitarShapePlayerBrick.id,
    currentSelection,
    nextBrickSelection,
    nextBrick,
    replaceTargetSharpNoteNames,
  ]);

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
      firstNextSelection.restoreNextData();
      const targetNotes = firstNextBrick.targetSharpNoteNames ?? [];
      replaceTargetSharpNoteNames(targetNotes);

      hasPreparedCountInRef.current = true;
    }
  }, [
    isPlaying,
    isCountingIn,
    guitarShapePlayerBricks,
    firstBrickSelection,
    firstNextSelection,
    firstNextBrick,
    replaceTargetSharpNoteNames,
  ]);

  return {
    activeBrickId: activeBrickInfo?.guitarShapePlayerBrick.id,
    activeBeatIndex: activeBrickInfo?.beatInsideBrick,
  };
}
