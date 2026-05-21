export interface CAGED_System {
  CAGED_NAME: string;
  baseFretIndex: number;
}

export const CAGED_SYSTEM: CAGED_System[] = [
  { CAGED_NAME: "C", baseFretIndex: 8 },
  { CAGED_NAME: "B", baseFretIndex: 7 },
  { CAGED_NAME: "A", baseFretIndex: 5 },
  { CAGED_NAME: "G", baseFretIndex: 3 },
  { CAGED_NAME: "F", baseFretIndex: 1 },
  { CAGED_NAME: "E", baseFretIndex: 0 },
  { CAGED_NAME: "D", baseFretIndex: 10 },
];
