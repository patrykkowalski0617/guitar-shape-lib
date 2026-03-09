export const isShapeNote = (
  coords: [number, number],
  notesInSapeCoordinates: number[][],
): boolean => {
  const [stringIndex, fretIndex] = coords;

  return notesInSapeCoordinates.some(
    ([shapeS, shapeF]) => shapeS === stringIndex && shapeF === fretIndex,
  );
};
