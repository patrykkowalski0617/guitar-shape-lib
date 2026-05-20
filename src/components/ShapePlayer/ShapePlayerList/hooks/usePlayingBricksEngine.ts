import { useCallback, useEffect } from "react";
import { useMetronomeStore, useShapePlayerStore } from "@/store";
import { useMetronome } from "../../hooks/useMetronome";

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
