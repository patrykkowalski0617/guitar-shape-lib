import { useCallback, useMemo } from "react";
import { useMusicStore } from "@/store";
import { useEnharmonicNoteName, useGuitarShape } from "@/hooks";
import { useIsNoteActive } from "@/hooks/useIsNoteActive";
import type { UseFretboardCellProps, FretboardCellHandlers } from "../types";

export function useFretboardCell({
  noteObject,
  isShapeCell,
  isInNextTargetShape,
}: UseFretboardCellProps): FretboardCellHandlers {
  const setActiveHoverNoteId = useMusicStore(
    (state) => state.setActiveHoverNoteId,
  );
  const setActiveLockedNoteIds = useMusicStore(
    (state) => state.setActiveLockedNoteIds,
  );

  const sharpNoteName = noteObject.sharpNoteName;
  const targetSharpNoteNames = useMusicStore(
    (state) => state.targetSharpNoteNames,
  );

  const isTargetNote = useMemo(() => {
    if (sharpNoteName === null) return false;
    const isInTargetList = targetSharpNoteNames.includes(sharpNoteName);
    return isInTargetList && (isInNextTargetShape || isShapeCell);
  }, [sharpNoteName, targetSharpNoteNames, isInNextTargetShape, isShapeCell]);

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
    if (!guitarShape) setActiveLockedNoteIds(noteId);
  }, [guitarShape, noteId, setActiveLockedNoteIds]);

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    noteLabel,
    isTargetNote,
    isActiveNote,
  };
}
