import type { FretboardCoordinate } from "@/data";

export const isShapeNote = (
  currentCoordinates: FretboardCoordinate,
  shapeCoordinates: FretboardCoordinate[],
): boolean => {
  const [currentStringIndex, currentFretIndex] = currentCoordinates;
  console.log(shapeCoordinates); // dla jednego przypadku shapeFretIndex źle się wylicza

  return shapeCoordinates.some(
    ([shapeStringIndex, shapeFretIndex]) =>
      shapeStringIndex === currentStringIndex &&
      shapeFretIndex === currentFretIndex,
  );
};
