import { useCallback, useEffect } from "react";
import { useMetronomeStore, useShapePlayerStore } from "@/store";
import { metronomeInstance } from "@/components/metronome/metronomeInstance";
import type { ScheduledEvent } from "@/components/metronome/ScheduledEventQueue";
import { useMetronome } from "../../hooks/useMetronome";

export function usePlayingBricksEngine() {
  const bpm = useMetronomeStore((state) => state.bpm);
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );
  const peekNextStep = useMetronomeStore((state) => state.peekNextStep);
  const applyStep = useMetronomeStore((state) => state.applyStep);

  // Called by audio scheduler ~0.1s ahead of time
  // Only reads state, does NOT mutate store
  const handleTick = useCallback(() => {
    return peekNextStep(guitarShapePlayerBricks);
  }, [peekNextStep, guitarShapePlayerBricks]);

  // Called by RAF loop exactly when sound plays
  // Mutates store → triggers React re-render in sync with audio
  const handleUIEvent = useCallback(
    (event: ScheduledEvent) => {
      applyStep(event);
    },
    [applyStep],
  );

  useEffect(() => {
    metronomeInstance.setUIEventCallback(handleUIEvent);
  }, [handleUIEvent]);

  const { toggleMetronome } = useMetronome(bpm, handleTick);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);
}
