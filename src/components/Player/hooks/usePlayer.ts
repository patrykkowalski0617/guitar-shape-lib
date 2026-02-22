import { useState, useCallback, useEffect } from "react";
import { useMetronome } from "./useMetronome";
import { useMusicStore } from "@/store/useMusicStore";

export function usePlayer() {
  const setLockedShapeVariantLocationData = useMusicStore((state) => state.setLockedShapeVariantLocationData);
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);

  const [bricks, setBricks] = useState<{ id: number; width: number }[]>([]);
  const [activeBrickId, setActiveBrickId] = useState<number | null>(null);
  const [bpm, setBpm] = useState<number>(70);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTick = useCallback(() => {
    console.log("Tick at BPM:", bpm);
  }, [bpm]);

  const { toggleMetronome } = useMetronome(bpm, handleTick);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);

  const addBrick = () => {
    setLockedShapeVariantLocationData(currentShapeVariantLocationData);
    const newId = Date.now();
    setBricks((prev) => [...prev, { id: newId, width: 4 }]);
    setActiveBrickId(newId);
  };

  const removeBrick = (idToRemove: number) => {
    setBricks((prev) => prev.filter((b) => b.id !== idToRemove));
    if (activeBrickId === idToRemove) setActiveBrickId(null);
  };

  const updateBrickWidth = (id: number, newWidth: number) => {
    setBricks((prev) => prev.map((b) => (b.id === id ? { ...b, width: Math.max(1, Math.min(8, newWidth)) } : b)));
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) setBpm(Math.max(20, Math.min(360, value)));
  };

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const closeEdit = () => {
    setActiveBrickId(null);
    setLockedShapeVariantLocationData(null);
  };

  return {
    bricks,
    activeBrickId,
    setActiveBrickId,
    bpm,
    isPlaying,
    addBrick,
    removeBrick,
    updateBrickWidth,
    handleBpmChange,
    togglePlay,
    closeEdit,
    setLockedShapeVariantLocationData,
  };
}
