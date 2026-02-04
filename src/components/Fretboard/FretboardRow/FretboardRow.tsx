import * as S from "./parts";
import { useRef, type JSX } from "react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import FretCell from "../FretCell/FretCell";
import { useFretboardRow } from "./helpers/useFretboardRow";
import type { NoteSharp } from "@/utils";
import { useShapeReset } from "./helpers/useShapeReset";

export type StringIndex = 0 | 1 | 2 | 3 | 4 | 5;

interface FretboardRowProps {
  stringIndex: StringIndex;
  firstNoteInRow: NoteSharp;
  firstNoteOctaveNumber: number;
}

export default function FretboardRow({
  stringIndex,
  firstNoteInRow,
  firstNoteOctaveNumber,
}: FretboardRowProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { rowNotes } = useFretboardRow(firstNoteInRow, firstNoteOctaveNumber);

  useHorizontalScroll(scrollRef);
  useShapeReset();

  return (
    <S.FretboardRow ref={scrollRef}>
      {rowNotes.map((noteData, fretIndex) => {
        return (
          <FretCell
            key={`${stringIndex}-${fretIndex}`}
            noteData={noteData}
            stringIndex={stringIndex}
            fretIndex={fretIndex}
            firstNoteInRow={firstNoteInRow}
            firstNoteOctaveNumber={firstNoteOctaveNumber}
          />
        );
      })}
    </S.FretboardRow>
  );
}
