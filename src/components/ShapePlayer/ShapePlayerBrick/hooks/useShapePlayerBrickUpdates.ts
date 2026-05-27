import { type ShapePlayerBrick, useShapePlayerStore } from "@/store";

export const useShapePlayerBrickUpdates = (
  guitarShapePlayerBrick?: ShapePlayerBrick,
) => {
  const updateBrick = useShapePlayerStore((s) => s.updateBrick);

  const setSliderRange = (newRange: [number, number]) => {
    if (guitarShapePlayerBrick?.id) {
      updateBrick(guitarShapePlayerBrick.id, { sliderRange: newRange });
    }
  };

  return { setSliderRange };
};
