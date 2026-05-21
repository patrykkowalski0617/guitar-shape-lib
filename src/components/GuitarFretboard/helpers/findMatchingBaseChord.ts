import type { BaseChordShape, FretboardCoordinate } from "@/data";
import { findMatchingShape } from "./findMatchingShape";

export interface MatcherParams {
  CAGED_ChordsShapes: BaseChordShape[];
  guitarShapeCoordinates: FretboardCoordinate[];
}

export const findMatchingBaseChord = ({
  CAGED_ChordsShapes,
  guitarShapeCoordinates,
}: MatcherParams): BaseChordShape | null =>
  findMatchingShape(
    CAGED_ChordsShapes,
    (s) => s.coordinates,
    guitarShapeCoordinates,
  );
