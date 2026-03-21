import { useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS } from "@/data";
import { pianoNotes } from "../../helpers/constants";
import { useScaleLogic } from "../../hooks";

const VISIBLE_INDEXES_MAP = {
  Tonic: [3, 7, 10, 14, 17, 20, 24],
  Subdomi: [8, 12, 15, 19, 22, 26, 29],
  Domi: [10, 14, 17, 20, 24, 27, 31],
  mediant: [],
  tonic: [12, 15, 19, 22, 26, 29, 32],
  subdomi: [5, 8, 12, 15, 19, 22, 26],
  DomiPh: [7, 11, 14, 17, 20, 24, 27],
};

const DEFAULT_VISIBLE_INDEXES = [3, 5, 7, 8, 10, 12];

export const useScaleTemplate = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const baseChordId = useControlsStore((state) => state.baseChordId);

  const { currentRoleNoteIds, currentShapeNoteIds } = useScaleLogic();

  const templateOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;
  const offsetFromFirstKey = 5;
  const position = offsetFromFirstKey + templateOffset;

  const modeMap = baseChordId && VISIBLE_INDEXES_MAP?.[baseChordId];

  const highlightRole = baseChordId ? (modeMap ?? []) : DEFAULT_VISIBLE_INDEXES;

  const altIndexes = !baseChordId
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
    baseChordId,
  };
};
