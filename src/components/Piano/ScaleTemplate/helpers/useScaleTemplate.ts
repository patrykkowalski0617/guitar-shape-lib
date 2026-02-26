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
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const roleId = useControlsStore((state) => state.roleId);

  const { currentRoleNoteIds, currentShapeNoteIds } = useScaleLogic();

  const roleOffset = roleId === "subdominant" ? 5 : roleId === "dominant" ? 7 : 0;
  const templateOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC + roleOffset;
  const position = 5 + templateOffset;

  const modeKey = isMajorMode ? "major" : "minor";
  const modeMap = VISIBLE_INDEXES_MAP[modeKey];

  const effectiveRoleId = isGlobalRole(roleId) || !roleId ? "tonic" : roleId;

  const highlightRole = !isGlobalRole(roleId) && roleId ? (modeMap[effectiveRoleId] ?? []) : [];

  const altIndexes = !isGlobalRole(roleId)
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
    roleId,
  };
};
