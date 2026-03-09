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
    isFlatTune,
    isWhitePianoKey,
    pianoKeyShape,
    isHighlighted,
    isActiveNote,
    isShapeNote,
    isRoleNote,
    isRoleActive,
    isShapeActive,
  } = visualState;

  return (
    <S.Key
      $isRoleSelected={isRoleActive}
      $isShapeSelected={isShapeActive}
      $isShapeNote={isShapeNote}
      $isActiveNote={isActiveNote}
      $isWhitePianoKey={isWhitePianoKey}
      $pianoKeyShape={pianoKeyShape}
      $isHighlighted={isHighlighted}
      $isRoleNote={isRoleNote}
      data-piano-scroll-target={interactivity.isScrollTarget}
      onMouseOver={interactivity.handleMouseEnter}
      onMouseLeave={interactivity.handleMouseLeave}
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
