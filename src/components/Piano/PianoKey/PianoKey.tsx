import * as S from "./parts";
import { type NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { usePianoKey } from "./hooks/usePianoKey";

interface PianoKeyProps {
  note: NoteObject;
}

const PianoKey = ({ note }: PianoKeyProps) => {
  const { visualState, interactivity } = usePianoKey({ note });

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
        note={note}
      />
    </S.Key>
  );
};

export default PianoKey;
