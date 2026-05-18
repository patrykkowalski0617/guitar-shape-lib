import { NOTES_SHARP, SCALE_SEMITONE_TEMPLATES } from "@/data";
import { type NoteObject } from "@/utils";
import { useDataKeyStore, useMusicStore } from "@/store";
import { SHAPES_OF_PIANO_KEYS } from "../../constants";
import { useIsNoteActive } from "@/hooks/useIsNoteActive";

interface UsePianoKeyParams {
  noteObject: NoteObject;
}

export function usePianoKey({ noteObject }: UsePianoKeyParams) {
  const setActiveHoverNoteId = useMusicStore(
    (state) => state.setActiveHoverNoteId,
  );
  const shapeDataKey = useDataKeyStore((state) => state.shapeDataKey);

  const isActiveNote = useIsNoteActive(noteObject.noteId);

  const noteOctaveIndex = NOTES_SHARP.indexOf(noteObject.sharpNoteName);
  const isWhitePianoKey =
    SCALE_SEMITONE_TEMPLATES.ionianScale.includes(noteOctaveIndex);
  const pianoKeyShape = SHAPES_OF_PIANO_KEYS[noteOctaveIndex];

  const isScrollTarget = false;

  const handleMouseEnter = () => setActiveHoverNoteId(noteObject.noteId);
  const handleMouseLeave = () => setActiveHoverNoteId(null);

  return {
    visualState: {
      isWhitePianoKey,
      pianoKeyShape,
      isPushed: isActiveNote,
      isShapeSelected: !!shapeDataKey,
    },
    interactivity: {
      isScrollTarget,
      handleMouseEnter,
      handleMouseLeave,
    },
  };
}
