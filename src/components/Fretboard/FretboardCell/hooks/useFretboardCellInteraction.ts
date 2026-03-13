import { useControlsStore, useMusicStore, usePlayerStore } from "@/store";
import type { NoteObject } from "@/utils";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import { useRoleAndModeSetter } from "@/hooks";
import { UNIFIED_MUSIC_KEYS } from "@/data";

interface UseFretboardCellParams {
  noteData: NoteObject;
  stringIndex: StringIndex;
  fretIndex: number;
}

export function useFretboardCellInteraction({
  noteData,
}: UseFretboardCellParams) {
  const transitionTime = usePlayerStore((state) => state.transitionTime);
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const setRoleAndMode = useRoleAndModeSetter();

  const tuneKeyOffsetFromC = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;

  const basePoints = [
    [5, 8],
    [5, 10],
    [5, 12],
    [4, 8],
    [4, 10],
    [4, 12],
  ];

  const roleAndModeCellsCoords = basePoints.map(([stringIdx, fretIdx]) => [
    stringIdx,
    fretIdx + tuneKeyOffsetFromC,
  ]);

  const handleMouseEnter = () => {
    setActiveNoteId(noteData.noteId);
  };

  const handleMouseLeave = () => {
    setActiveNoteId(null);
  };

  const handleClick = (stringIndex: number, fretIndex: number) => {
    const foundPointIndex = roleAndModeCellsCoords.findIndex(
      ([targetString, targetFret]) =>
        targetString === stringIndex && targetFret === fretIndex,
    );

    setRoleAndMode(foundPointIndex);
  };

  return {
    transitionTime,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    roleAndModeCellsCoords,
  };
}
