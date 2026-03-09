import { NOTES_SHARP, majorScale, UNIFIED_MUSIC_KEYS } from "@/data";
import { type NoteObject, isGlobalRole } from "@/utils";
import { useControlsStore, useMusicStore } from "@/store";
import { useScaleLogic } from "../../hooks";
import { SHAPES_OF_WHITE_PIANO_KEYS } from "../../helpers/constants";

interface UsePianoKeyParams {
  note: NoteObject;
}

export function usePianoKey({ note }: UsePianoKeyParams) {
  const { activeNoteId, setActiveNoteId } = useMusicStore();
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const roleId = useControlsStore((state) => state.roleId);

  const { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds } =
    useScaleLogic();

  const isFlatTune = UNIFIED_MUSIC_KEYS[tuneKeyId].isFlatTune;
  const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
  const isWhitePianoKey = majorScale.includes(noteOctaveIndex);
  const pianoKeyShape = SHAPES_OF_WHITE_PIANO_KEYS[noteOctaveIndex];

  const isRoleActive = !!(roleId && !isGlobalRole(roleId));
  const isHighlighted = currentScaleNoteIds.includes(note.noteId);
  const isActiveNote = note.noteId === activeNoteId;
  const isShapeNote = isRoleActive && currentShapeNoteIds.includes(note.noteId);
  const isRoleNote = currentRoleNoteIds?.includes(note.noteId);

  const isScaleScrollTarget = !isRoleActive && isHighlighted;
  const isRoleScrollTarget = isRoleActive && isRoleNote;
  const isScrollTarget = isScaleScrollTarget || isRoleScrollTarget;

  const handleMouseEnter = () => setActiveNoteId(note.noteId);
  const handleMouseLeave = () => setActiveNoteId(null);

  return {
    visualState: {
      isFlatTune,
      isWhitePianoKey,
      pianoKeyShape,
      isHighlighted,
      isActiveNote,
      isShapeNote,
      isRoleNote,
      isRoleActive,
      isShapeActive: !!shapeId,
    },
    interactivity: {
      isScrollTarget,
      handleMouseEnter,
      handleMouseLeave,
    },
  };
}
