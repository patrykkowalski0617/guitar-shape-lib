import { useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS, type RoleId } from "@/data";
import { pianoNotes } from "../../helpers/constants";
import { useScaleLogic } from "../../hooks";
import { isGlobalRole } from "@/utils";

const VISIBLE_INDEXES_MAP: Record<
  "major" | "minor",
  Partial<Record<RoleId, readonly number[]>>
> = {
  major: {
    tonic: [3, 7, 10, 14, 17, 20, 24],
    subdominant: [8, 12, 15, 19, 22, 26, 29],
    dominant: [10, 14, 17, 20, 24, 27, 31],
  },
  minor: {
    tonic: [12, 15, 19, 22, 26, 29, 32],
    subdominant: [5, 8, 12, 15, 19, 22, 26],
    dominant: [7, 11, 14, 17, 20, 24, 27],
  },
} as const;

const DEFAULT_VISIBLE_INDEXES = [3, 5, 7, 8, 10, 12];

export const useScaleTemplate = () => {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const roleId = useControlsStore((state) => state.roleId);

  const { currentRoleNoteIds, currentShapeNoteIds } = useScaleLogic();

  const templateOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;
  const offsetFromFirstKey = 5;
  const position = offsetFromFirstKey + templateOffset;

  const modeKey = isMajorMode ? "major" : "minor";
  const modeMap = VISIBLE_INDEXES_MAP[modeKey];

  const effectiveRoleId = isGlobalRole(roleId) || !roleId ? "tonic" : roleId;

  const highlightRole =
    !isGlobalRole(roleId) && roleId
      ? (modeMap[effectiveRoleId] ?? [])
      : DEFAULT_VISIBLE_INDEXES;

  const altIndexes = !isGlobalRole(roleId)
    ? Array.from({ length: 33 }, (_, i) => i).filter((stepIndex) => {
        const pianoNote = pianoNotes[position + stepIndex];
        if (!pianoNote) return false;
        return (
          currentShapeNoteIds.includes(pianoNote.noteId) &&
          !currentRoleNoteIds.includes(pianoNote.noteId)
        );
      })
    : [];

  return {
    position,
    highlightRole,
    altIndexes,
    roleId,
  };
};
