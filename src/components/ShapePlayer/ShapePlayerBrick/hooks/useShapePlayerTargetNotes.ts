import {
  type ShapePlayerBrick,
  useShapePlayerStore,
  useMusicStore,
} from "@/store";
import type { SharpNoteName } from "@/data";

export const useShapePlayerTargetNotes = (
  guitarShapePlayerBrick?: ShapePlayerBrick,
) => {
  const updateBrickTargetNotes = useShapePlayerStore(
    (state) => state.updateBrickTargetNotes,
  );
  const replaceTargetSharpNoteNames = useMusicStore(
    (state) => state.replaceTargetSharpNoteNames,
  );

  const toggleTargetNote = (sharpNoteName: SharpNoteName) => {
    if (!guitarShapePlayerBrick?.id) return;

    const currentNotes = guitarShapePlayerBrick.targetSharpNoteNames ?? [];
    const isAlreadySelected = currentNotes.includes(sharpNoteName);
    const nextNotes = isAlreadySelected
      ? currentNotes.filter((n) => n !== sharpNoteName)
      : [...currentNotes, sharpNoteName];

    updateBrickTargetNotes(guitarShapePlayerBrick.id, nextNotes);
    replaceTargetSharpNoteNames(nextNotes);
  };

  return {
    targetSharpNoteNames: guitarShapePlayerBrick?.targetSharpNoteNames ?? [],
    toggleTargetNote,
  };
};
