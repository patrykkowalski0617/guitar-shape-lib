import { useMemo, useEffect } from "react";
import { useMusicStore } from "@/store/useMusicStore";
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
    expansionTimeoutId,
  } = useMusicStore();

  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;

  const isExpanded = expansionTimeoutId !== null;

  const { activeScaleIndices, activeScaleNotes } = useMemo(() => {
    const scaleInfo = getScaleIndices({
      firstAIndex,
      templateOffset,
      isMajorMode,
      steps: activeScaleSteps,
      currentMusicFunctionId,
      isExpanded,
    });

    const indices = scaleInfo.map((s) => s.index);
    const scaleNotes = indices.map((index) => notes[index]);

    return {
      activeScaleIndices: scaleInfo,
      activeScaleNotes: scaleNotes,
    };
  }, [isMajorMode, templateOffset, activeScaleSteps, currentMusicFunctionId, isExpanded]);

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
