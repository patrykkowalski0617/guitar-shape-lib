import { useControlsStore } from "@/store";
import {
  getFilteredShapeOptions,
  type ShapeOption,
} from "@/components/Controls/ShapeSelect/helpers/getFilteredShapeOptions";
import type { RoleId } from "@/data";

export const useRandomizeShape = () => {
  const setShape = useControlsStore((state) => state.setShape);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);

  const setRandomShape = (randomRole: RoleId, randomIsMajorMode: boolean) => {
    const shapeOptions: ShapeOption[] = getFilteredShapeOptions(randomRole, randomIsMajorMode, tuneKeyId);

    if (shapeOptions.length === 0) {
      console.warn(`[RANDOMIZE] No options found for role: ${randomRole}`);
      return { shapeId: null, shapeSemitoneOffsetFromC: null };
    }

    const randomOption = shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
    const shapeId = String(randomOption.shapeId);
    const shapeSemitoneOffsetFromC = randomOption.shapeSemitoneOffsetFromC;

    setShape(shapeId, shapeSemitoneOffsetFromC);

    return { shapeId, shapeSemitoneOffsetFromC };
  };

  return setRandomShape;
};
