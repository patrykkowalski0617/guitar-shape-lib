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
  const setSelectedNotes = useMusicStore(
    (state) => state.setTargetSharpNoteName,
  );
  const sharpNoteName = noteObject.sharpNoteName;
  const isTargetNote = useMusicStore(
    (state) =>
      sharpNoteName !== null &&
      state.targetSharpNoteName.includes(sharpNoteName),
  );

  const noteId = noteObject.noteId;
  const guitarShape = useGuitarShape();
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const isActiveNote = useIsNoteActive(noteId);

  const noteLabel = getEnharmonicNoteName(noteObject);

  const handleMouseEnter = useCallback(
    () => setActiveHoverNoteId(noteId),
    [noteId, setActiveHoverNoteId],
  );

  const handleMouseLeave = useCallback(
    () => setActiveHoverNoteId(null),
    [setActiveHoverNoteId],
  );

  const handleClick = useCallback(() => {
    if (!guitarShape) {
      setActiveLockedNoteIds(noteId);
    } else {
      setSelectedNotes(sharpNoteName);
    }
  }, [
    guitarShape,
    noteId,
    setActiveLockedNoteIds,
    setSelectedNotes,
    sharpNoteName,
  ]);

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    noteLabel,
    isTargetNote,
    isActiveNote,
  };
}
