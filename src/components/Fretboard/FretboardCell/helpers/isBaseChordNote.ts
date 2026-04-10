export const isBaseChordNote = ({
  matchingBaseChordCoordinates,
  stringIndex,
  fretIndex,
}: {
  matchingBaseChordCoordinates?: { coordinates: [number, number][] };
  stringIndex: number;
  fretIndex: number;
}) => {
  return !!matchingBaseChordCoordinates?.coordinates.some(
    (coord) => coord[0] === stringIndex && coord[1] === fretIndex,
  );
};
