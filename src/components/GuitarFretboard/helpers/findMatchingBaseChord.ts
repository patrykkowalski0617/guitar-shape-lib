import type { BaseChordShape, FretboardCoordinate } from "@/data";
import type { MatcherParams } from "@/DevTools/DevGuitarFretboard/helpers/findMatchingBaseChord";

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

export const findMatchingBaseChord = ({
  CAGED_ChordsShapes,
  guitarShapeCoordinates,
}: MatcherParams): BaseChordShape | null => {
  const targetRange = getFretRange(guitarShapeCoordinates);
  if (!targetRange) return null;

  let bestMatch: BaseChordShape | null = null;
  let highestScore = -1;
  const candidates: { CAGED: string; range: FretRange; score: number }[] = [];

  for (const candidate of CAGED_ChordsShapes) {
    const candidateRange = getFretRange(candidate.coordinates);
    if (!candidateRange) continue;

    const score = fretOverlapScore(targetRange, candidateRange);
    candidates.push({
      CAGED: candidate.CAGEDassigment,
      range: candidateRange,
      score,
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = candidate;
    }
  }

  return bestMatch;
};
