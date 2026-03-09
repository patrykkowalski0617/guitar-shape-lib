import { usePlayerStore } from "@/store";
import { useFretboardCell, useNoteState } from "./";
import type { NoteObject } from "@/utils";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";

interface UseFretboardCellParams {
  noteData: NoteObject;
  stringIndex: StringIndex;
  fretIndex: number;
}

export function useFretboardCellInteraction({
  noteData,
  stringIndex,
  fretIndex,
}: UseFretboardCellParams) {
  const transitionTime = usePlayerStore((state) => state.transitionTime);
  const { states, actions } = useFretboardCell();

  const noteState = useNoteState({
    sharpNoteName: noteData.sharpNoteName,
    noteId: noteData.noteId,
    stringIndex,
    fretIndex,
  });

  const handleMouseEnter = () => {
    actions.setActiveNoteId(noteData.noteId);
  };

  const handleMouseLeave = () => {
    actions.setActiveNoteId(null);
  };

  return {
    noteState,
    isFlatTune: states.isFlatTune,
    transitionTime,
    handleMouseEnter,
    handleMouseLeave,
  };
}
