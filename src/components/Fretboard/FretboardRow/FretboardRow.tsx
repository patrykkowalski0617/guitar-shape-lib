import * as S from "./parts";
import { useRef, useCallback, type JSX } from "react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import FretCell from "../FretCell/FretCell";
import { useFretboardRow } from "./helpers/useFretboardRow";
import type { NoteSharp } from "@/utils";

export type StringIndex = 0 | 1 | 2 | 3 | 4 | 5;

interface FretboardRowProps {
  stringIndex: StringIndex;
  firstNoteInRow: NoteSharp;
  octaveNumber: number;
}

export default function FretboardRow({
  stringIndex,
  firstNoteInRow,
  octaveNumber,
}: FretboardRowProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { rowNotes, state, actions } = useFretboardRow(firstNoteInRow, octaveNumber);

  useHorizontalScroll(scrollRef);

  // Wydzielona logika kliknięcia dla lepszej czytelności JSX
  const handleCellClick = useCallback(
    (fretIndex: number, isShapeRootNoteWithVariants: boolean) => {
      if (state.isDevMode) {
        actions.onDevClick(stringIndex, fretIndex);
      }

      if (isShapeRootNoteWithVariants) {
        actions.setNextShapeVariantLocationData(stringIndex, fretIndex);
      }
    },
    [state.isDevMode, stringIndex, actions],
  );

  return (
    <S.FretboardRow ref={scrollRef}>
      {rowNotes.map((noteData, fretIndex) => {
        const isShapeRootNote = state.shapeRootSharpNote === noteData.sharpNoteName;
        const isShapeRootNoteWithVariants = isShapeRootNote && stringIndex > 1;
        const isShapeNote = actions.isShapeNote([stringIndex, fretIndex]);
        const isLockedNote = actions.isLockedShapeNote([stringIndex, fretIndex]);
        const isTuneNote = actions.isTuneNote(noteData.sharpNoteName);
        const isActive = state.activeNoteId === noteData.noteId;
        const isDevNote = actions.isDevNote(stringIndex, fretIndex);

        return (
          <FretCell
            key={`${stringIndex}-${fretIndex}`}
            noteData={noteData}
            stringIndex={stringIndex}
            //
            isShapeNote={isShapeNote}
            isShapeRootNote={isShapeRootNote}
            isShapeRootNoteWithVariants={isShapeRootNoteWithVariants}
            isLockedNote={isLockedNote}
            //
            isTuneNote={isTuneNote}
            isActive={isActive}
            isDevNote={isDevNote}
            isFlatTune={state.isFlatTune}
            //
            lockedRoleId={state.lockedRoleId}
            currentRoleId={state.currentRoleId}
            areAnimationsOn={state.areAnimationsOn}
            //
            onHover={actions.setActiveNoteId}
            onLeave={() => actions.setActiveNoteId(null)}
            onClick={() => handleCellClick(fretIndex, isShapeRootNoteWithVariants)}
          />
        );
      })}
    </S.FretboardRow>
  );
}
