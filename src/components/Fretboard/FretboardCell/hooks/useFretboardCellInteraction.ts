import { useMusicStore, usePlayerStore } from "@/store";
import type { NoteObject } from "@/utils";
import { useRoleAndModeSetter } from "@/hooks";
import { useRoleAndModeCoords } from "./useRoleAndModeCoords";

interface UseFretboardCellInteractionProps {
  noteData: NoteObject;
}

export function useFretboardCellInteraction({
  noteData,
}: UseFretboardCellInteractionProps) {
  const roleAndModeCellsCoords = useRoleAndModeCoords();
  const transitionTime = usePlayerStore((state) => state.transitionTime);
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const setRoleAndMode = useRoleAndModeSetter();

  const handleMouseEnter = () => setActiveNoteId(noteData.noteId);
  const handleMouseLeave = () => setActiveNoteId(null);

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
  };
}
