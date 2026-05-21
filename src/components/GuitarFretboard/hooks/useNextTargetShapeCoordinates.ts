import { useMemo } from "react";
import type { FretboardCoordinate, ShapeVariantDataKeys } from "@/data";
import { getShapeCoordinates } from "../helpers";

const addUniqueCoordinates = (
  target: FretboardCoordinate[],
  source: FretboardCoordinate[],
) => {
  const existingKeys = new Set(target.map(([s, f]) => `${s}-${f}`));
  source.forEach(([s, f]) => {
    const key = `${s}-${f}`;
    if (!existingKeys.has(key)) {
      target.push([s, f]);
      existingKeys.add(key);
    }
  });
};

export const useNextTargetShapeCoordinates = (
  nextSelectedShapesVariantDataKeys: ShapeVariantDataKeys[] | null,
  isPlaying: boolean,
): FretboardCoordinate[] => {
  return useMemo(() => {
    if (!isPlaying) return [];
    const coords: FretboardCoordinate[] = [];
    nextSelectedShapesVariantDataKeys?.forEach((variantKey) => {
      addUniqueCoordinates(coords, getShapeCoordinates(variantKey));
    });
    return coords;
  }, [nextSelectedShapesVariantDataKeys, isPlaying]);
};
