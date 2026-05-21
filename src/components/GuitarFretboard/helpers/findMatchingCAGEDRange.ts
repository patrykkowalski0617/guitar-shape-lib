import type { CAGEDRange, FretboardCoordinate } from "@/data";

export const findMatchingCAGEDRange = (
  CAGED_Ranges: CAGEDRange[],
  guitarShapeCoordinates: FretboardCoordinate[],
): CAGEDRange | null => {
  if (guitarShapeCoordinates.length === 0) return null;

  let min = Infinity,
    max = -Infinity;
  for (const [, fret] of guitarShapeCoordinates) {
    if (fret < min) min = fret;
    if (fret > max) max = fret;
  }
  const targetRange = { min, max };

  let bestMatch: CAGEDRange | null = null;
  let highestScore = -1;

  for (const candidate of CAGED_Ranges) {
    const candidateRange = {
      min: candidate.range[0][1],
      max: candidate.range[1][1],
    };

    const overlap = Math.max(
      0,
      Math.min(targetRange.max, candidateRange.max) -
        Math.max(targetRange.min, candidateRange.min),
    );
    const candidateSpan = Math.max(1, candidateRange.max - candidateRange.min);
    const score = overlap / candidateSpan;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = candidate;
    }
  }

  return bestMatch;
};
