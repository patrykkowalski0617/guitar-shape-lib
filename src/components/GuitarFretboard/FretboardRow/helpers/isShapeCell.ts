import type { FretboardCoordinate } from "@/data";
import type { IsShapeCellParams } from "../types";

export const isShapeCell = ({
  guitarShapeCoordinates,
  stringIndex,
  fretIndex,
}: IsShapeCellParams): boolean =>
  guitarShapeCoordinates.some(
    ([shapeStringIndex, shapeFretIndex]: FretboardCoordinate) =>
      shapeStringIndex === stringIndex && shapeFretIndex === fretIndex,
  );
