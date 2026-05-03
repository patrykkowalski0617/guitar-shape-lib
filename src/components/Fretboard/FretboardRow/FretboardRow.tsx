import * as S from "./parts";
import { useRef, type JSX } from "react";
import FretboardCell from "../FretboardCell/FretboardCell";
import type { NoteObject } from "@/utils";
export type StringIndex = 0 | 1 | 2 | 3 | 4 | 5;

interface FretboardRowProps {
  stringIndex: StringIndex;
  rowNotes: NoteObject[];
}

export default function FretboardRow({
  stringIndex,
  rowNotes,
}: FretboardRowProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <S.FretboardRow ref={scrollRef}>
      {rowNotes.map((noteData, fretIndex) => (
        <FretboardCell
          key={`${stringIndex}-${fretIndex}`}
          noteData={noteData}
          stringIndex={stringIndex}
          fretIndex={fretIndex}
        />
      ))}
    </S.FretboardRow>
  );
}
