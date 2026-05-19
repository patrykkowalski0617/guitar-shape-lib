import { useCallback } from "react";
import { useMusicStore } from "@/store";
import { useEnharmonicNoteName, useGuitarShape } from "@/hooks";
import { useIsNoteActive } from "@/hooks/useIsNoteActive";
import type { UseFretboardCellProps, FretboardCellHandlers } from "../types";

export function useFretboardCell({
  noteObject,
}: UseFretboardCellProps): FretboardCellHandlers {
  const setActiveHoverNoteId = useMusicStore(
    (state) => state.setActiveHoverNoteId,
  );
  const setActiveLockedNoteIds = useMusicStore(
    (state) => state.setActiveLockedNoteIds,
  );

  const guitarShape = useGuitarShape();
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const isActiveNote = useIsNoteActive(noteObject.noteId);

  const noteLabel = getEnharmonicNoteName(noteObject);

  const handleMouseEnter = useCallback(
    () => setActiveHoverNoteId(noteObject.noteId),
    [noteObject.noteId, setActiveHoverNoteId],
  );

  const handleMouseLeave = useCallback(
    () => setActiveHoverNoteId(null),
    [setActiveHoverNoteId],
  );

  const handleClick = useCallback(() => {
    if (!guitarShape) {
      setActiveLockedNoteIds(noteObject.noteId);
    }
  }, [guitarShape, noteObject.noteId, setActiveLockedNoteIds]);

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    noteLabel,
    isActiveNote,
  };
}
