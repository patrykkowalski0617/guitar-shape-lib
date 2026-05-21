import type { FretboardCoordinate } from "./GUITAR_SHAPES";

export interface CAGED_System {
  CAGED_NAME: string;
  baseFretIndex: number;
  coordinates: FretboardCoordinate[];
}

export const CAGED_SYSTEM: CAGED_System[] = [
  // prettier-ignore
  { CAGED_NAME: "C", baseFretIndex: 8, coordinates: [[0,0],[0,2],[1,0],[1,2],[2,-1],[2,2],[3,-1],[3,2],[4,0],[4,2],[5,0],[5,2]] },
  // prettier-ignore
  { CAGED_NAME: "B", baseFretIndex: 7, coordinates: [[0,0],[0,3],[1,1],[1,3],[2,0],[2,2],[3,0],[3,2],[4,0],[4,3],[5,0],[5,3]] },
  // prettier-ignore
  { CAGED_NAME: "A", baseFretIndex: 5, coordinates: [[0,0],[0,3],[1,0],[1,3],[2,0],[2,2],[3,0],[3,2],[4,0],[4,2],[5,0],[5,3]] },
  // prettier-ignore
  { CAGED_NAME: "G", baseFretIndex: 3, coordinates: [[0,0],[0,2],[1,0],[1,2],[2,-1],[2,1],[3,-1],[3,2],[4,-1],[4,2],[5,0],[5,2]] },
  // prettier-ignore
  { CAGED_NAME: "F", baseFretIndex: 1, coordinates: [[0,0],[0,2],[1,0],[1,2],[2,-1],[2,1],[3,-1],[3,2],[4,-1],[4,2],[5,0],[5,2]] },
  // prettier-ignore
  { CAGED_NAME: "E", baseFretIndex: 0, coordinates: [[0,0],[0,3],[1,0],[1,3],[2,0],[2,2],[3,0],[3,2],[4,0],[4,2],[5,0],[5,3]] },
  // prettier-ignore
  { CAGED_NAME: "D", baseFretIndex: 10, coordinates: [[0,0],[0,3],[1,0],[1,3],[2,0],[2,2],[3,0],[3,2],[4,0],[4,2],[5,0],[5,3]] },
];
