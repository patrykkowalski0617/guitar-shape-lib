import { calculateMatrixData } from "@/components/NoteMatrix/utils";
import type { SharpNoteName } from "@/data";
import type {
  UnifiedMusicKeysDataKey,
  BaseChordDataKey,
  GuitarShapeDataKey,
} from "@/components/NoteMatrix/types";

export const resolveTargetSharpNoteNames = (
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey,
  baseChordDataKey: BaseChordDataKey,
  guitarShapeDataKey: GuitarShapeDataKey,
  semitoneOffsetFromMajorRoot: number,
  targetNoteIndices: number[],
): SharpNoteName[] => {
  const data = calculateMatrixData(
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    guitarShapeDataKey,
    semitoneOffsetFromMajorRoot,
  );

  return data.chordNoteIndices
    .filter((_, position) => targetNoteIndices.includes(position))
    .map((i) => data.sharpNoteNames[i])
    .filter((n): n is SharpNoteName => n !== null);
};
