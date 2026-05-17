import { useMusicStore } from "@/store";
import type { NoteObject } from "@/utils";

interface UseFretboardCellInteractionProps {
  noteObject: NoteObject;
}

export function useFretboardCellInteraction({
  noteObject,
}: UseFretboardCellInteractionProps) {
  const setActiveHoverNoteId = useMusicStore(
    (state) => state.setActiveHoverNoteId,
  );

  const handleMouseEnter = () => setActiveHoverNoteId(noteObject.noteId);
  const handleMouseLeave = () => setActiveHoverNoteId(null);

  return {
    handleMouseEnter,
    handleMouseLeave,
  };
}
