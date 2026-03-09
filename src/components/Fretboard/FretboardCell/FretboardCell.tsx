import * as S from "./parts";
import type { NoteObject } from "@/utils";
import VariantDots from "@/components/Fretboard/VariantDots/VariantDots";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCellInteraction } from "./hooks/useFretboardCellInteraction";

interface FretboardCellProps {
  noteData: NoteObject;
  stringIndex: StringIndex;
  fretIndex: number;
}

export default function FretboardCell({
  noteData,
  stringIndex,
  fretIndex,
}: FretboardCellProps) {
  const {
    noteState,
    isFlatTune,
    transitionTime,
    handleMouseEnter,
    handleMouseLeave,
  } = useFretboardCellInteraction({ noteData, stringIndex, fretIndex });

  const {
    isLockedNote,
    isShapeRootNote,
    isShapeNote,
    opacity,
    brightness,
    cursor,
  } = noteState;

  return (
    <S.FretWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <S.Fret $isLockedNote={isLockedNote} data-fret={fretIndex}>
        {isShapeRootNote && (
          <VariantDots stringIndex={stringIndex} fretIndex={fretIndex} />
        )}

        <S.Note
          $opacity={opacity}
          $brightness={brightness}
          $cursor={cursor}
          $isShapeNote={isShapeNote}
          $transitionTime={transitionTime}
        >
          <NoteLabel
            isHighlighted={isShapeNote}
            flatNoteName={noteData.flatNoteName}
            sharpNoteName={noteData.sharpNoteName}
            isShapeNote={isShapeNote}
            isFlatTune={isFlatTune}
            isEnharmonic={noteData.isEnharmonic}
            variant="fretboard"
          />
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
