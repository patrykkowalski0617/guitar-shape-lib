import { useEffect, useCallback } from "react";
import { useMetronomeStore } from "@/store";
import { metronomeInstance } from "../metronome/metronomeInstance";

export const useMetronome = (
  bpm: number,
  onTick: () => { isNewBrick: boolean },
) => {
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
