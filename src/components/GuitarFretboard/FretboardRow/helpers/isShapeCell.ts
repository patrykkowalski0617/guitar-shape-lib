import type { FretboardCoordinate } from "@/data";

interface IsShapeNoteParams {
  guitarShapeCoordinates: FretboardCoordinate[];
  stringIndex: number;
  fretIndex: number;
}

export const isShapeCell = ({
  guitarShapeCoordinates,
  stringIndex,
  fretIndex,
}: IsShapeNoteParams): boolean => {
  const hasCoordinates = !!guitarShapeCoordinates;

  return hasCoordinates
    ? guitarShapeCoordinates.some(
        ([guitarShapeStringIndex, guitarShapeFretIndex]) =>
          guitarShapeStringIndex === stringIndex &&
          guitarShapeFretIndex === fretIndex,
      )
    : false;
};
