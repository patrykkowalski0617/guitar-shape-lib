import { useEffect, useMemo } from "react";
import { useDataKeyStore, useMetronomeStore, useMusicStore } from "@/store";
import type { FretboardCoordinate } from "@/data";
import { findMatchingBaseChord } from "../helpers/findMatchingBaseChord";
import { getNoteIdFromFretboardCoordintes } from "../helpers/getNoteIdFromFretboardCoordintes";
import { getShapeCoordinates } from "../helpers/getShapeCoordinates";
import { useBaseChordsShapes } from "./useCAGED_ChordsShapes";

export const useMultiShapeCoordinates = () => {
  const isPlaying = useMetronomeStore((state) => state.isPlaying);

  const currentSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.selectedShapesVariantDataKeys,
  );
  const currentBaseChordDataKey = useDataKeyStore(
    (state) => state.baseChordDataKey,
  );
  const currentUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const nextSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.nextSelectedShapesVariantDataKeys,
  );

  const setBaseChordBassNoteId = useMusicStore(
    (state) => state.setBaseChordBassNoteId,
  );

  const getBaseChordsShapesForVisualAndSound = useBaseChordsShapes({
    baseChordDataKey: currentBaseChordDataKey,
    unifiedMusicKeysDataKey: currentUnifiedMusicKeysDataKey,
  });

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

  const { guitarShapeCoordinates, baseChordCoordinates } = useMemo(() => {
    const multiShapeCoordinates: FretboardCoordinate[] = [];
    const multiBaseChordCoordinates: FretboardCoordinate[] = [];

    currentSelectedShapesVariantDataKeys?.forEach((variantKey) => {
      const guitarShapeCoordinates = getShapeCoordinates(variantKey);
      const BaseChordsShapes = getBaseChordsShapesForVisualAndSound();

      const baseChordMatch = findMatchingBaseChord({
        BaseChordsShapes,
        guitarShapeCoordinates,
      });

      const baseChordCoordinates = baseChordMatch
        ? baseChordMatch.coordinates
        : [];

      addUniqueCoordinates(multiShapeCoordinates, guitarShapeCoordinates);
      addUniqueCoordinates(multiBaseChordCoordinates, baseChordCoordinates);
    });

    return {
      guitarShapeCoordinates: multiShapeCoordinates,
      baseChordCoordinates: multiBaseChordCoordinates,
    };
  }, [
    currentSelectedShapesVariantDataKeys,
    getBaseChordsShapesForVisualAndSound,
  ]);

  const nextTargetShapeCoordinates = useMemo(() => {
    if (!isPlaying) return [];

    const coords: FretboardCoordinate[] = [];

    nextSelectedShapesVariantDataKeys?.forEach((variantKey) => {
      const guitarShapeCoordinates = getShapeCoordinates(variantKey);
      addUniqueCoordinates(coords, guitarShapeCoordinates);
    });

    return coords;
  }, [nextSelectedShapesVariantDataKeys, isPlaying]);

  const bassNoteId = useMemo(() => {
    let resultBassNoteId: string | null = null;

    currentSelectedShapesVariantDataKeys?.forEach((variantKey, i) => {
      if (i !== 0) return;

      const guitarShapeCoordinates = getShapeCoordinates(variantKey);
      const BaseChordsShapes = getBaseChordsShapesForVisualAndSound();

      const baseChordMatch = findMatchingBaseChord({
        BaseChordsShapes,
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
    getBaseChordsShapesForVisualAndSound,
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
