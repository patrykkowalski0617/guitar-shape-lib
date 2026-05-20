import type { ShapePlayerBrick } from "@/store";

export interface ActiveBrickCalculation {
  guitarShapePlayerBrick: ShapePlayerBrick;
  isFirstBeatOfBrick: boolean;
  beatInsideBrick: number;
}
