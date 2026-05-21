import type { BaseChordShape, FretboardCoordinate } from "@/data";

export interface MatcherParams {
  CAGED_ChordsShapes: BaseChordShape[];
  guitarShapeCoordinates: FretboardCoordinate[];
}

type FretRange = { min: number; max: number };

const getFretRange = (coords: FretboardCoordinate[]): FretRange | null => {
  if (coords.length === 0) return null;
  let min = Infinity,
    max = -Infinity;
  for (const [, fretIdx] of coords) {
    if (fretIdx < min) min = fretIdx;
    if (fretIdx > max) max = fretIdx;
  }
  return { min, max };
};

const fretOverlapScore = (a: FretRange, b: FretRange): number => {
  const overlap = Math.max(0, Math.min(a.max, b.max) - Math.max(a.min, b.min));
  const span = Math.max(1, Math.max(a.max - a.min, b.max - b.min));
  return overlap / span;
};

export const findMatchingBaseChord = ({
  CAGED_ChordsShapes,
  guitarShapeCoordinates,
}: MatcherParams): BaseChordShape | null => {
  const targetRange = getFretRange(guitarShapeCoordinates);
  if (!targetRange) return null;

  let bestMatch: BaseChordShape | null = null;
  let highestScore = -1;

  for (const candidate of CAGED_ChordsShapes) {
    const candidateRange = getFretRange(candidate.coordinates);
    if (!candidateRange) continue;

    const score = fretOverlapScore(targetRange, candidateRange);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = candidate;
    }
  }

  return bestMatch;
};
