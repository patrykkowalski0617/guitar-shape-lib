import { useMemo } from "react";
import { useMusicStore } from "@/store";
import {
  calculateMatrixData,
  getIsScaleNoteVisible,
  getIsShapeNoteVisible,
} from "../utils";
import type { NoteName } from "@/data";
import type { NoteMatrixProps, MatrixData, NoteColumnInfo } from "../types";

interface UseNoteMatrixReturn {
  data: MatrixData | null;
  selectedNotes: NoteName[];
  setSelectedNotes: (note: NoteName) => void;
  checkIsShared: (noteName: NoteName) => boolean;
  columns: NoteColumnInfo[];
}

export const useNoteMatrix = ({
  unifiedMusicKeysDataKey,
  baseChordDataKey,
  guitarShapeOffset,
  guitarShapeDataKey,
}: NoteMatrixProps): UseNoteMatrixReturn => {
  const selectedNotes = useMusicStore(
    (state) => state.selectedTargetNotesNames,
  );
  const setSelectedNotes = useMusicStore(
    (state) => state.setSelectedTargetNotesNames,
  );

  const isStateReady =
    !!guitarShapeDataKey &&
    !!unifiedMusicKeysDataKey &&
    !!baseChordDataKey &&
    guitarShapeOffset !== null;

  const data = useMemo<MatrixData | null>(
    () =>
      isStateReady
        ? calculateMatrixData(
            unifiedMusicKeysDataKey,
            baseChordDataKey,
            guitarShapeDataKey,
            guitarShapeOffset,
          )
        : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      unifiedMusicKeysDataKey,
      baseChordDataKey,
      guitarShapeDataKey,
      guitarShapeOffset,
    ],
  );

  const checkIsShared = (noteName: NoteName | ""): boolean => {
    if (!data || noteName === "") return false;

    return data.visibleColumnsIndices.some((i) => {
      if (data.displayNoteNames[i] !== noteName) return false;
      return (
        getIsScaleNoteVisible(i, data.allScaleIndices) &&
        getIsShapeNoteVisible(i, data.guitarShapeIndices)
      );
    });
  };

  const columns = useMemo<NoteColumnInfo[]>(() => {
    if (!data) return [];

    return data.visibleColumnsIndices.map((i) => {
      const isInScale = getIsScaleNoteVisible(i, data.allScaleIndices);
      const isInShape = getIsShapeNoteVisible(i, data.guitarShapeIndices);
      const noteName = isInScale ? data.displayNoteNames[i] : "";
      const isShared = isInScale && isInShape;
      const isSelected = noteName !== "" && selectedNotes.includes(noteName);

      return { index: i, noteName, isInScale, isInShape, isShared, isSelected };
    });
  }, [data, selectedNotes]);

  return { data, selectedNotes, setSelectedNotes, checkIsShared, columns };
};
