import type { FretboardCoordinate } from "./shapes";

export type CAGEDassigment = "C" | "A" | "G" | "E" | "D";

export interface ChordShape {
  CAGEDassigment: CAGEDassigment;
  baseFretIndex: number;
  coordinates: FretboardCoordinate[];
}

export interface BaseChordsShapes {
  major: ChordShape[];
  minor: ChordShape[];
}

export const baseChordsShapes: BaseChordsShapes = {
  major: [
    {
      CAGEDassigment: "C",
      baseFretIndex: 3,
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
      coordinates: [
        [3, 0],
        [2, 2],
        [1, 3],
        [0, 1],
      ],
    },
  ],
};
