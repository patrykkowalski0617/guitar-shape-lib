import { useCallback, useEffect } from "react";
import { useMetronome } from "./useMetronome";
import { usePlayerStore, useMusicStore } from "@/store";

export function usePlayer() {
  const setLockedShapeVariantLocationData = useMusicStore((state) => state.setLockedShapeVariantLocationData);

  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);

  const bpm = usePlayerStore((state) => state.bpm);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const addBrickStore = usePlayerStore((state) => state.addBrick);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);
  const setBpm = usePlayerStore((state) => state.setBpm);

  const nextStep = usePlayerStore((state) => state.nextStep);
  const handleTick = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const { toggleMetronome } = useMetronome(bpm, handleTick);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);

  const addBrick = () => {
    addBrickStore(() => setLockedShapeVariantLocationData(currentShapeVariantLocationData));
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) setBpm(value);
  };

  const closeEdit = () => {
    setActiveBrickId(null);
    setLockedShapeVariantLocationData(null);
  };

  return {
    addBrick,
    handleBpmChange,
    closeEdit,
  };
}
