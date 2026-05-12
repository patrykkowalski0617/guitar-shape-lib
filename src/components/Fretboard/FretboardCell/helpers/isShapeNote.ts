import type { FretboardCoordinate } from "@/data";

export const isShapeNote = (
  currentCoordinates: FretboardCoordinate,
  shapeCoordinates: FretboardCoordinate[],
): boolean => {
  const [currentStringIndexes, currentFretIndex] = currentCoordinates;

  return shapeCoordinates.some(
    ([shapeStringIndexes, shapeFretIndex]) =>
      shapeStringIndexes === currentStringIndexes &&
      shapeFretIndex === currentFretIndex,
  );
};
