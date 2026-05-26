import type { StringValidIndex } from "@/components/GuitarFretboard/constants";
import type { FretboardCoordinate } from "@/data";

export interface BaseChordShape {
  CAGEDassigment: string;
  baseFretIndex: number;
  baseStringIndexes: StringValidIndex;
  coordinates: FretboardCoordinate[];
}

export interface CAGEDChordShape {
  major: BaseChordShape[];
  minor: BaseChordShape[];
  BaseChord7: BaseChordShape[];
  BaseChord7dim: BaseChordShape[];
}

export const CAGED_BASE_CHORDS_SHAPES: CAGEDChordShape = {
  major: [
    {
      CAGEDassigment: "C",
      baseFretIndex: 3,
      baseStringIndexes: 4,
      coordinates: [
        [4, 0],
        [3, -1],
        [2, -3],
        [1, -2],
        [0, -3],
      ],
    },
    {
      CAGEDassigment: "A",
      baseFretIndex: 3,
      baseStringIndexes: 4,
      coordinates: [
        [4, 0],
        [3, 2],
        [2, 2],
        [1, 2],
        [0, 0],
      ],
    },
    {
      CAGEDassigment: "G",
      baseFretIndex: 8,
      baseStringIndexes: 5,
      coordinates: [
        [5, 0],
        [4, -1],
        [3, -3],
        [2, -3],
        [1, -3],
        [0, 0],
      ],
    },
    {
      CAGEDassigment: "E",
      baseFretIndex: 8,
      baseStringIndexes: 5,
      coordinates: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 1],
        [1, 0],
        [0, 0],
      ],
    },
    {
      CAGEDassigment: "D",
      baseFretIndex: 10,
      baseStringIndexes: 3,
      coordinates: [
        [3, 0],
        [2, 2],
        [1, 3],
        [0, 2],
      ],
    },
  ],
  minor: [
    {
      CAGEDassigment: "C",
      baseFretIndex: 3,
      baseStringIndexes: 4,
      coordinates: [
        [4, 0],
        [3, -2],
        [2, -3],
        [1, -2],
        [0, -4],
      ],
    },
    {
      CAGEDassigment: "A",
      baseFretIndex: 3,
      baseStringIndexes: 4,
      coordinates: [
        [4, 0],
        [3, 2],
        [2, 2],
        [1, 1],
        [0, 0],
      ],
    },
    {
      CAGEDassigment: "G",
      baseFretIndex: 8,
      baseStringIndexes: 5,
      coordinates: [
        [5, 0],
        [4, -2],
        [3, -3],
        [2, -3],
        [1, 0],
        [0, 0],
      ],
    },
    {
      CAGEDassigment: "E",
      baseFretIndex: 8,
      baseStringIndexes: 5,
      coordinates: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 0],
        [1, 0],
        [0, 0],
      ],
    },
    {
      CAGEDassigment: "D",
      baseFretIndex: 10,
      baseStringIndexes: 3,
      coordinates: [
        [3, 0],
        [2, 2],
        [1, 3],
        [0, 1],
      ],
    },
  ],
  BaseChord7: [
    {
      CAGEDassigment: "A",
      baseFretIndex: 3,
      baseStringIndexes: 4,
      coordinates: [
        [4, 0],
        [2, 0],
        [1, 1],
        [0, -1],
      ],
    },
    {
      CAGEDassigment: "Aalt",
      baseFretIndex: 3,
      baseStringIndexes: 4,
      coordinates: [
        [4, 0],
        [3, 1],
        [2, 0],
        [1, 1],
      ],
    },
    {
      CAGEDassigment: "G",
      baseFretIndex: 8,
      baseStringIndexes: 5,
      coordinates: [
        [5, 0],
        [4, -2],
        [3, 0],
        [1, -1],
      ],
    },
    {
      CAGEDassigment: "E",
      baseFretIndex: 8,
      baseStringIndexes: 5,
      coordinates: [
        [5, 0],
        [4, 1],
        [3, 0],
        [2, 0],
      ],
    },
    {
      CAGEDassigment: "D",
      baseFretIndex: 10,
      baseStringIndexes: 3,
      coordinates: [
        [3, 0],
        [2, 1],
        [1, 1],
        [0, 1],
      ],
    },
  ],
  BaseChord7dim: [
    {
      CAGEDassigment: "A",
      baseFretIndex: 3,
      baseStringIndexes: 4,
      coordinates: [
        [4, 0],
        [2, 0],
        [1, 1],
        [0, -1],
      ],
    },
    {
      CAGEDassigment: "Aalt",
      baseFretIndex: 3,
      baseStringIndexes: 4,
      coordinates: [
        [4, 0],
        [3, 1],
        [2, 0],
        [1, 1],
      ],
    },
    {
      CAGEDassigment: "G",
      baseFretIndex: 8,
      baseStringIndexes: 5,
      coordinates: [
        [5, 0],
        [4, -2],
        [3, 0],
        [1, -1],
      ],
    },
    {
      CAGEDassigment: "E",
      baseFretIndex: 8,
      baseStringIndexes: 5,
      coordinates: [
        [5, 0],
        [4, 1],
        [3, 0],
        [2, 0],
      ],
    },
    {
      CAGEDassigment: "D",
      baseFretIndex: 10,
      baseStringIndexes: 3,
      coordinates: [
        [3, 0],
        [2, 1],
        [1, 1],
        [0, 1],
      ],
    },
  ],
};
