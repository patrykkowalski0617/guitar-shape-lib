import { useCallback, useEffect } from "react";
import { useMetronome } from "./useMetronome";
import { usePlayerStore, useMusicStore, useControlsStore } from "@/store";
import { useShapeRootNote } from "@/hooks";
import { shapes, type Shapes } from "@/data";

export function usePlayer() {
  const setLockedShapeVariantLocationData = useMusicStore((state) => state.setLockedShapeVariantLocationData);
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);
  const bpm = usePlayerStore((state) => state.bpm);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isCountingIn = usePlayerStore((state) => state.isCountingIn);
  const bricks = usePlayerStore((state) => state.bricks);

  const currentKeyId = useControlsStore((s) => s.currentKeyId);
  const isMajorMode = useControlsStore((s) => s.isMajorMode);
  const currentRoleId = useControlsStore((s) => s.currentRoleId);
  const currentShapeId = useControlsStore((s) => s.currentShapeId);
  const currentShapeSemitoneOffsetFromC = useControlsStore((s) => s.currentShapeSemitoneOffsetFromC);
  const activeRootNote = useShapeRootNote();

  const nextStep = usePlayerStore((state) => state.nextStep);
  const handleTick = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const { toggleMetronome } = useMetronome(bpm, handleTick);

  useEffect(() => {
    if (isPlaying && isCountingIn) {
      const firstBrick = bricks[0];
      if (firstBrick?.snapshot) {
        setCurrentShapeVariantLocationData(null);
        setLockedShapeVariantLocationData(firstBrick.snapshot.currentShapeVariantLocationData);
      }
    }
  }, [isPlaying, isCountingIn, bricks, setLockedShapeVariantLocationData, setCurrentShapeVariantLocationData]);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);

  const addBrick = () => {
    const activeShape = shapes[currentShapeId as keyof Shapes] || null;

    const initialSnapshot = {
      keyId: currentKeyId,
      isMajorMode,
      currentRoleId,
      currentShapeVariantLocationData,
      rootNote: activeRootNote,
      shapeLabel: activeShape?.label,
      currentShapeSemitoneOffsetFromC,
      currentShapeId,
    };

    usePlayerStore.getState().addBrick(initialSnapshot);

    setLockedShapeVariantLocationData(currentShapeVariantLocationData);
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) usePlayerStore.getState().setBpm(value);
  };

  const closeEdit = () => {
    usePlayerStore.getState().setActiveBrickId(null);
    setLockedShapeVariantLocationData(null);
  };

  return {
    addBrick,
    handleBpmChange,
    closeEdit,
  };
}
