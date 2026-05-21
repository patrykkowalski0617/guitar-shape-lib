import { useMemo } from "react";
import type {
  FretboardCoordinate,
  CAGED_System,
  ShapeVariantDataKeys,
  BaseChordShape,
} from "@/data";
import {
  findMatchingCAGEDSystem,
  findMatchingBaseChord,
  getShapeCoordinates,
} from "../helpers";

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

interface UseShapeCoordinatesParams {
  selectedShapesVariantDataKeys: ShapeVariantDataKeys[] | null;
  getBaseChordsShapes: () => BaseChordShape[];
  getCAGED_System: () => CAGED_System[];
}

export const useShapeCoordinates = ({
  selectedShapesVariantDataKeys,
  getBaseChordsShapes,
  getCAGED_System,
}: UseShapeCoordinatesParams) => {
  return useMemo(() => {
    const guitarShapeCoordinates: FretboardCoordinate[] = [];
    const baseChordCoordinates: FretboardCoordinate[] = [];
    const bestMatchCAGED_Systems: CAGED_System[] = [];
    let allCAGED_System: CAGED_System[] = [];

    selectedShapesVariantDataKeys?.forEach((variantKey) => {
      const shapeCoords = getShapeCoordinates(variantKey);
      const chordsShapes = getBaseChordsShapes();
      const cagedSystem = getCAGED_System();

      const baseChordMatch = findMatchingBaseChord({
        BaseChordsShapes: chordsShapes,
        guitarShapeCoordinates: shapeCoords,
      });

      const baseCoords = baseChordMatch?.coordinates ?? [];
      const bestMatch = findMatchingCAGEDSystem(cagedSystem, baseCoords);

      if (
        bestMatch &&
        !bestMatchCAGED_Systems.find(
          (s) =>
            s.CAGED_NAME === bestMatch.CAGED_NAME &&
            s.baseFretIndex === bestMatch.baseFretIndex,
        )
      ) {
        bestMatchCAGED_Systems.push(bestMatch);
      }

      allCAGED_System = cagedSystem;
      addUniqueCoordinates(guitarShapeCoordinates, shapeCoords);
      addUniqueCoordinates(baseChordCoordinates, baseCoords);
    });

    return {
      guitarShapeCoordinates,
      baseChordCoordinates,
      allCAGED_System,
      bestMatchCAGED_Systems,
    };
  }, [selectedShapesVariantDataKeys, getBaseChordsShapes, getCAGED_System]);
};
