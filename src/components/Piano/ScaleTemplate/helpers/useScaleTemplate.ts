import { useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS, type RoleId, isGlobalRole } from "@/data";
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

  const effectiveRoleId = isGlobalRole(currentRoleId) || !currentRoleId ? "tonic" : currentRoleId;

  const highlightRole = !isGlobalRole(currentRoleId) && currentRoleId ? (modeMap[effectiveRoleId] ?? []) : [];

  const altIndexes = !isGlobalRole(currentRoleId)
    ? Array.from({ length: 33 }, (_, i) => i).filter((stepIndex) => {
        const pianoNote = pianoNotes[position + stepIndex];
        if (!pianoNote) return false;
        return currentShapeNoteIds.includes(pianoNote.noteId) && !currentRoleNoteIds.includes(pianoNote.noteId);
      })
    : [];

  return {
    position,
    highlightRole,
    altIndexes,
    currentRoleId,
  };
};
