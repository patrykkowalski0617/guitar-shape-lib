import * as S from "./parts";
import { useEffect, useRef, type JSX } from "react";
import FretboardCell from "../FretboardCell/FretboardCell";
import { useControllersStore, useMetronomeStore } from "@/store";
import { isShapeCell as isShapeCellFn } from "./helpers";
import type { FretboardRowProps } from "./types";
import StringGlow from "./StringGlow/StringGlow";

export default function FretboardRow({
  stringIndex,
  rowNotes,
  guitarShapeCoordinates,
  baseChordCoordinates,
  nextTargetShapeCoordinates,
}: FretboardRowProps): JSX.Element {
  const visibleStrings = useControllersStore((s) => s.visibleStrings);
  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const isVisibleString = visibleStrings.includes(stringIndex);
  const currentStep = useMetronomeStore((s) => s.currentStep);

  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (stringIndex !== 0) return;
  }, [currentStep, stringIndex]);

  return (
    <S.FretboardRow ref={rowRef} $isVisibleString={isVisibleString}>
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
        const isInNextTargetShape =
          isPlaying &&
          isShapeCellFn({
            guitarShapeCoordinates: nextTargetShapeCoordinates,
            stringIndex,
            fretIndex,
          });

        return (
          <FretboardCell
            key={`${stringIndex}-${fretIndex}`}
            noteObject={noteObject}
            fretIndex={fretIndex}
            isNutCell={stringIndex === 0 && fretIndex === 0}
            isVisibleString={isVisibleString}
            isShapeCell={isShapeCell}
            isBaseChordCell={isBaseChordCell}
            isInNextTargetShape={isInNextTargetShape}
          />
        );
      })}
      <StringGlow isVisibleString={isVisibleString} rowRef={rowRef} />
    </S.FretboardRow>
  );
}
