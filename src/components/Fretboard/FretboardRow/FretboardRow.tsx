import * as S from "./parts";
import { useRef, type JSX } from "react";
import FretboardCell from "../FretboardCell/FretboardCell";
import type { NoteObject } from "@/utils";
import type { StringIndex } from "../constants";
import { useControlsStore } from "@/store";

interface FretboardRowProps {
  stringIndex: StringIndex;
  rowNotes: NoteObject[];
}

export default function FretboardRow({
  stringIndex,
  rowNotes,
}: FretboardRowProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibleStrings = useControlsStore((state) => state.visibleStrings);
  const isVisibleString = visibleStrings.includes(stringIndex);

  return (
    <S.FretboardRow ref={scrollRef} $isVisibleString={isVisibleString}>
      {rowNotes.map((noteData, fretIndex) => (
        <FretboardCell
          key={`${stringIndex}-${fretIndex}`}
          noteData={noteData}
          stringIndex={stringIndex}
          fretIndex={fretIndex}
          isVisibleString={isVisibleString}
        />
      ))}
    </S.FretboardRow>
  );
}
