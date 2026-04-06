import * as S from "./parts/parts";
import { type NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { usePianoKey } from "./hooks/usePianoKey";
import { useEnharmonicNoteName } from "@/hooks";
import { usePianoKeyTuneKeyState } from "./hooks/usePianoKeyTuneKeyState";
import { WhiteKeyJustifyContainer } from "./parts/whiteKeys";
import { useMusicStore } from "@/store/useMusicStore";

interface PianoKeyProps {
  note: NoteObject;
  pianoKeyindex: number;
}

const PianoKey = ({ note, pianoKeyindex }: PianoKeyProps) => {
  const { visualState, interactivity } = usePianoKey({ note });
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const { isTuneNote } = usePianoKeyTuneKeyState(pianoKeyindex);
  const setActiveNotes = useMusicStore((state) => state.setActiveNotes);
  const activeNotes = useMusicStore((state) => state.activeNotes);

  const {
    isWhitePianoKey,
    pianoKeyShape,
    isHighlighted,
    isActiveNote,
    isShapeNote,
    isRoleNote,
    isShapeSelected,
  } = visualState;

  const label = (
    <NoteLabel
      isShapeNote={isShapeNote}
      isActiveNote={isActiveNote}
      variant="piano"
      noteLabel={getEnharmonicNoteName(note)}
    />
  );

  return (
    <S.Key
      $isShapeSelected={isShapeSelected}
      $isShapeNote={isShapeNote}
      $isActiveNote={isActiveNote}
      $isWhitePianoKey={isWhitePianoKey}
      $pianoKeyShape={pianoKeyShape}
      $isHighlighted={isHighlighted}
      $isRoleNote={isRoleNote}
      //
      $isHighlight={activeNotes.includes(note.noteId)}
      data-piano-scroll-target={interactivity.isScrollTarget}
      onMouseOver={interactivity.handleMouseEnter}
      onMouseLeave={interactivity.handleMouseLeave}
      onClick={() => {
        setActiveNotes(note.noteId);
      }}
    >
      {isWhitePianoKey ? (
        <WhiteKeyJustifyContainer>{label}</WhiteKeyJustifyContainer>
      ) : (
        label
      )}
    </S.Key>
  );
};

export default PianoKey;
