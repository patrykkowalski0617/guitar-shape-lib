import type { BaseChordShape } from "@/data";

export const isBaseChordCell = ({
  baseChordMatch,
  stringIndex,
  fretIndex,
}: {
  baseChordMatch?: BaseChordShape | null;
  stringIndex: number;
  fretIndex: number;
}) => {
  return !!baseChordMatch?.coordinates.some(
    (coord) => coord[0] === stringIndex && coord[1] === fretIndex,
  );
};
