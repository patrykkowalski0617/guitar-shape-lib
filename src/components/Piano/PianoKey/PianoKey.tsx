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
  const shapeNoteIds = useMusicStore((state) => state.shapeNoteIds);

  const {
    isWhitePianoKey,
    pianoKeyShape,
    isVisible,
    isRoleNote,
    isShapeSelected,
  } = visualState;

  const isPushed =
    isVisible ||
    activeLockedNotes.includes(note.noteId) ||
    shapeNoteIds.includes(note.noteId);

  const label = (
    <NoteLabel
      isVisible={isPushed}
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
        $isPushed={isPushed}
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
