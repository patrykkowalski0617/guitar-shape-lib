import { useMusicStore } from "@/store";
import type { NoteId } from "@/utils";

export function useIsNoteActive(noteId: NoteId) {
  const activeHoverNoteId = useMusicStore((state) => state.activeHoverNoteId);
  const activeLockedNoteIds = useMusicStore(
    (state) => state.activeLockedNoteIds,
  );
  const shapeNoteIds = useMusicStore((state) => state.shapeNoteIds);

  const isHovered = noteId === activeHoverNoteId;
  const isLocked = activeLockedNoteIds.includes(noteId);
  const isInShape = shapeNoteIds.includes(noteId);

  const isSelected = isLocked || isInShape;
  const isActive = isHovered || isSelected;

  return isActive;
}
