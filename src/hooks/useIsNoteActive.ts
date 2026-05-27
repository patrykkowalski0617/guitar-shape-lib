import { useMusicStore } from "@/store";
import type { NoteId } from "@/utils";

export function useIsNoteActive(noteId: NoteId) {
  const activeHoverNoteId = useMusicStore((s) => s.activeHoverNoteId);
  const activeLockedNoteIds = useMusicStore((s) => s.activeLockedNoteIds);
  const guitarShapeNoteIds = useMusicStore((s) => s.guitarShapeNoteIds);

  const isHovered = noteId === activeHoverNoteId;
  const isLocked = activeLockedNoteIds.includes(noteId);
  const isInShape = guitarShapeNoteIds.includes(noteId);

  const isSelected = isLocked || isInShape;
  const isActive = isHovered || isSelected;

  return isActive;
}
