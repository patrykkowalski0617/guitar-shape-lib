import { NOTES_SHARP, SCALE_SEMITONE_TEMPLATES } from "@/data";
import { type NoteObject } from "@/utils";
import { useControlsStore, useMusicStore } from "@/store";
import { SHAPES_OF_PIANO_KEYS } from "../../constants";

interface UsePianoKeyParams {
  note: NoteObject;
}

export function usePianoKey({ note }: UsePianoKeyParams) {
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const activeLockedNotes = useMusicStore((state) => state.activeLockedNotes);
  const shapeNoteIds = useMusicStore((state) => state.shapeNoteIds);

  const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
  const isWhitePianoKey =
    SCALE_SEMITONE_TEMPLATES.ionianScale.includes(noteOctaveIndex);
  const pianoKeyShape = SHAPES_OF_PIANO_KEYS[noteOctaveIndex];

  const isActiveNote = note.noteId === activeNoteId;
  const isPushed =
    isActiveNote ||
    activeLockedNotes.includes(note.noteId) ||
    shapeNoteIds.includes(note.noteId);

  const isScrollTarget = false;

  const handleMouseEnter = () => setActiveNoteId(note.noteId);
  const handleMouseLeave = () => setActiveNoteId(null);

  return {
    visualState: {
      isWhitePianoKey,
      pianoKeyShape,
      isPushed,
      isShapeSelected: !!shapeId,
    },
    interactivity: {
      isScrollTarget,
      handleMouseEnter,
      handleMouseLeave,
    },
  };
}
