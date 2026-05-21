import { useEffect, useMemo } from "react";
import { useMusicStore } from "@/store";
import type { NoteId } from "@/utils";
import {
  findMatchingBaseChord,
  getShapeCoordinates,
  getNoteIdFromFretboardCoordintes,
} from "../helpers";
import type { BaseChordShape, ShapeVariantDataKeys } from "@/data";

interface UseBassNoteIdParams {
  selectedShapesVariantDataKeys: ShapeVariantDataKeys[] | null;
  getBaseChordsShapes: () => BaseChordShape[];
}

export const useBassNoteId = ({
  selectedShapesVariantDataKeys,
  getBaseChordsShapes,
}: UseBassNoteIdParams) => {
  const setBaseChordBassNoteId = useMusicStore(
    (state) => state.setBaseChordBassNoteId,
  );

  const bassNoteId = useMemo((): NoteId | null => {
    const firstKey = selectedShapesVariantDataKeys?.[0];
    if (!firstKey) return null;

    const shapeCoords = getShapeCoordinates(firstKey);
    const chordsShapes = getBaseChordsShapes();
    const baseChordMatch = findMatchingBaseChord({
      BaseChordsShapes: chordsShapes,
      guitarShapeCoordinates: shapeCoords,
    });

    const firstCoordinate = baseChordMatch?.coordinates[0];
    return firstCoordinate
      ? getNoteIdFromFretboardCoordintes(firstCoordinate)
      : null;
  }, [selectedShapesVariantDataKeys, getBaseChordsShapes]);

  useEffect(() => {
    if (bassNoteId) {
      setBaseChordBassNoteId(bassNoteId);
    }
  }, [bassNoteId, setBaseChordBassNoteId]);
};
