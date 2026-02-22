import { useEffect, useRef, useCallback } from "react";
import { Metronome } from "../utils/Metronome";

export const useMetronome = (bpm: number, onTick: () => void) => {
  const metronomeRef = useRef<Metronome | null>(null);

  // Używamy efektu do jednorazowej inicjalizacji instancji
  // hooks/useMetronome.ts
  useEffect(() => {
    if (!metronomeRef.current) {
      metronomeRef.current = new Metronome(onTick);
    }
    return () => {
      metronomeRef.current?.cleanup(); // Używamy cleanup zamiast stop
      metronomeRef.current = null;
    };
  }, []);

  // Synchronizacja callbacku - bezpieczny dostęp w efekcie
  useEffect(() => {
    metronomeRef.current?.replaceCallback(onTick);
  }, [onTick]);

  // Synchronizacja tempa - bezpieczny dostęp w efekcie
  useEffect(() => {
    metronomeRef.current?.updateBpm(bpm);
  }, [bpm]);

  const toggleMetronome = useCallback(
    (shouldPlay: boolean) => {
      // Event handlery są bezpiecznym miejscem do używania ref.current
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
