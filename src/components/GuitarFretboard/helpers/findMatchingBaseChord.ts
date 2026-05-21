import type { BaseChordShape, FretboardCoordinate } from "@/data";
import { findMatchingShape } from "./findMatchingShape";

export interface MatcherParams {
  BaseChordsShapes: BaseChordShape[];
  guitarShapeCoordinates: FretboardCoordinate[];
}

export const findMatchingBaseChord = ({
  BaseChordsShapes,
  guitarShapeCoordinates,
}: MatcherParams): BaseChordShape | null =>
  findMatchingShape(
    BaseChordsShapes,
    (s) => s.coordinates,
    guitarShapeCoordinates,
  );
