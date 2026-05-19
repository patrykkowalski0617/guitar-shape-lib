import { useEffect, useMemo } from "react";
import { useDataKeyStore, useMetronomeStore, useMusicStore } from "@/store";
import { useCAGED_ChordsShapes } from "./useCAGED_ChordsShapes";
import type { FretboardCoordinate } from "@/data";
import { findMatchingBaseChord } from "../helpers/findMatchingBaseChord";
import { getNoteIdFromFretboardCoordintes } from "../helpers/getNoteIdFromFretboardCoordintes";
import { getShapeCoordinates } from "../helpers/getShapeCoordinates";

export const useMultiShapeCoordinates = () => {
  const isPlaying = useMetronomeStore((state) => state.isPlaying);

  const currentSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.selectedShapesVariantDataKeys,
  );
  const nextSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.nextSelectedShapesVariantDataKeys,
  );
  const nextBaseChordDataKey = useDataKeyStore(
    (state) => state.nextBaseChordDataKey,
  );
  const nextUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.nextUnifiedMusicKeysDataKey,
  );

  const currentBaseChordDataKey = useDataKeyStore(
    (state) => state.baseChordDataKey,
  );
  const currentUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const currentSelectedShapesVariantDataKeysForSound = useDataKeyStore(
    (state) => state.selectedShapesVariantDataKeys,
  );

  const setBaseChordBassNoteId = useMusicStore(
    (state) => state.setBaseChordBassNoteId,
  );

  const selectedShapesVariantDataKeysForVisual = isPlaying
    ? nextSelectedShapesVariantDataKeys
    : currentSelectedShapesVariantDataKeys;

  const getCAGED_ChordsShapesForVisual = useCAGED_ChordsShapes(
    isPlaying
      ? {
          baseChordDataKey: nextBaseChordDataKey,
          unifiedMusicKeysDataKey: nextUnifiedMusicKeysDataKey,
        }
      : undefined,
  );

  const getCAGED_ChordsShapesForSound = useCAGED_ChordsShapes({
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

  const { guitarShapeCoordinates, baseChordCoordinates } = useMemo(() => {
    const multiShapeCoordinates: FretboardCoordinate[] = [];
    const multiBaseChordCoordinates: FretboardCoordinate[] = [];

    selectedShapesVariantDataKeysForVisual?.forEach((variantKey) => {
      const guitarShapeCoordinates = getShapeCoordinates(variantKey);
      const CAGED_ChordsShapes = getCAGED_ChordsShapesForVisual();

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
  }, [selectedShapesVariantDataKeysForVisual, getCAGED_ChordsShapesForVisual]);

  const bassNoteId = useMemo(() => {
    let resultBassNoteId: string | null = null;

    currentSelectedShapesVariantDataKeysForSound?.forEach((variantKey, i) => {
      if (i !== 0) return;

      const guitarShapeCoordinates = getShapeCoordinates(variantKey);
      const CAGED_ChordsShapes = getCAGED_ChordsShapesForSound();

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
    currentSelectedShapesVariantDataKeysForSound,
    getCAGED_ChordsShapesForSound,
  ]);

  useEffect(() => {
    if (bassNoteId) {
      setBaseChordBassNoteId(bassNoteId);
    }
  }, [bassNoteId, setBaseChordBassNoteId]);

  return { guitarShapeCoordinates, baseChordCoordinates };
};
