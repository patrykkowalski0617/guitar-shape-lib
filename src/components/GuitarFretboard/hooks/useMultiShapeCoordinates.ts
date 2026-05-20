import { useEffect, useMemo } from "react";
import { useDataKeyStore, useMetronomeStore, useMusicStore } from "@/store";
import { useCAGED_ChordsShapes } from "./useCAGED_ChordsShapes";
import type { FretboardCoordinate } from "@/data";
import { findMatchingBaseChord } from "../helpers/findMatchingBaseChord";
import { getNoteIdFromFretboardCoordintes } from "../helpers/getNoteIdFromFretboardCoordintes";
import { getShapeCoordinates } from "../helpers/getShapeCoordinates";

export const useMultiShapeCoordinates = () => {
  const isPlaying = useMetronomeStore((state) => state.isPlaying);

  // Current keys - dla visual i sound
  const currentSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.selectedShapesVariantDataKeys,
  );
  const currentBaseChordDataKey = useDataKeyStore(
    (state) => state.baseChordDataKey,
  );
  const currentUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  // Next keys - TYLKO dla target shape validation
  const nextSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.nextSelectedShapesVariantDataKeys,
  );

  const setBaseChordBassNoteId = useMusicStore(
    (state) => state.setBaseChordBassNoteId,
  );

  // Visual i sound - zawsze current
  const getCAGED_ChordsShapesForVisualAndSound = useCAGED_ChordsShapes({
    baseChordDataKey: currentBaseChordDataKey,
    unifiedMusicKeysDataKey: currentUnifiedMusicKeysDataKey,
  });

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

  // Visual shape - zawsze current
  const { guitarShapeCoordinates, baseChordCoordinates } = useMemo(() => {
    const multiShapeCoordinates: FretboardCoordinate[] = [];
    const multiBaseChordCoordinates: FretboardCoordinate[] = [];

    currentSelectedShapesVariantDataKeys?.forEach((variantKey) => {
      const guitarShapeCoordinates = getShapeCoordinates(variantKey);
      const CAGED_ChordsShapes = getCAGED_ChordsShapesForVisualAndSound();

      const baseChordMatch = findMatchingBaseChord({
        CAGED_ChordsShapes,
        guitarShapeCoordinates,
      });

      const baseChordCoordinates = baseChordMatch
        ? baseChordMatch.coordinates
        : [];

      addUnique(multiShapeCoordinates, guitarShapeCoordinates);
      addUnique(multiBaseChordCoordinates, baseChordCoordinates);
    });

    return {
      guitarShapeCoordinates: multiShapeCoordinates,
      baseChordCoordinates: multiBaseChordCoordinates,
    };
  }, [
    currentSelectedShapesVariantDataKeys,
    getCAGED_ChordsShapesForVisualAndSound,
  ]);

  // Target shape coordinates - z next* dla validation
  const nextTargetShapeCoordinates = useMemo(() => {
    if (!isPlaying) return [];

    const coords: FretboardCoordinate[] = [];

    nextSelectedShapesVariantDataKeys?.forEach((variantKey) => {
      const guitarShapeCoordinates = getShapeCoordinates(variantKey);
      addUnique(coords, guitarShapeCoordinates);
    });

    return coords;
  }, [nextSelectedShapesVariantDataKeys, isPlaying]);

  // Bass note - z current dla sound
  const bassNoteId = useMemo(() => {
    let resultBassNoteId: string | null = null;

    currentSelectedShapesVariantDataKeys?.forEach((variantKey, i) => {
      if (i !== 0) return;

      const guitarShapeCoordinates = getShapeCoordinates(variantKey);
      const CAGED_ChordsShapes = getCAGED_ChordsShapesForVisualAndSound();

      const baseChordMatch = findMatchingBaseChord({
        CAGED_ChordsShapes,
        guitarShapeCoordinates,
      });

      const firstCoordinate = baseChordMatch?.coordinates[0];
      if (firstCoordinate) {
        resultBassNoteId = getNoteIdFromFretboardCoordintes(firstCoordinate);
      }
    });

    return resultBassNoteId;
  }, [
    currentSelectedShapesVariantDataKeys,
    getCAGED_ChordsShapesForVisualAndSound,
  ]);

  useEffect(() => {
    if (bassNoteId) {
      setBaseChordBassNoteId(bassNoteId);
    }
  }, [bassNoteId, setBaseChordBassNoteId]);

  return {
    guitarShapeCoordinates,
    baseChordCoordinates,
    nextTargetShapeCoordinates,
  };
};
