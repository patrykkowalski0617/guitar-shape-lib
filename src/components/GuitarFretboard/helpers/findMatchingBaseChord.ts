import type { BaseChordShape, FretboardCoordinate } from "@/data";

export interface MatcherParams {
  CAGED_ChordsShapes: BaseChordShape[];
  guitarShapeCoordinates: FretboardCoordinate[];
}

export const findMatchingBaseChord = ({
  CAGED_ChordsShapes,
  guitarShapeCoordinates,
}: MatcherParams): BaseChordShape | null => {
  const targetPointKeys = new Set(
    guitarShapeCoordinates.map(
      ([stringIdx, fretIdx]) => `${stringIdx}-${fretIdx}`,
    ),
  );

  let bestMatch: BaseChordShape | null = null;
  let highestAccuracy = -1;
  let maxCommonPoints = -1;

  CAGED_ChordsShapes.forEach((candidate) => {
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
