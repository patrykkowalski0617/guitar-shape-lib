import { NOTES_SHARP, majorScale } from "@/data";
import { type NoteObject, isGlobalRole } from "@/utils";
import { useControlsStore, useMusicStore } from "@/store";
import { useScaleLogic } from "../../hooks";
import { SHAPES_OF_WHITE_PIANO_KEYS } from "../../helpers/constants";
import { useBaseChordSetter } from "@/hooks";

interface UsePianoKeyParams {
  note: NoteObject;
}

export function usePianoKey({ note }: UsePianoKeyParams) {
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const roleId = useControlsStore((state) => state.roleId);
  const setBaseChord = useBaseChordSetter();

  const { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds } =
    useScaleLogic();

  const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
  const isWhitePianoKey = majorScale.includes(noteOctaveIndex);
  const pianoKeyShape = SHAPES_OF_WHITE_PIANO_KEYS[noteOctaveIndex];

  const isRoleSelected = !!(roleId && !isGlobalRole(roleId));
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
  const handleClick = () => {
    const scaleIndex =
      roleId === "all-matching-key"
        ? currentScaleNoteIds.indexOf(note.noteId)
        : -1;

    setBaseChord(scaleIndex);
  };

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
      handleClick,
    },
  };
}
