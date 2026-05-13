import { useDataKeyStore } from "@/store";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { useBaseChordShapes } from "./useBaseChordShapes";
import { findMatchingBaseChordCoordinates } from "../helpers/findMatchingBaseChordCoordinates";

export const useMultiShapeCoordinates = () => {
  const selectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.selectedShapesVariantDataKeys,
  );
  const firstVariantKey = selectedShapesVariantDataKeys?.[0] ?? null;
  const shapeCoordinates = useShapeCoordinates(firstVariantKey);

  const { baseChordCoordinates } = useBaseChordShapes();

  const baseChordMatch = findMatchingBaseChordCoordinates({
    baseChordCoordinates,
    shapeCoordinates,
  });

  return { shapeCoordinates, baseChordMatch };
};
