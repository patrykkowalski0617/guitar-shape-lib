import {
  type ShapePlayerBrick,
  useShapePlayerStore,
  useMusicStore,
} from "@/store";
import { resolveTargetSharpNoteNames } from "@/utils/resolveTargetSharpNoteNames";

export const useShapePlayerTargetNotes = (
  guitarShapePlayerBrick?: ShapePlayerBrick,
) => {
  const updateBrick = useShapePlayerStore((state) => state.updateBrick);
  const replaceTargetSharpNoteNames = useMusicStore(
    (state) => state.replaceTargetSharpNoteNames,
  );

  const toggleTargetNote = (index: number) => {
    if (!guitarShapePlayerBrick?.id) return;

    const current = guitarShapePlayerBrick.targetNoteIndices ?? [1];
    const next = current.includes(index)
      ? current.filter((i) => i !== index)
      : [...current, index];

    updateBrick(guitarShapePlayerBrick.id, { targetNoteIndices: next });

    const sharpNoteNames = resolveTargetSharpNoteNames(
      guitarShapePlayerBrick.unifiedMusicKeysDataKey,
      guitarShapePlayerBrick.baseChordDataKey,
      guitarShapePlayerBrick.guitarShapeDataKey,
      guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
      next,
    );
    replaceTargetSharpNoteNames(sharpNoteNames);
  };

  return {
    targetNoteIndices: guitarShapePlayerBrick?.targetNoteIndices ?? [1],
    toggleTargetNote,
  };
};
