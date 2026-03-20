import { useMusicStore } from "@/store";
import type { NoteObject } from "@/utils";
import { useBaseChordSetter } from "@/hooks";
import { useBaseChordCoords } from "./useBaseChordCoords";

interface UseFretboardCellInteractionProps {
  noteData: NoteObject;
}

export function useFretboardCellInteraction({
  noteData,
}: UseFretboardCellInteractionProps) {
  const baseChordCellsCoords = useBaseChordCoords();
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const setBaseChordId = useBaseChordSetter();

  const handleMouseEnter = () => setActiveNoteId(noteData.noteId);
  const handleMouseLeave = () => setActiveNoteId(null);

  const handleClick = (stringIndex: number, fretIndex: number) => {
    const foundPointIndex = baseChordCellsCoords.findIndex(
      ([targetString, targetFret]: number[]) =>
        targetString === stringIndex && targetFret === fretIndex,
    );
    setBaseChordId(foundPointIndex);
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
}
