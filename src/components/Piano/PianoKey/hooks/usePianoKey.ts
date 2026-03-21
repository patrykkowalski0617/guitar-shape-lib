import { NOTES_SHARP, majorScale } from "@/data";
import { type NoteObject } from "@/utils";
import { useControlsStore, useMusicStore } from "@/store";
import { useScaleLogic } from "../../hooks";
import { SHAPES_OF_WHITE_PIANO_KEYS } from "../../helpers/constants";

interface UsePianoKeyParams {
  note: NoteObject;
}

export function usePianoKey({ note }: UsePianoKeyParams) {
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const baseChordId = useControlsStore((state) => state.baseChordId);

  const { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds } =
    useScaleLogic();

  const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
  const isWhitePianoKey = majorScale.includes(noteOctaveIndex);
  const pianoKeyShape = SHAPES_OF_WHITE_PIANO_KEYS[noteOctaveIndex];

  const isRoleSelected = !!baseChordId;
  const isHighlighted = currentScaleNoteIds.includes(note.noteId);
  const isActiveNote = note.noteId === activeNoteId;
  const isShapeNote =
    isRoleSelected && currentShapeNoteIds.includes(note.noteId);
  const isRoleNote = currentRoleNoteIds?.includes(note.noteId);

  const isScaleScrollTarget = !isRoleSelected && isHighlighted;
  const isRoleScrollTarget = isRoleSelected && isRoleNote;
  const isScrollTarget = isScaleScrollTarget || isRoleScrollTarget;

  const handleMouseEnter = () => setActiveNoteId(note.noteId);
  const handleMouseLeave = () => setActiveNoteId(null);

  return {
    visualState: {
      isWhitePianoKey,
      pianoKeyShape,
      isHighlighted,
      isActiveNote,
      isShapeNote,
      isRoleNote,
      isRoleSelected,
      isShapeSelected: !!shapeId,
    },
    interactivity: {
      isScrollTarget,
      handleMouseEnter,
      handleMouseLeave,
    },
  };
}
