import { useDataKeyStore } from "@/store";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { useCAGED_ChordsShapes } from "./useCAGED_ChordsShapes";
import { findMatchingBaseChordCoordinates } from "../helpers/findMatchingBaseChordCoordinates";
import type { FretboardCoordinate } from "@/data";

export const useMultiShapeCoordinates = () => {
  const selectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.selectedShapesVariantDataKeys,
  );

  const getCAGED_ChordsShapes = useCAGED_ChordsShapes();
  const getShapeCoordinates = useShapeCoordinates();

  const multiShapeCoordinates: FretboardCoordinate[] = [];
  const multiBaseChordCoordinates: FretboardCoordinate[] = [];

  const addUnique = (
    target: FretboardCoordinate[],
    source: FretboardCoordinate[],
  ) => {
    // Tworzymy zbiór istniejących już kluczy dla szybkiego lookupu O(1)
    const existingKeys = new Set(target.map(([s, f]) => `${s}-${f}`));

    source.forEach(([s, f]) => {
      const key = `${s}-${f}`;
      if (!existingKeys.has(key)) {
        target.push([s, f]);
        existingKeys.add(key); // Dodajemy do seta, by kolejne elementy z source nie dublowały się
      }
    });
  };

  selectedShapesVariantDataKeys?.forEach((variantKey) => {
    // 1. Logika dla pojedynczej iteracji (identyczna z poprzednim elementem [0])
    const shapeCoordinates = getShapeCoordinates(variantKey);
    const CAGED_ChordsShapes = getCAGED_ChordsShapes();

    const baseChordMatch = findMatchingBaseChordCoordinates({
      CAGED_ChordsShapes,
      shapeCoordinates,
    });

    const baseChordCoordinates = baseChordMatch
      ? baseChordMatch.coordinates
      : [];

    // 2. Akumulacja wyników bez duplikatów
    addUnique(multiShapeCoordinates, shapeCoordinates);
    addUnique(multiBaseChordCoordinates, baseChordCoordinates);
  });

  return {
    shapeCoordinates: multiShapeCoordinates,
    baseChordCoordinates: multiBaseChordCoordinates,
  };
};
