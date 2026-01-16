import { useMemo, useEffect } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS, type NoteObject } from "@/utils";
import { notes, firstAIndex } from "@/components/Keyboard/helpers/constants";
import { getHighlightRole, type HighlightRole } from "@/components/Keyboard/helpers/scaleLogic";

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

const MAX_SCALE_DEGREES = 34;

export const useActiveScale = () => {
  const { currentKeyId, isMajorMode, currentRoleId } = useControlsStore();
  const { activeScaleSteps, setActiveScaleNotes } = useMusicStore();

  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;

  const { fullScaleMetadata, activeScaleNotes } = useMemo(() => {
    let roleCounter = 0;

    const metadata: ScaleStepMetadata[] = Array.from({ length: MAX_SCALE_DEGREES }).map(
      (_, index) => {
        const hasStep = index < activeScaleSteps.length;

        const octave = Math.floor(index / 7);
        const degreeInFirstOctave = index % 7;

        const baseInterval = activeScaleSteps[degreeInFirstOctave] ?? 0;
        const currentStep = baseInterval + octave * 12;

        const isWithinVisibleRange = isMajorMode
          ? index >= 2
          : index <= activeScaleSteps.length - 3;

        const isVisible = hasStep && isWithinVisibleRange;

        const isHarmonicMinor =
          isVisible && !isMajorMode && index % 7 === 6 && currentRoleId === "dominant";
        const adjustedStep = isHarmonicMinor ? currentStep + 1 : currentStep;

        const role = isVisible ? getHighlightRole(index, isMajorMode, currentRoleId) : "none";
        const intervalLabel = isVisible && role !== "none" ? `${roleCounter++ * 2 + 1}` : "";

        const finalIndex = firstAIndex + templateOffset + adjustedStep;
        const targetNote = notes[finalIndex];
        const targetNoteId = isVisible && targetNote ? String(targetNote.noteId) : null;

        return {
          index,
          step: currentStep,
          adjustedStep,
          isVisible,
          isHarmonicMinor,
          role,
          noteId: targetNoteId,
          intervalLabel,
        };
      }
    );

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
    setActiveScaleNotes(activeScaleNotes);
  }, [activeScaleNotes, setActiveScaleNotes]);

  return {
    fullScaleMetadata,
    currentKeyId,
    isMajorMode,
  };
};
