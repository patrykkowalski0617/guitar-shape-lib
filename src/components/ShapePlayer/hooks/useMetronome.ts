import { useEffect, useCallback } from "react";
import { useMetronomeStore } from "@/store";
import { metronomeInstance } from "../../metronome/metronomeInstance";
import type { TickCallback } from "../../metronome/types";

export const useMetronome = (bpm: number, onTick: TickCallback) => {
  const multiplier = useMetronomeStore((state) => state.bpmMultiplier);

  useEffect(() => {
    metronomeInstance.replaceCallback(onTick);
  }, [onTick]);

  useEffect(() => {
    metronomeInstance.updateBpm(bpm);
  }, [bpm]);

  useEffect(() => {
    metronomeInstance.updateMultiplier(multiplier);
  }, [multiplier]);

  const toggleMetronome = useCallback(
    (shouldPlay: boolean) => {
      if (shouldPlay) {
        metronomeInstance.start(bpm, multiplier);
      } else {
        metronomeInstance.stop();
      }
    },
    [bpm, multiplier],
  );

  return { toggleMetronome };
};
