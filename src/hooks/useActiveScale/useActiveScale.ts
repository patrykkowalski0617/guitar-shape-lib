import { useMemo, useEffect } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS, type RoleId, type NoteObject } from "@/utils";
import { notes, firstAIndex } from "@/components/Keyboard/helpers/constants";
import { getHighlightRole, type HighlightRole } from "@/components/Keyboard/helpers/scaleLogic";

export interface ScaleDegreeInfo {
  noteId: string;
  role: HighlightRole;
}

interface GetScaleIndicesArgs {
  firstAIndex: number;
  templateOffset: number;
  isMajorMode: boolean;
  steps: number[];
  currentRoleId: RoleId | null;
  notes: NoteObject[];
}

const getScaleIndices = ({
  firstAIndex,
  templateOffset,
  isMajorMode,
  steps,
  currentRoleId,
  notes,
}: GetScaleIndicesArgs): ScaleDegreeInfo[] => {
  return steps
    .map((step, index) => {
      const isVisible = isMajorMode ? index >= 2 : index <= steps.length - 3;
      if (!isVisible) return null;

      let finalIndex = firstAIndex + templateOffset + step;

      const isHarmonicMinor = !isMajorMode && index % 7 === 6;
      if (isHarmonicMinor) {
        finalIndex += 1;
      }

      const targetNote = notes[finalIndex];

      if (!targetNote) return null;

      return {
        noteId: String(targetNote.noteId),
        role: getHighlightRole(index, isMajorMode, currentRoleId),
      };
    })
    .filter((item): item is ScaleDegreeInfo => item !== null);
};

export const useActiveScale = () => {
  const { currentKeyId, isMajorMode, currentRoleId } = useControlsStore();
  const { activeScaleSteps, setActiveScaleNotes } = useMusicStore();

  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;

  const { activeScaleIndices, activeScaleNotes } = useMemo(() => {
    const scaleInfo = getScaleIndices({
      firstAIndex,
      templateOffset,
      isMajorMode,
      steps: activeScaleSteps,
      currentRoleId,
      notes,
    });

    const scaleNotes = scaleInfo
      .map((info) => notes.find((n) => String(n.noteId) === info.noteId))
      .filter((n): n is NoteObject => n !== undefined);

    return {
      activeScaleIndices: scaleInfo,
      activeScaleNotes: scaleNotes,
    };
  }, [isMajorMode, templateOffset, activeScaleSteps, currentRoleId]);

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
