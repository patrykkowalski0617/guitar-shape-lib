import { useMemo, useEffect } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { UNIFIED_MUSIC_KEYS } from "@/utils";
import { notes, firstAIndex } from "@/components/Keyboard/helpers/constants";
import { getScaleIndices } from "@/components/Keyboard/helpers/getScaleIndices";

export const useActiveScale = () => {
  const {
    currentKeyId,
    isMajorMode,
    setActiveScaleNotes,
    activeScaleSteps,
    currentMusicFunctionId,
  } = useControlsStore();

  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;

  const { activeScaleIndices, activeScaleNotes } = useMemo(() => {
    const scaleInfo = getScaleIndices({
      firstAIndex,
      templateOffset,
      isMajorMode,
      steps: activeScaleSteps,
      currentMusicFunctionId,
    });

    const indices = scaleInfo.map((s) => s.index);
    const scaleNotes = indices.map((index) => notes[index]);

    return {
      activeScaleIndices: scaleInfo,
      activeScaleNotes: scaleNotes,
    };
  }, [isMajorMode, templateOffset, activeScaleSteps, currentMusicFunctionId]);

  useEffect(() => {
    setActiveScaleNotes(activeScaleNotes);
  }, [activeScaleNotes, setActiveScaleNotes]);

  return {
    activeScaleIndices,
    activeScaleNotes,
    currentKeyId,
    isMajorMode,
  };
};
