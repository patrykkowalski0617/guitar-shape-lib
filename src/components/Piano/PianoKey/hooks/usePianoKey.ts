import { NOTES_SHARP, majorScale, type RoleId } from "@/data";
import { type NoteObject, isGlobalRole } from "@/utils";
import { useControlsStore, useMusicStore } from "@/store";
import { useScaleLogic } from "../../hooks";
import { SHAPES_OF_WHITE_PIANO_KEYS } from "../../helpers/constants";

interface UsePianoKeyParams {
  note: NoteObject;
}

export function usePianoKey({ note }: UsePianoKeyParams) {
  const { activeNoteId, setActiveNoteId } = useMusicStore();
  const shapeId = useControlsStore((state) => state.shapeId);
  const roleId = useControlsStore((state) => state.roleId);
  const setRoleId = useControlsStore((state) => state.setRoleId);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);

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
    console.log({ isShapeNote, isHighlighted, isRoleNote });

    if (!isHighlighted) return;
    setActiveNoteId(null);
    const scaleIndex = currentScaleNoteIds.indexOf(note.noteId);

    interface RoleAndModeValue {
      role: RoleId;
      isMajorMode: boolean;
    }

    const roleAndModeValuesMap: RoleAndModeValue[] = [
      {
        role: "tonic",
        isMajorMode: true,
      },
      {
        role: "subdominant",
        isMajorMode: false,
      },
      {
        role: "dominant",
        isMajorMode: false,
      },
      {
        role: "subdominant",
        isMajorMode: true,
      },
      {
        role: "dominant",
        isMajorMode: true,
      },
      {
        role: "tonic",
        isMajorMode: false,
      },
    ];

    if (isRoleSelected) {
      setRoleId("all-one-instance");
      setIsMajorMode(true);
    } else {
      setRoleId(roleAndModeValuesMap[scaleIndex].role);
      setIsMajorMode(roleAndModeValuesMap[scaleIndex].isMajorMode);
    }
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
