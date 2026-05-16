import { useEffect, useMemo } from "react";
import { useDataKeyStore, useMusicStore } from "@/store";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { useCAGED_ChordsShapes } from "./useCAGED_ChordsShapes";
import type { FretboardCoordinate } from "@/data";
import { findMatchingBaseChord } from "../helpers/findMatchingBaseChord";
import { getNoteIdFromFretboardCoordintes } from "../helpers/getNoteIdFromFretboardCoordintes";

export const useMultiShapeCoordinates = () => {
  const selectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.selectedShapesVariantDataKeys,
  );
  const setBaseChordBassNoteId = useMusicStore(
    (state) => state.setBaseChordBassNoteId,
  );

  const getCAGED_ChordsShapes = useCAGED_ChordsShapes();
  const getShapeCoordinates = useShapeCoordinates();

  const addUnique = (
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

  const { shapeCoordinates, baseChordCoordinates, bassNoteId } = useMemo(() => {
    const multiShapeCoordinates: FretboardCoordinate[] = [];
    const multiBaseChordCoordinates: FretboardCoordinate[] = [];
    let bassNoteId: string | null = null;

    selectedShapesVariantDataKeys?.forEach((variantKey, i) => {
      const shapeCoordinates = getShapeCoordinates(variantKey);
      const CAGED_ChordsShapes = getCAGED_ChordsShapes();

      const baseChordMatch = findMatchingBaseChord({
        CAGED_ChordsShapes,
        shapeCoordinates,
      });

      if (!i) {
        const firstCoordinate = baseChordMatch?.coordinates[0];
        if (firstCoordinate) {
          bassNoteId = getNoteIdFromFretboardCoordintes(firstCoordinate);
        }
      }

      const baseChordCoordinates = baseChordMatch
        ? baseChordMatch.coordinates
        : [];

      addUnique(multiShapeCoordinates, shapeCoordinates);
      addUnique(multiBaseChordCoordinates, baseChordCoordinates);
    });

    return {
      shapeCoordinates: multiShapeCoordinates,
      baseChordCoordinates: multiBaseChordCoordinates,
      bassNoteId,
    };
  }, [
    selectedShapesVariantDataKeys,
    getShapeCoordinates,
    getCAGED_ChordsShapes,
  ]);

  useEffect(() => {
    setBaseChordBassNoteId(bassNoteId);
  }, [bassNoteId, setBaseChordBassNoteId]);

  return { shapeCoordinates, baseChordCoordinates };
};
