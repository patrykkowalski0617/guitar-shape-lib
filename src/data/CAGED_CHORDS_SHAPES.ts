import type { FretboardCoordinate } from "@/data";

export interface BaseChordShape {
  CAGEDassigment: string;
  baseFretIndex: number;
  baseStringIndex: number;
  coordinates: FretboardCoordinate[];
}

export interface CAGEDChordShape {
  major: BaseChordShape[];
  minor: BaseChordShape[];
  halfDim: BaseChordShape[];
}

export const CAGED_CHORDS_SHAPES: CAGEDChordShape = {
  major: [
    {
      CAGEDassigment: "C",
      baseFretIndex: 3,
      baseStringIndex: 4,
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
      baseStringIndex: 4,
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
      baseStringIndex: 5,
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
      baseStringIndex: 5,
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
      baseStringIndex: 3,
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
      baseStringIndex: 4,
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
      baseStringIndex: 4,
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
      baseStringIndex: 5,
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
      baseStringIndex: 5,
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
      baseStringIndex: 3,
      coordinates: [
        [3, 0],
        [2, 2],
        [1, 3],
        [0, 1],
      ],
    },
  ],
  halfDim: [
    {
      CAGEDassigment: "A",
      baseFretIndex: 3,
      baseStringIndex: 4,
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
      baseStringIndex: 4,
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
      baseStringIndex: 5,
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
      baseStringIndex: 5,
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
      baseStringIndex: 3,
      coordinates: [
        [3, 0],
        [2, 1],
        [1, 1],
        [0, 1],
      ],
    },
  ],
};
