import type { RoleId } from "../roles";

const BASE_SCALE_PATTERN = [0, 2, 3, 5, 7, 8, 10];

export const generateScaleSteps = (count: number): number[] => {
  return Array.from({ length: count }, (_, i) => {
    const octave = Math.floor(i / 7);
    const degreeInOctave = i % 7;
    return BASE_SCALE_PATTERN[degreeInOctave] + octave * 12;
  });
};

export const getStepsCountForFunction = (functionId: RoleId | null): number => {
  switch (functionId) {
    case "tonic":
      return 15;
    case "subdominant":
      return 18;
    case "dominant":
      return 19;
    default:
      return 9;
  }
};
