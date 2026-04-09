interface Shape {
  CAGEDassigment: string;
  baseFretIndex: number;
  coordinates: [number, number][];
}

interface MatcherParams {
  baseChordCoordinates: Shape[];
  shapeCoordinates: number[][];
}

export const findMatchingBaseChordCoordinates = ({
  baseChordCoordinates,
  shapeCoordinates,
}: MatcherParams): Shape | null => {
  if (baseChordCoordinates.length === 0) return null;

  const targetPointKeys = new Set(
    shapeCoordinates.map(([stringIdx, fretIdx]) => `${stringIdx}-${fretIdx}`),
  );

  let bestMatch: Shape | null = null;
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
