import type { SharpNoteName } from "@/data";
import {
  type ShapePlayerBrick,
  useShapePlayerStore,
  useMusicStore,
} from "@/store";

export const useShapePlayerBrickUpdates = (
  guitarShapePlayerBrick?: ShapePlayerBrick,
) => {
  const updateBrick = useShapePlayerStore((state) => state.updateBrick);
  const replaceTargetSharpNoteNames = useMusicStore(
    (state) => state.replaceTargetSharpNoteNames,
  );

  const setSliderRange = (newRange: [number, number]) => {
    if (guitarShapePlayerBrick?.id) {
      updateBrick(guitarShapePlayerBrick.id, { sliderRange: newRange });
    }
  };

  const toggleTargetNote = (sharpNoteName: SharpNoteName) => {
    if (!guitarShapePlayerBrick?.id) return;

    const currentNotes = guitarShapePlayerBrick.targetSharpNoteNames ?? [];
    const isAlreadySelected = currentNotes.includes(sharpNoteName);
    const nextNotes = isAlreadySelected
      ? currentNotes.filter((n) => n !== sharpNoteName)
      : [...currentNotes, sharpNoteName];

    updateBrick(guitarShapePlayerBrick.id, { targetSharpNoteNames: nextNotes });
    replaceTargetSharpNoteNames(nextNotes);
  };

  return {
    setSliderRange,
    toggleTargetNote,
    targetSharpNoteNames: guitarShapePlayerBrick?.targetSharpNoteNames ?? [],
  };
};
