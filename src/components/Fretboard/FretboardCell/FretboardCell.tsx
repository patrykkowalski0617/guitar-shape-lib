import * as S from "./parts";
import type { NoteObject } from "@/utils";
import VariantDots from "@/components/Fretboard/VariantDots/VariantDots";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCell, useNoteState } from "./hooks";
import { usePlayerStore } from "@/store";

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
  const transitionTime = usePlayerStore((state) => state.transitionTime);

  const { states, actions } = useFretboardCell();

  const noteState = useNoteState({
    sharpNoteName: noteData.sharpNoteName,
    noteId: noteData.noteId,
    stringIndex,
    fretIndex,
  });

  const handleMouseEnter = () => {
    actions.setActiveNoteId(noteData.noteId);
  };

  const handleMouseLeave = () => {
    actions.setActiveNoteId(null);
  };

  return (
    <S.FretWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <S.Fret $isLockedNote={noteState.isLockedNote} data-fret={fretIndex}>
        {noteState.isShapeRootNote && (
          <VariantDots stringIndex={stringIndex} fretIndex={fretIndex} />
        )}
        <S.Note
          $opacity={noteState.opacity}
          $brightness={noteState.brightness}
          $cursor={noteState.cursor}
          $isShapeNote={noteState.isShapeNote}
          $transitionTime={transitionTime}
        >
          <NoteLabel
            isHighlighted={noteState.isShapeNote}
            flatNoteName={noteData.flatNoteName}
            sharpNoteName={noteData.sharpNoteName}
            isShapeNote={noteState.isShapeNote}
            isFlatTune={states.isFlatTune}
            isEnharmonic={noteData.isEnharmonic}
            variant="fretboard"
          />
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
