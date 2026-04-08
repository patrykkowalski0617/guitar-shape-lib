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
  const setActiveLockedNotes = useMusicStore(
    (state) => state.setActiveLockedNotes,
  );
  const activeLockedNotes = useMusicStore((state) => state.activeLockedNotes);

  const {
    isWhitePianoKey,
    pianoKeyShape,
    isHighlighted,
    isRoleNote,
    isShapeSelected,
  } = visualState;

  const label = (
    <NoteLabel
      isHighlighted={isHighlighted || activeLockedNotes.includes(note.noteId)}
      variant="piano"
      noteLabel={getEnharmonicNoteName(note)}
    />
  );

  return (
    <S.Key
      $isShapeSelected={isShapeSelected}
      $isWhitePianoKey={isWhitePianoKey}
      $pianoKeyShape={pianoKeyShape}
      $isHighlighted={isHighlighted || activeLockedNotes.includes(note.noteId)}
      $isRoleNote={isRoleNote}
      //
      data-piano-scroll-target={interactivity.isScrollTarget}
      onMouseOver={interactivity.handleMouseEnter}
      onMouseLeave={interactivity.handleMouseLeave}
      onClick={() => {
        setActiveLockedNotes(note.noteId);
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
