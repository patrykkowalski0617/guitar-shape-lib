import type { FretboardCoordinate } from "@/data";

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

const fretOverlapScore = (target: FretRange, candidate: FretRange): number => {
  const overlap = Math.max(
    0,
    Math.min(target.max, candidate.max) - Math.max(target.min, candidate.min),
  );
  const candidateSpan = Math.max(1, candidate.max - candidate.min);
  return overlap / candidateSpan;
};

export const findMatchingShape = <T>(
  candidates: T[],
  getCoords: (item: T) => FretboardCoordinate[],
  guitarShapeCoordinates: FretboardCoordinate[],
): T | null => {
  const targetRange = getFretRange(guitarShapeCoordinates);
  if (!targetRange) return null;

  let bestMatch: T | null = null;
  let highestScore = -1;

  for (const candidate of candidates) {
    const candidateRange = getFretRange(getCoords(candidate));
    if (!candidateRange) continue;

    const score = fretOverlapScore(targetRange, candidateRange);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = candidate;
    }
  }

  return bestMatch;
};
