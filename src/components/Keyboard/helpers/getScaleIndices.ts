import { MINOR_MAJOR_TEMPLATE_STEPS } from "@/utils";

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
  return MINOR_MAJOR_TEMPLATE_STEPS.map((step, index) => {
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
