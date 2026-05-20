import { useMemo } from "react";
import {
  calculateMatrixData,
  getIsScaleNoteVisible,
  getIsShapeNoteVisible,
} from "../utils";
import type {
  NoteMatrixProps,
  MatrixData,
  NoteColumnInfo,
  UseNoteMatrixReturn,
} from "../types";
import type { SharpNoteName } from "@/data";

export const useNoteMatrix = ({
  unifiedMusicKeysDataKey,
  baseChordDataKey,
  guitarShapeOffset,
  guitarShapeDataKey,
  targetSharpNoteNames,
}: NoteMatrixProps): UseNoteMatrixReturn => {
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

  const checkIsShared = (sharpNoteName: SharpNoteName): boolean => {
    if (!data || sharpNoteName !== null) return false;

    return data.visibleColumnsIndices.some((i) => {
      if (data.sharpNoteNames[i] !== sharpNoteName) return false;
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
      const noteName = isInScale ? data.noteNames[i] : "";
      const sharpNoteName = isInScale ? data.sharpNoteNames[i] : null;
      const isShared = isInScale && isInShape;
      const isTargetNote =
        sharpNoteName !== null && targetSharpNoteNames.includes(sharpNoteName);

      return {
        index: i,
        sharpNoteName,
        noteName,
        isInScale,
        isInShape,
        isShared,
        isTargetNote,
      };
    });
  }, [data, targetSharpNoteNames]);

  return { data, checkIsShared, columns };
};
