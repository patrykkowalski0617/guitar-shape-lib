export type Shape = { coordinates: [number, number][] };

export const isBaseChordNote = ({
  matchingBaseChordCoordinates,
  stringIndex,
  fretIndex,
}: {
  matchingBaseChordCoordinates?: Shape;
  stringIndex: number;
  fretIndex: number;
}) => {
  return !!matchingBaseChordCoordinates?.coordinates.some(
    (coord) => coord[0] === stringIndex && coord[1] === fretIndex,
  );
};
