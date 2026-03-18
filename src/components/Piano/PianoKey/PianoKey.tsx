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
    isRoleSelected,
    isShapeSelected,
  } = visualState;

  return (
    <S.Key
      $isRoleSelected={isRoleSelected}
      $isShapeSelected={isShapeSelected}
      $isShapeNote={isShapeNote}
      $isActiveNote={isActiveNote}
      $isWhitePianoKey={isWhitePianoKey}
      $pianoKeyShape={pianoKeyShape}
      $isHighlighted={isHighlighted}
      $isRoleNote={isRoleNote}
      data-piano-scroll-target={interactivity.isScrollTarget}
      onMouseOver={interactivity.handleMouseEnter}
      onMouseLeave={interactivity.handleMouseLeave}
      onClick={interactivity.handleClick}
    >
      <NoteLabel
        isShapeNote={isShapeNote}
        isActiveNote={isActiveNote}
        variant="piano"
        noteLabel={getEnharmonicNoteName(note)}
      />
    </S.Key>
  );
};

export default PianoKey;
