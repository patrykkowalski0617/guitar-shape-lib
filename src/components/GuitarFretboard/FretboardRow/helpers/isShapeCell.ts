import type { FretboardCoordinate } from "@/data";

interface IsShapeNoteParams {
  shapeCoordinates: FretboardCoordinate[];
  stringIndex: number;
  fretIndex: number;
}

export const isShapeCell = ({
  shapeCoordinates,
  stringIndex,
  fretIndex,
}: IsShapeNoteParams): boolean => {
  const hasCoordinates = !!shapeCoordinates;

  return hasCoordinates
    ? shapeCoordinates.some(
        ([shapeStringIndex, shapeFretIndex]) =>
          shapeStringIndex === stringIndex && shapeFretIndex === fretIndex,
      )
    : false;
};
