import * as S from "./parts";
import { NOTES_SHARP, majorScale, UNIFIED_MUSIC_KEYS, isGlobalRole } from "@/data";
import { type NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useControlsStore, useMusicStore } from "@/store";
import { SHAPES_OF_WHITE_PIANO_KEYS } from "../helpers/constants";
import { useScaleLogic } from "../hooks";

interface PianoKeyProps {
  note: NoteObject;
}

const PianoKey = ({ note }: PianoKeyProps) => {
  const { activeNoteId, setActiveNoteId } = useMusicStore();
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const roleId = useControlsStore((state) => state.roleId);

  const isFlatTune = UNIFIED_MUSIC_KEYS[tuneKeyId].isFlatTune;
  const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
  const isWhitePianoKey = majorScale.includes(noteOctaveIndex);
  const pianoKeyShape = SHAPES_OF_WHITE_PIANO_KEYS[noteOctaveIndex];

  const { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds } = useScaleLogic();

  const isRoleActive = roleId && !isGlobalRole(roleId);

  const isScrollTarget =
    (!isRoleActive && currentScaleNoteIds.includes(note.noteId)) ||
    (isRoleActive && currentRoleNoteIds.includes(note.noteId));

  const isHighlighted = currentScaleNoteIds.includes(note.noteId);
  const isActiveNote = note.noteId === activeNoteId;
  const isShapeNote = !!isRoleActive && currentShapeNoteIds.includes(note.noteId);
  const isRoleNote = currentRoleNoteIds?.includes(note.noteId);

  return (
    <S.Key
      $isRoleSelected={!!isRoleActive}
      $isShapeSelected={!!shapeId}
      $isShapeNote={isShapeNote}
      $isActiveNote={isActiveNote}
      $isWhitePianoKey={isWhitePianoKey}
      $pianoKeyShape={pianoKeyShape}
      $isHighlighted={isHighlighted}
      $isRoleNote={isRoleNote}
      data-piano-scroll-target={isScrollTarget}
      onMouseOver={() => {
        setActiveNoteId(note.noteId);
      }}
      onMouseLeave={() => setActiveNoteId(null)}
    >
      <NoteLabel
        isFlatTune={isFlatTune}
        isShapeNote={isShapeNote}
        flatNoteName={note.flatNoteName}
        sharpNoteName={note.sharpNoteName}
        isEnharmonic={note.isEnharmonic}
        isHighlighted={isHighlighted}
        isActiveNote={isActiveNote}
        variant="piano"
      />
    </S.Key>
  );
};

export default PianoKey;
