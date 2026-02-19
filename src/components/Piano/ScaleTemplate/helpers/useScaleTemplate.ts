import { useControlsStore } from "@/store/useControlsStore";
import { UNIFIED_MUSIC_KEYS, type RoleId } from "@/data";
import { useScaleLogic } from "../../helpers/useScaleLogic";
import { pianoNotes } from "../../helpers/constants";
const VISIBLE_INDEXES_MAP: Record<"major" | "minor", Partial<Record<RoleId, readonly number[]>>> = {
  major: {
    tonic: [3, 7, 10, 14, 17, 20, 24],
    subdominant: [3, 7, 10, 14, 17, 21, 24],
    dominant: [3, 7, 10, 13, 17, 20, 24],
  },
  minor: {
    tonic: [0, 3, 7, 10, 14, 17, 20],
    subdominant: [0, 3, 7, 10, 14, 17, 21],
    dominant: [0, 4, 7, 10, 13, 17, 20],
  },
} as const;

export const useScaleTemplate = () => {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);

  const { currentRoleNoteIds, currentShapeNoteIds } = useScaleLogic();

  const roleOffset = currentRoleId === "subdominant" ? 5 : currentRoleId === "dominant" ? 7 : 0;
  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC + roleOffset;
  const position = 5 + templateOffset;

  const modeKey = isMajorMode ? "major" : "minor";
  const modeMap = VISIBLE_INDEXES_MAP[modeKey];
  const effectiveRoleId = currentRoleId && currentRoleId !== "all" ? currentRoleId : "tonic";

  const highlightRole = currentRoleId && currentRoleId !== "all" ? (modeMap[effectiveRoleId as RoleId] ?? []) : [];

  const altIndexes =
    currentRoleId !== "all"
      ? Array.from({ length: 33 }, (_, i) => i).filter((stepIndex) => {
          const pianoNote = pianoNotes[position + stepIndex];
          if (!pianoNote) return false;

          const isShapeNote = currentShapeNoteIds.includes(pianoNote.noteId);
          const isRoleNote = currentRoleNoteIds.includes(pianoNote.noteId);

          return isShapeNote && !isRoleNote;
        })
      : [];

  return {
    position,
    highlightRole,
    altIndexes,
    currentRoleId,
  };
};
