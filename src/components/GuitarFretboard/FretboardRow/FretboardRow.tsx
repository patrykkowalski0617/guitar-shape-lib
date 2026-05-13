import * as S from "./parts";
import { useRef, type JSX } from "react";
import FretboardCell from "../FretboardCell/FretboardCell";
import type { NoteObject } from "@/utils";
import type { StringValidIndex } from "../constants";
import { useControlsStore } from "@/store";
import type { BaseChordShape, FretboardCoordinate } from "@/data";
import {
  isShapeCell as isShapeCellFn,
  isBaseChordCell as isBaseChordCellFn,
} from "./helpers";

interface FretboardRowProps {
  stringIndex: StringValidIndex;
  rowNotes: NoteObject[];
  shapeCoordinates: FretboardCoordinate[];
  baseChordMatch: BaseChordShape | null;
}

export default function FretboardRow({
  stringIndex,
  rowNotes,
  shapeCoordinates,
  baseChordMatch,
}: FretboardRowProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibleStrings = useControlsStore((state) => state.visibleStrings);
  const isVisibleString = visibleStrings.includes(stringIndex);

  return (
    <S.FretboardRow ref={scrollRef} $isVisibleString={isVisibleString}>
      {rowNotes.map((noteData, fretIndex) => {
        const isShapeCell = isShapeCellFn({
          shapeCoordinates,
          stringIndex,
          fretIndex,
        });
        const isBaseChordCell = isBaseChordCellFn({
          baseChordMatch,
          stringIndex,
          fretIndex,
        });
        return (
          <FretboardCell
            key={`${stringIndex}-${fretIndex}`}
            noteData={noteData}
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
