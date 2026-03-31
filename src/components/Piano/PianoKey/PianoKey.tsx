import * as S from "./parts";
import { type NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { usePianoKey } from "./hooks/usePianoKey";
import { useEnharmonicNoteName } from "@/hooks";

interface PianoKeyProps {
  note: NoteObject;
}

const PianoKey = ({ note }: PianoKeyProps) => {
  const { visualState, interactivity } = usePianoKey({ note });
  const getEnharmonicNoteName = useEnharmonicNoteName();

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
      $isTuneKeyNote={true}
      $isWhitePianoKey={isWhitePianoKey}
      $pianoKeyShape={pianoKeyShape}
      $isHighlighted={isHighlighted}
      $isRoleNote={isRoleNote}
      data-piano-scroll-target={interactivity.isScrollTarget}
      onMouseOver={interactivity.handleMouseEnter}
      onMouseLeave={interactivity.handleMouseLeave}
    >
      {isWhitePianoKey ? (
        <S.WhiteKeyJustifyContainer>{label}</S.WhiteKeyJustifyContainer>
      ) : (
        label
      )}
    </S.Key>
  );
};

export default PianoKey;
