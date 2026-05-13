import type { FretboardCoordinate } from "@/data";

export type Shape = { coordinates: FretboardCoordinate[] };

export const isBaseChordCell = ({
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
