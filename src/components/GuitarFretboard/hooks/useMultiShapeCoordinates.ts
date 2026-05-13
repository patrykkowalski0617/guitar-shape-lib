import { useDataKeyStore } from "@/store";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { useCAGED_ChordsShapes } from "./useCAGED_ChordsShapes";
import { findMatchingBaseChordCoordinates } from "../helpers/findMatchingBaseChordCoordinates";

export const useMultiShapeCoordinates = () => {
  const selectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.selectedShapesVariantDataKeys,
  );
  const firstVariantKey = selectedShapesVariantDataKeys?.[0] ?? null;
  const shapeCoordinates = useShapeCoordinates(firstVariantKey);

  const { CAGED_ChordsShapes } = useCAGED_ChordsShapes();

  const baseChordMatch = findMatchingBaseChordCoordinates({
    CAGED_ChordsShapes,
    shapeCoordinates,
  });

  const baseChordCoordinates = baseChordMatch ? baseChordMatch.coordinates : [];

  return { shapeCoordinates, baseChordCoordinates };
};
