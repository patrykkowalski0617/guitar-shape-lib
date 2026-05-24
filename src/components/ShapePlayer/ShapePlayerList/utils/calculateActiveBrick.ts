import type { ShapePlayerBrick } from "@/store";
import type { ActiveBrickCalculation } from "../hooks/types";

export const calculateActiveBrick = (
  guitarShapePlayerBricks: ShapePlayerBrick[],
  currentStep: number,
  isCountingIn: boolean,
): ActiveBrickCalculation | null => {
  const shouldSkipCalculation =
    isCountingIn || guitarShapePlayerBricks.length === 0;
  if (shouldSkipCalculation) return null;

  let accumulatedSteps = 0;
  for (const guitarShapePlayerBrick of guitarShapePlayerBricks) {
    const startOfBrick = accumulatedSteps;
    const endOfBrick = accumulatedSteps + guitarShapePlayerBrick.playLength;
    const isStepInsideBrick =
      currentStep >= startOfBrick && currentStep < endOfBrick;

    if (isStepInsideBrick) {
      return {
        guitarShapePlayerBrick,
        isFirstBeatOfBrick: currentStep === startOfBrick,
        beatInsideBrick: currentStep - startOfBrick,
      };
    }
    accumulatedSteps = endOfBrick;
  }
  return null;
};
