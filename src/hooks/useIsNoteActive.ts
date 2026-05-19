import { useMusicStore } from "@/store";
import type { NoteId } from "@/utils";

export function useIsNoteActive(noteId: NoteId) {
  const activeHoverNoteId = useMusicStore((state) => state.activeHoverNoteId);
  const activeLockedNoteIds = useMusicStore(
    (state) => state.activeLockedNoteIds,
  );
  const guitarShapeNoteIds = useMusicStore((state) => state.guitarShapeNoteIds);

  const isHovered = noteId === activeHoverNoteId;
  const isLocked = activeLockedNoteIds.includes(noteId);
  const isInShape = guitarShapeNoteIds.includes(noteId);

  const isSelected = isLocked || isInShape;
  const isActive = isHovered || isSelected;

  return isActive;
}
