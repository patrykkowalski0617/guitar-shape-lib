import { useCallback, useEffect } from "react";
import { useMetronome } from "./useMetronome";
import { usePlayerStore, useMusicStore } from "@/store";
import { useAddBrick } from "../PlayerBricksContainer/PlayerBricksContainerControls/AddBrickButton/hooks/useAddBrick";

export function usePlayer() {
  const setShapeVariantLocationData_ghost = useMusicStore((state) => state.setShapeVariantLocationData_ghost);
  const setShapeVariantLocationData = useMusicStore((state) => state.setShapeVariantLocationData);

  const bpm = usePlayerStore((state) => state.bpm);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isCountingIn = usePlayerStore((state) => state.isCountingIn);
  const bricks = usePlayerStore((state) => state.bricks);

  const nextStep = usePlayerStore((state) => state.nextStep);
  const handleTick = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const { toggleMetronome } = useMetronome(bpm, handleTick);
  const { addBrick } = useAddBrick();

  useEffect(() => {
    const isReadyToSetGhost = isPlaying && isCountingIn;
    const firstBrick = bricks[0];

    if (isReadyToSetGhost && firstBrick?.snapshot) {
      setShapeVariantLocationData(null);
      setShapeVariantLocationData_ghost(firstBrick.snapshot.shapeVariantLocationData);
    }
  }, [isPlaying, isCountingIn, bricks, setShapeVariantLocationData_ghost, setShapeVariantLocationData]);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isValidNumber = !isNaN(value);

    if (isValidNumber) {
      usePlayerStore.getState().setBpm(value);
    }
  };

  const closeEdit = () => {
    const playerStore = usePlayerStore.getState();
    playerStore.setActiveBrickId(null);
    setShapeVariantLocationData_ghost(null);
  };

  return {
    addBrick,
    handleBpmChange,
    closeEdit,
  };
}
