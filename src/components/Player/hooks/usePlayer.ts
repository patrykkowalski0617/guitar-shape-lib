import { useCallback, useEffect } from "react";
import { useMetronome } from "./useMetronome";
import { usePlayerStore, useMusicStore, useControlsStore } from "@/store";
import { useShapeRootNote } from "@/hooks";
import { shapes, type Shapes } from "@/data";

export function usePlayer() {
  const setShapeVariantLocationData_ghost = useMusicStore((state) => state.setShapeVariantLocationData_ghost);
  const setShapeVariantLocationData = useMusicStore((state) => state.setShapeVariantLocationData);

  const shapeVariantLocationData = useMusicStore((state) => state.shapeVariantLocationData);
  const bpm = usePlayerStore((state) => state.bpm);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isCountingIn = usePlayerStore((state) => state.isCountingIn);
  const bricks = usePlayerStore((state) => state.bricks);

  const tuneKeyId = useControlsStore((s) => s.tuneKeyId);
  const isMajorMode = useControlsStore((s) => s.isMajorMode);
  const roleId = useControlsStore((s) => s.roleId);
  const shapeId = useControlsStore((s) => s.shapeId);
  const shapeSemitoneOffsetFromC = useControlsStore((s) => s.shapeSemitoneOffsetFromC);
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
        setShapeVariantLocationData(null);
        setShapeVariantLocationData_ghost(firstBrick.snapshot.shapeVariantLocationData);
      }
    }
  }, [isPlaying, isCountingIn, bricks, setShapeVariantLocationData_ghost, setShapeVariantLocationData]);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);

  const addBrick = () => {
    const activeShape = shapes[shapeId as keyof Shapes] || null;

    const initialSnapshot = {
      keyId: tuneKeyId,
      isMajorMode,
      roleId,
      shapeVariantLocationData,
      rootNote: activeRootNote,
      shapeLabel: activeShape?.label,
      shapeSemitoneOffsetFromC,
      shapeId,
    };

    usePlayerStore.getState().addBrick(initialSnapshot);

    setShapeVariantLocationData_ghost(shapeVariantLocationData);
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) usePlayerStore.getState().setBpm(value);
  };

  const closeEdit = () => {
    usePlayerStore.getState().setActiveBrickId(null);
    setShapeVariantLocationData_ghost(null);
  };

  return {
    addBrick,
    handleBpmChange,
    closeEdit,
  };
}
