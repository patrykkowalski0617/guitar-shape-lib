import { type MusicFunctionId } from "@/utils";
import { getHighlightRole, type HighlightRole } from "./scaleLogic";

export interface ScaleDegreeInfo {
  index: number;
  role: HighlightRole;
}

interface GetScaleIndicesArgs {
  firstAIndex: number;
  templateOffset: number;
  isMajorMode: boolean;
  steps: number[];
  currentMusicFunctionId: MusicFunctionId | null;
}

export const getScaleIndices = ({
  firstAIndex,
  templateOffset,
  isMajorMode,
  steps,
  currentMusicFunctionId,
  isExpanded,
}: GetScaleIndicesArgs & { isExpanded: boolean }): ScaleDegreeInfo[] => {
  return steps
    .map((step, index) => {
      const isVisible = isMajorMode ? index >= 2 : index <= steps.length - 3;
      if (!isVisible) return null;

      let finalIndex = firstAIndex + templateOffset + step;

      const isHarmonicMinor = !isMajorMode && index % 7 === 6;
      if (isHarmonicMinor) {
        finalIndex += 1;
      }

      return {
        index: finalIndex,
        role: getHighlightRole(index, isMajorMode, currentMusicFunctionId, isExpanded),
      };
    })
    .filter((item): item is ScaleDegreeInfo => item !== null);
};
