import { useMemo } from "react";
import { calculateMatrixData } from "../utils";
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
  targetNoteIndices,
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
    if (!data || sharpNoteName === null) return false;

    const isInChord = data.chordNoteIndices.some(
      (i) => data.sharpNoteNames[i] === sharpNoteName,
    );
    const isInShape = data.guitarShapeIndices.some(
      (i) => data.sharpNoteNames[i] === sharpNoteName,
    );
    return isInChord && isInShape;
  };

  const columns = useMemo<NoteColumnInfo[]>(() => {
    if (!data) return [];

    const guitarShapeSharpNoteNames = new Set(
      data.guitarShapeIndices.map((i) => data.sharpNoteNames[i]),
    );

    return data.visibleColumnsIndices.map((i) => {
      const sharpNoteName = data.sharpNoteNames[i] ?? null;
      const noteName = data.noteNames[i] ?? "";
      const isInChord = data.chordNoteIndices.includes(i);
      const isInShape = guitarShapeSharpNoteNames.has(sharpNoteName ?? "");
      const isShared = isInChord && isInShape;
      const positionInChord = data.chordNoteIndices.indexOf(i);
      const isTargetNote =
        isInChord && targetNoteIndices.includes(positionInChord);

      return {
        index: i,
        positionInChord,
        sharpNoteName,
        noteName,
        isInScale: isInChord,
        isInShape,
        isShared,
        isTargetNote,
      };
    });
  }, [data, targetNoteIndices]);

  return { data, checkIsShared, columns };
};
