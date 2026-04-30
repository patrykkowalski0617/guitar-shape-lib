import * as S from "./parts/parts";
import { type NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { usePianoKey } from "./hooks/usePianoKey";
import { useEnharmonicNoteName } from "@/hooks";
import { WhiteKeyJustifyContainer } from "./parts/whiteKeys";
import { useMusicStore } from "@/store/useMusicStore";
import { BlacKeyJustifyContainer } from "./parts/blackKeys";

interface PianoKeyProps {
  note: NoteObject;
}

const PianoKey = ({ note }: PianoKeyProps) => {
  const { visualState, interactivity } = usePianoKey({ note });
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const setActiveLockedNotes = useMusicStore(
    (state) => state.setActiveLockedNotes,
  );
  const activeLockedNotes = useMusicStore((state) => state.activeLockedNotes);

  const {
    isWhitePianoKey,
    pianoKeyShape,
    isVisible,
    isRoleNote,
    isShapeSelected,
  } = visualState;

  const label = (
    <NoteLabel
      isVisible={isVisible || activeLockedNotes.includes(note.noteId)}
      variant="piano"
      noteLabel={getEnharmonicNoteName(note)}
    />
  );

  return (
    <S.KeyWrapper
      $isWhitePianoKey={isWhitePianoKey}
      $pianoKeyShape={pianoKeyShape}
      onMouseOver={interactivity.handleMouseEnter}
      onMouseLeave={interactivity.handleMouseLeave}
      onClick={() => {
        setActiveLockedNotes(note.noteId);
      }}
      data-piano-scroll-target={interactivity.isScrollTarget}
    >
      <S.Key
        $isShapeSelected={isShapeSelected}
        $isWhitePianoKey={isWhitePianoKey}
        $pianoKeyShape={pianoKeyShape}
        $isVisible={isVisible || activeLockedNotes.includes(note.noteId)}
        $isRoleNote={isRoleNote}
        //
      ></S.Key>
      {isWhitePianoKey ? (
        <WhiteKeyJustifyContainer>{label}</WhiteKeyJustifyContainer>
      ) : (
        <BlacKeyJustifyContainer>{label}</BlacKeyJustifyContainer>
      )}
    </S.KeyWrapper>
  );
};

export default PianoKey;
