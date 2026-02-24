import * as S from "./parts";
import type { NoteObject } from "@/utils";
import VariantProgressDots from "@/components/Fretboard/VariantProgressDots/VariantProgressDots";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretCell, useNoteState, useFretboardStates } from "./helpers";
import { usePlayerStore } from "@/store";

interface FretCellProps {
  noteData: NoteObject;
  stringIndex: StringIndex;
  fretIndex: number;
}

export default function FretCell({ noteData, stringIndex, fretIndex }: FretCellProps) {
  const transitionTime = usePlayerStore((state) => state.transitionTime);
  const { states, actions } = useFretCell();
  const { isShapeSelected, shouldMarkTuneNotes } = useFretboardStates();
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const { isActiveNote, isShapeRootNote, isShapeNote, isLockedNote, isTuneNote } = useNoteState({
    sharpNoteName: noteData.sharpNoteName,
    noteId: noteData.noteId,
    stringIndex,
    fretIndex,
  });

  return (
    <S.FretWrapper
      onMouseEnter={() => actions.setActiveNoteId(noteData.noteId)}
      onMouseLeave={() => actions.setActiveNoteId(null)}
    >
      <S.Fret $isLockedNote={isLockedNote} data-fret={fretIndex}>
        {isShapeRootNote && <VariantProgressDots stringIndex={stringIndex} fretIndex={fretIndex} />}
        <S.Note
          $isLockedNote={isLockedNote}
          $isActiveNote={isActiveNote && !isPlaying}
          $isShapeRootNote={isShapeRootNote && !isPlaying}
          $isShapeNote={isShapeNote}
          $isTuneNote={isTuneNote}
          $isShapeSelected={isShapeSelected}
          $shouldMarkTuneNotes={shouldMarkTuneNotes}
          $transitionTime={transitionTime}
        >
          <NoteLabel
            isHighlighted={isShapeNote}
            flatNoteName={noteData.flatNoteName}
            sharpNoteName={noteData.sharpNoteName}
            isShapeNote={isShapeNote}
            isFlatTune={states.isFlatTune}
            isEnharmonic={noteData.isEnharmonic}
            variant="fretboard"
          />
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
