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
  if (!baseChordCoordinates.length) return null;
  console.log(baseChordCoordinates);

  const targetPoints = new Set(
    shapeCoordinates.map(([stringIdx, fretIdx]) => `${stringIdx}-${fretIdx}`),
  );

  let bestMatch: Shape | null = null;
  let maxCommonPoints = -1;

  baseChordCoordinates.forEach((candidate) => {
    const commonPointsCount = candidate.coordinates.reduce(
      (acc, [sIdx, fIdx]) => {
        const pointKey = `${sIdx}-${fIdx}`;
        const isPointCommon = targetPoints.has(pointKey);

        return isPointCommon ? acc + 1 : acc;
      },
      0,
    );

    const isBetterMatch = commonPointsCount > maxCommonPoints;

    if (isBetterMatch) {
      maxCommonPoints = commonPointsCount;
      bestMatch = candidate;
    }
  });

  return bestMatch;
};
