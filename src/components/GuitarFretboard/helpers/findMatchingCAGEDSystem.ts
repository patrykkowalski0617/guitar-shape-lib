import type { CAGED_System, FretboardCoordinate } from "@/data";
import { getShapeFretRange } from "./getShapeFretRange";

export const findMatchingCAGEDSystem = (
  CAGED_System: CAGED_System[],
  baseChordCoordinates: FretboardCoordinate[],
): CAGED_System | null => {
  if (CAGED_System.length === 0) return null;

  const { min } = getShapeFretRange(baseChordCoordinates);

  let bestMatch: CAGED_System | null = null;
  let bestDist = Infinity;

  for (const candidate of CAGED_System) {
    const dist = candidate.baseFretIndex - min;

    if (dist >= 0 && dist < bestDist) {
      bestDist = dist;
      bestMatch = candidate;
    }
  }

  return bestMatch;
};
