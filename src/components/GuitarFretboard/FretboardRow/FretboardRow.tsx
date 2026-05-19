import * as S from "./parts";
import { useRef, type JSX } from "react";
import FretboardCell from "../FretboardCell/FretboardCell";
import type { NoteObject } from "@/utils";
import type { StringValidIndex } from "../constants";
import { useControllersStore } from "@/store";
import type { FretboardCoordinate } from "@/data";
import { isShapeCell as isShapeCellFn } from "./helpers";

interface FretboardRowProps {
  stringIndex: StringValidIndex;
  rowNotes: NoteObject[];
  guitarShapeCoordinates: FretboardCoordinate[];
  baseChordCoordinates: FretboardCoordinate[];
}

export default function FretboardRow({
  stringIndex,
  rowNotes,
  guitarShapeCoordinates,
  baseChordCoordinates,
}: FretboardRowProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibleStrings = useControllersStore((state) => state.visibleStrings);
  const isVisibleString = visibleStrings.includes(stringIndex);

  return (
    <S.FretboardRow ref={scrollRef} $isVisibleString={isVisibleString}>
      {rowNotes.map((noteObject, fretIndex) => {
        const isShapeCell = isShapeCellFn({
          guitarShapeCoordinates,
          stringIndex,
          fretIndex,
        });
        const isBaseChordCell = isShapeCellFn({
          guitarShapeCoordinates: baseChordCoordinates,
          stringIndex,
          fretIndex,
        });
        return (
          <FretboardCell
            key={`${stringIndex}-${fretIndex}`}
            noteObject={noteObject}
            fretIndex={fretIndex}
            isVisibleString={isVisibleString}
            isShapeCell={isShapeCell}
            isBaseChordCell={isBaseChordCell}
          />
        );
      })}
    </S.FretboardRow>
  );
}
