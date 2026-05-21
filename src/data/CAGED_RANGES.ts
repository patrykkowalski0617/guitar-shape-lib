import type { FretboardCoordinate } from "./GUITAR_SHAPES";

export interface CAGEDRange {
  CAGED_NAME: string;
  baseFretIndex: number;
  range: [FretboardCoordinate, FretboardCoordinate];
}

export const CAGED_RANGES: CAGEDRange[] = [
  // prettier-ignore
  { CAGED_NAME: "C", baseFretIndex: 8, range: [[5,0],[5,4]] },
  // prettier-ignore
  { CAGED_NAME: "B", baseFretIndex: 7, range: [[5,0],[5,3]] },
  // prettier-ignore
  { CAGED_NAME: "A", baseFretIndex: 5, range: [[5,0],[5,3]] },
  // prettier-ignore
  { CAGED_NAME: "G", baseFretIndex: 3, range: [[5,0],[5,4]] },
  // prettier-ignore
  { CAGED_NAME: "F", baseFretIndex: 1, range: [[5,0],[5,4]] },
  // prettier-ignore
  { CAGED_NAME: "E", baseFretIndex: 0, range: [[5,0],[5,3]] },
  // prettier-ignore
  { CAGED_NAME: "D", baseFretIndex: 10, range: [[5,0],[5,3]] },
];
