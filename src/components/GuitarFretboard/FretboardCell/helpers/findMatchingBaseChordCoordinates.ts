import type { BaseChordShape, FretboardCoordinate } from "@/data";

export interface MatcherParams {
  baseChordCoordinates: BaseChordShape[];
  shapeCoordinates: FretboardCoordinate[];
}

export const findMatchingBaseChordCoordinates = ({
  baseChordCoordinates,
  shapeCoordinates,
}: MatcherParams): BaseChordShape | null => {
  const targetPointKeys = new Set(
    shapeCoordinates.map(([stringIdx, fretIdx]) => `${stringIdx}-${fretIdx}`),
  );

  let bestMatch: BaseChordShape | null = null;
  let highestAccuracy = -1;
  let maxCommonPoints = -1;

  baseChordCoordinates.forEach((candidate) => {
    const totalCandidatePoints = candidate.coordinates.length;
    if (totalCandidatePoints === 0) return;

    const commonPointsCount = candidate.coordinates.reduce(
      (acc, [stringIdx, fretIdx]) => {
        const pointKey = `${stringIdx}-${fretIdx}`;
        return targetPointKeys.has(pointKey) ? acc + 1 : acc;
      },
      0,
    );

    const currentAccuracy = commonPointsCount / totalCandidatePoints;

    const isClearlyBetter = currentAccuracy > highestAccuracy;

    const isEquallyAccurateButMorePoints =
      currentAccuracy === highestAccuracy &&
      commonPointsCount > maxCommonPoints;

    if (isClearlyBetter || isEquallyAccurateButMorePoints) {
      highestAccuracy = currentAccuracy;
      maxCommonPoints = commonPointsCount;
      bestMatch = candidate;
    }
  });

  return bestMatch;
};
