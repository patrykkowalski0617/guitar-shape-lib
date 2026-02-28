import { useEffect, useRef, useCallback } from "react";
import { Metronome } from "../utils/Metronome";
import { usePlayerStore } from "@/store";

export const useMetronome = (bpm: number, onTick: () => void) => {
  const metronomeRef = useRef<Metronome | null>(null);
  const multiplier = usePlayerStore((state) => state.bpmMultiplier);

  useEffect(() => {
    if (!metronomeRef.current) {
      metronomeRef.current = new Metronome(onTick);
    }
    return () => {
      metronomeRef.current?.cleanup();
      metronomeRef.current = null;
    };
  }, []);

  useEffect(() => {
    metronomeRef.current?.replaceCallback(onTick);
  }, [onTick]);

  useEffect(() => {
    metronomeRef.current?.updateBpm(bpm);
  }, [bpm]);

  useEffect(() => {
    metronomeRef.current?.updateMultiplier(multiplier);
  }, [multiplier]);

  const toggleMetronome = useCallback(
    (shouldPlay: boolean) => {
      if (shouldPlay) {
        metronomeRef.current?.start(bpm, multiplier);
      } else {
        metronomeRef.current?.stop();
      }
    },
    [bpm, multiplier],
  );

  return { toggleMetronome };
};
