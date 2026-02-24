import { useEffect, useRef, useCallback } from "react";
import { Metronome } from "../utils/Metronome";

export const useMetronome = (bpm: number, onTick: () => void) => {
  const metronomeRef = useRef<Metronome | null>(null);

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

  const toggleMetronome = useCallback(
    (shouldPlay: boolean) => {
      if (shouldPlay) {
        metronomeRef.current?.start(bpm);
      } else {
        metronomeRef.current?.stop();
      }
    },
    [bpm],
  );

  return { toggleMetronome };
};
