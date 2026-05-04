import type { FretboardCoordinate } from "@/data";

export const isShapeNote = (
  currentCoordinates: FretboardCoordinate,
  shapeCoordinates: FretboardCoordinate[],
): boolean => {
  const [currentStringIndex, currentFretIndex] = currentCoordinates;

  return shapeCoordinates.some(
    ([shapeStringIndex, shapeFretIndex]) =>
      shapeStringIndex === currentStringIndex &&
      shapeFretIndex === currentFretIndex,
  );
};
