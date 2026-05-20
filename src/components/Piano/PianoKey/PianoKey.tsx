import * as S from "./parts/parts";
import { type NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { usePianoKey } from "./hooks/usePianoKey";
import { useEnharmonicNoteName } from "@/hooks";
import { WhiteKeyJustifyContainer } from "./parts/whiteKeys";
import { useMusicStore } from "@/store/useMusicStore/useMusicStore";
import { BlacKeyJustifyContainer } from "./parts/blackKeys";

interface PianoKeyProps {
  noteObject: NoteObject;
}

const PianoKey = ({ noteObject }: PianoKeyProps) => {
  const { visualState, interactivity } = usePianoKey({ noteObject });
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const setActiveLockedNoteIds = useMusicStore(
    (state) => state.setActiveLockedNoteIds,
  );

  const { isWhitePianoKey, pianoKeyShape, isPushed, isShapeSelected } =
    visualState;

  const noteLabel = getEnharmonicNoteName(noteObject);

  const label = noteLabel ? (
    <NoteLabel isVisible={isPushed} variant="piano" noteLabel={noteLabel} />
  ) : null;

  return (
    <S.KeyWrapper
      $isWhitePianoKey={isWhitePianoKey}
      $pianoKeyShape={pianoKeyShape}
      onMouseOver={interactivity.handleMouseEnter}
      onMouseLeave={interactivity.handleMouseLeave}
      onClick={() => {
        setActiveLockedNoteIds(noteObject.noteId);
      }}
      data-piano-scroll-target={interactivity.isScrollTarget}
    >
      <S.Key
        $isShapeSelected={isShapeSelected}
        $isWhitePianoKey={isWhitePianoKey}
        $pianoKeyShape={pianoKeyShape}
        $isPushed={isPushed}
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
