import * as S from "./parts";
import { useRef, type JSX } from "react";
import FretCell from "../FretCell/FretCell";
import { getNotes } from "@/utils";
import { type Note, type NoteSharp } from "@/data";
import { numberOfFrets } from "./helpers/constants";

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

  const rowNotes = getNotes({
    firstNote: firstNoteInRow as Note,
    length: numberOfFrets,
    firstOctave: firstNoteOctaveNumber,
  });

  return (
    <S.FretboardRow ref={scrollRef}>
      {rowNotes.map((noteData, fretIndex) => {
        return (
          <FretCell
            key={`${stringIndex}-${fretIndex}`}
            noteData={noteData}
            stringIndex={stringIndex}
            fretIndex={fretIndex}
          />
        );
      })}
    </S.FretboardRow>
  );
}
