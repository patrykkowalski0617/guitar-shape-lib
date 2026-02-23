import { useCallback, useEffect } from "react";
import { useMetronome } from "./useMetronome";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";

export function usePlayer() {
  const setLockedShapeVariantLocationData = useMusicStore((state) => state.setLockedShapeVariantLocationData);

  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);

  const bricks = usePlayerStore((state) => state.bricks);
  const activeBrickId = usePlayerStore((state) => state.activeBrickId);
  const bpm = usePlayerStore((state) => state.bpm);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const addBrickStore = usePlayerStore((state) => state.addBrick);
  const removeBrick = usePlayerStore((state) => state.removeBrick);
  const updateBrickWidth = usePlayerStore((state) => state.updateBrickWidth);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);
  const setBpm = usePlayerStore((state) => state.setBpm);
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  const handleTick = useCallback(() => {
    console.log("Tick at BPM:", bpm);
  }, [bpm]);

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
    bricks,
    activeBrickId,
    bpm,
    isPlaying,
    addBrick,
    removeBrick,
    updateBrickWidth,
    handleBpmChange,
    togglePlay,
    closeEdit,
    setActiveBrickId,
  };
}
