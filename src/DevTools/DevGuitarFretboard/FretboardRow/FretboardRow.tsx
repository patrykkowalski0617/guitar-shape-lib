import * as S from "./parts";
import { type JSX } from "react";
import FretboardCell from "../FretboardCell/FretboardCell";
import { useControllersStore } from "@/store";
import { isShapeCell as isShapeCellFn } from "./helpers";
import type { FretboardRowProps } from "./types";

export default function FretboardRow({
  stringIndex,
  rowNotes,
  guitarShapeCoordinates,
  baseChordCoordinates,
  nextTargetShapeCoordinates,
}: FretboardRowProps): JSX.Element {
  const visibleStrings = useControllersStore((s) => s.visibleStrings);
  const isVisibleString = visibleStrings.includes(stringIndex);

  return (
    <S.FretboardRow $isVisibleString={isVisibleString}>
      {rowNotes.map((noteObject, fretIndex) => (
        <FretboardCell
          key={`${stringIndex}-${fretIndex}`}
          noteObject={noteObject}
          fretIndex={fretIndex}
          stringIndex={stringIndex}
          isVisibleString={isVisibleString}
          isShapeCell={isShapeCellFn({
            guitarShapeCoordinates,
            stringIndex,
            fretIndex,
          })}
          isBaseChordCell={isShapeCellFn({
            guitarShapeCoordinates: baseChordCoordinates,
            stringIndex,
            fretIndex,
          })}
          nextTargetShapeCoordinates={nextTargetShapeCoordinates}
        />
      ))}
    </S.FretboardRow>
  );
}
