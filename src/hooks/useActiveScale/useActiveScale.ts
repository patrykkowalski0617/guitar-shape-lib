import { useMemo, useEffect } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS, type NoteObject } from "@/utils";
import { notes, firstAIndex } from "@/components/Keyboard/helpers/constants";
import { getHighlightRole, type HighlightRole } from "@/components/Keyboard/helpers/scaleLogic";

export interface ScaleDegreeInfo {
  noteId: string;
  role: HighlightRole;
}

export interface ScaleStepMetadata {
  index: number;
  step: number;
  adjustedStep: number;
  isVisible: boolean;
  isHarmonicMinor: boolean;
  role: HighlightRole;
  noteId: string | null;
  intervalLabel: string;
}

export const useActiveScale = () => {
  const { currentKeyId, isMajorMode, currentRoleId } = useControlsStore();
  const { activeScaleSteps, setActiveScaleNotes } = useMusicStore();

  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;

  const { fullScaleMetadata, activeScaleNotes } = useMemo(() => {
    let roleCounter = 0;

    const metadata: ScaleStepMetadata[] = activeScaleSteps.map((step, index) => {
      const isVisible = isMajorMode ? index >= 2 : index <= activeScaleSteps.length - 3;

      const isHarmonicMinor = !isMajorMode && index % 7 === 6 && currentRoleId === "dominant";
      const adjustedStep = isHarmonicMinor ? step + 1 : step;

      const role = getHighlightRole(index, isMajorMode, currentRoleId);
      const intervalLabel = role !== "none" ? `${roleCounter++ * 2 + 1}` : "";

      const finalIndex = firstAIndex + templateOffset + adjustedStep;
      const targetNote = notes[finalIndex];

      return {
        index,
        step,
        adjustedStep,
        isVisible,
        isHarmonicMinor,
        role,
        noteId: targetNote ? String(targetNote.noteId) : null,
        intervalLabel,
      };
    });

    const activeNotes = metadata
      .filter((m) => m.isVisible && m.noteId)
      .map((m) => notes.find((n) => String(n.noteId) === m.noteId))
      .filter((n): n is NoteObject => !!n);

    return {
      fullScaleMetadata: metadata,
      activeScaleNotes: activeNotes,
    };
  }, [isMajorMode, templateOffset, activeScaleSteps, currentRoleId]);

  useEffect(() => {
    console.log(activeScaleNotes);
    setActiveScaleNotes(activeScaleNotes);
  }, [activeScaleNotes, setActiveScaleNotes]);

  return {
    fullScaleMetadata,
    currentKeyId,
    isMajorMode,
  };
};
