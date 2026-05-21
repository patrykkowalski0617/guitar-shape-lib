import type { CAGED_System, FretboardCoordinate } from "@/data";
import { findMatchingShape } from "./findMatchingShape";

export const findMatchingCAGEDSystem = (
  CAGED_System: CAGED_System[],
  guitarShapeCoordinates: FretboardCoordinate[],
): CAGED_System | null =>
  findMatchingShape(CAGED_System, (s) => s.coordinates, guitarShapeCoordinates);
