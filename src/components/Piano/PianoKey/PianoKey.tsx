import * as S from "./parts";
import { NOTES_SHARP, majorScale, UNIFIED_MUSIC_KEYS } from "@/data";
import { type NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useMusicStore } from "@/store/useMusicStore";
import { useControlsStore } from "@/store/useControlsStore";
import { SHAPES_OF_WHITE_PIANO_KEYS } from "../helpers/constants";
import { useScaleLogic } from "../helpers/useScaleLogic";

interface PianoKeyProps {
  note: NoteObject;
}

const PianoKey = ({ note }: PianoKeyProps) => {
  const { activeNoteId, setActiveNoteId } = useMusicStore();
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);

  const isFlatTune = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune;
  const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
  const isWhitePianoKey = majorScale.includes(noteOctaveIndex);
  const pianoKeyShape = SHAPES_OF_WHITE_PIANO_KEYS[noteOctaveIndex];

  const { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds } = useScaleLogic();

  const isRoleActive = currentRoleId && currentRoleId !== "all";

  const isScrollTarget =
    (!isRoleActive && currentScaleNoteIds.includes(note.noteId)) ||
    (isRoleActive && currentRoleNoteIds.includes(note.noteId));

  const isHighlighted = currentScaleNoteIds.includes(note.noteId);
  const isActiveNote = note.noteId === activeNoteId && !currentShapeId;

  return (
    <S.Key
      $isRoleSelected={!!isRoleActive}
      $isShapeSelected={!!currentShapeId}
      $isActiveNote={isActiveNote}
      $isWhitePianoKey={isWhitePianoKey}
      $pianoKeyShape={pianoKeyShape}
      $isHighlighted={isHighlighted}
      $highlightRole={isRoleActive && currentRoleNoteIds?.includes(note.noteId) ? currentRoleId : "all"}
      data-scroll-target={isScrollTarget}
      onMouseOver={() => {
        setActiveNoteId(note.noteId);
      }}
      onMouseLeave={() => setActiveNoteId(null)}
    >
      <NoteLabel
        isFlatTune={isFlatTune}
        isShapeNote={!!isRoleActive && currentShapeNoteIds.includes(note.noteId)}
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
