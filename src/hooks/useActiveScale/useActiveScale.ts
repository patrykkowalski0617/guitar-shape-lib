import { useMemo, useEffect } from "react";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS } from "@/utils";
import { notes, firstAIndex } from "@/components/Keyboard/helpers/constants";
import { getScaleIndices } from "@/components/Keyboard/helpers/getScaleIndices";

export const useActiveScale = () => {
  const currentKeyId = useMusicStore((state) => state.currentKeyId);
  const isMajorMode = useMusicStore((state) => state.isMajorMode);
  const setActiveScaleNotes = useMusicStore((state) => state.setActiveScaleNotes);

  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;

  const { activeScaleIndices, activeScaleNotes } = useMemo(() => {
    const indices = getScaleIndices({
      firstAIndex,
      templateOffset,
      isMajorMode,
    });

    const scaleNotes = indices.map((index) => notes[index]);

    return {
      activeScaleIndices: indices,
      activeScaleNotes: scaleNotes,
    };
  }, [isMajorMode, templateOffset]);

  useEffect(() => {
    if (setActiveScaleNotes) {
      setActiveScaleNotes(activeScaleNotes);
    }
  }, [activeScaleNotes, setActiveScaleNotes]);

  return {
    activeScaleIndices,
    activeScaleNotes,
    currentKeyId,
    isMajorMode,
  };
};
