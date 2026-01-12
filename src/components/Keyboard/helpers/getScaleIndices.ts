const TEMPLATE_STEPS = [0, 2, 3, 5, 7, 8, 10, 12, 14];

interface GetScaleIndicesArgs {
  firstAIndex: number;
  templateOffset: number;
  isMajorMode: boolean;
}

export const getScaleIndices = ({
  firstAIndex,
  templateOffset,
  isMajorMode,
}: GetScaleIndicesArgs): number[] => {
  return TEMPLATE_STEPS.map((step, index) => {
    const isVisible = isMajorMode ? index >= 2 : index <= 6;
    if (!isVisible) return null;

    let finalIndex = firstAIndex + templateOffset + step;

    const isHarmonicMinor = !isMajorMode && index === 6;
    if (isHarmonicMinor) {
      finalIndex += 1;
    }

    return finalIndex;
  }).filter((index): index is number => index !== null);
};
