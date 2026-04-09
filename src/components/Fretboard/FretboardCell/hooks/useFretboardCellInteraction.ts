import { useMusicStore } from "@/store";
import type { NoteObject } from "@/utils";

interface UseFretboardCellInteractionProps {
  noteData: NoteObject;
}

export function useFretboardCellInteraction({
  noteData,
}: UseFretboardCellInteractionProps) {
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);

  const handleMouseEnter = () => setActiveNoteId(noteData.noteId);
  const handleMouseLeave = () => setActiveNoteId(null);

  return {
    handleMouseEnter,
    handleMouseLeave,
  };
}
