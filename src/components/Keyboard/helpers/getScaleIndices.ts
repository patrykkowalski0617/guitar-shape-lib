interface GetScaleIndicesArgs {
  firstAIndex: number;
  templateOffset: number;
  isMajorMode: boolean;
  steps: number[];
}

export const getScaleIndices = ({
  firstAIndex,
  templateOffset,
  isMajorMode,
  steps,
}: GetScaleIndicesArgs): number[] => {
  return steps
    .map((step, index) => {
      const isVisible = isMajorMode ? index >= 2 : index <= steps.length - 3;
      if (!isVisible) return null;

      let finalIndex = firstAIndex + templateOffset + step;

      const isHarmonicMinor = !isMajorMode && index % 7 === 6;
      if (isHarmonicMinor) {
        finalIndex += 1;
      }

      return finalIndex;
    })
    .filter((index): index is number => index !== null);
};
