import { useCallback, useMemo } from "react";
import { useMusicStore, useShapePlayerStore } from "@/store";
import { useEnharmonicNoteName } from "@/hooks";
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
  const guitarShapePlayerBricks = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks,
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
    if (!guitarShapePlayerBricks.length) setActiveLockedNoteIds(noteId);
  }, [guitarShapePlayerBricks, noteId, setActiveLockedNoteIds]);

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    noteLabel,
    isTargetNote,
    isActiveNote,
  };
}
