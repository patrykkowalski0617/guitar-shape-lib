import { useEffect, useMemo } from "react";
import { useDataKeyStore, useMetronomeStore, useMusicStore } from "@/store";
import { useCAGED_ChordsShapes } from "./useCAGED_ChordsShapes";
import type { FretboardCoordinate, CAGED_System } from "@/data";
import { findMatchingBaseChord } from "../helpers/findMatchingBaseChord";
import { findMatchingCAGEDSystem } from "../helpers/findMatchingCAGEDSystem";
import { getNoteIdFromFretboardCoordintes } from "../helpers/getNoteIdFromFretboardCoordintes";
import { getShapeCoordinates } from "../helpers/getShapeCoordinates";
import { useCAGED_System } from "./useCAGED_System";
import type { NoteId } from "@/utils";

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

  const getCAGED_ChordsShapesForVisualAndSound = useCAGED_ChordsShapes({
    baseChordDataKey: currentBaseChordDataKey,
    unifiedMusicKeysDataKey: currentUnifiedMusicKeysDataKey,
  });

  const getCAGED_System = useCAGED_System({
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

  const {
    guitarShapeCoordinates,
    baseChordCoordinates,
    allCAGED_System,
    bestMatchCAGED_Systems,
  } = useMemo(() => {
    const multiShapeCoordinates: FretboardCoordinate[] = [];
    const multiBaseChordCoordinates: FretboardCoordinate[] = [];
    const multiBestMatchCAGED_Systems: CAGED_System[] = [];
    let allCAGED_System: CAGED_System[] = [];

    currentSelectedShapesVariantDataKeys?.forEach((variantKey) => {
      const guitarShapeCoordinates = getShapeCoordinates(variantKey);
      const CAGED_ChordsShapes = getCAGED_ChordsShapesForVisualAndSound();
      const CAGED_System = getCAGED_System();

      const baseChordMatch = findMatchingBaseChord({
        CAGED_ChordsShapes,
        guitarShapeCoordinates,
      });

      const baseChordCoordinates = baseChordMatch
        ? baseChordMatch.coordinates
        : [];

      const bestMatch = findMatchingCAGEDSystem(
        CAGED_System,
        baseChordCoordinates,
      );
      if (
        bestMatch &&
        !multiBestMatchCAGED_Systems.find(
          (s) =>
            s.CAGED_NAME === bestMatch.CAGED_NAME &&
            s.baseFretIndex === bestMatch.baseFretIndex,
        )
      ) {
        multiBestMatchCAGED_Systems.push(bestMatch);
      }

      allCAGED_System = CAGED_System;
      addUnique(multiShapeCoordinates, guitarShapeCoordinates);
      addUnique(multiBaseChordCoordinates, baseChordCoordinates);
    });

    return {
      guitarShapeCoordinates: multiShapeCoordinates,
      baseChordCoordinates: multiBaseChordCoordinates,
      allCAGED_System,
      bestMatchCAGED_Systems: multiBestMatchCAGED_Systems,
    };
  }, [
    currentSelectedShapesVariantDataKeys,
    getCAGED_ChordsShapesForVisualAndSound,
    getCAGED_System,
  ]);

  const nextTargetShapeCoordinates = useMemo(() => {
    if (!isPlaying) return [];
    const coords: FretboardCoordinate[] = [];
    nextSelectedShapesVariantDataKeys?.forEach((variantKey) => {
      const guitarShapeCoordinates = getShapeCoordinates(variantKey);
      addUnique(coords, guitarShapeCoordinates);
    });
    return coords;
  }, [nextSelectedShapesVariantDataKeys, isPlaying]);

  const bassNoteId = useMemo(() => {
    let resultBassNoteId: NoteId | null = null;
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
    allCAGED_System,
    bestMatchCAGED_Systems,
  };
};
