import { useControlsStore } from "@/store";
import {
  getFilteredShapeOptions,
  type ShapeOption,
} from "@/components/Controls/ShapeSelect/helpers/getFilteredShapeOptions";
import type { RoleId } from "@/data";

export const useRandomizeShape = () => {
  const setShape = useControlsStore((state) => state.setShape);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);

  const setRandomShape = (randomRole: RoleId, randomIsMajorMode: boolean) => {
    const shapeOptions: ShapeOption[] = getFilteredShapeOptions(randomRole, randomIsMajorMode, currentKeyId);

    if (shapeOptions.length === 0) {
      console.warn(`[RANDOMIZE] No options found for role: ${randomRole}`);
      return { shapeId: null, offset: null };
    }

    const randomOption = shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
    const shapeId = String(randomOption.shapeId);
    const offset = randomOption.offset;

    setShape(shapeId, offset);

    return { shapeId, offset };
  };

  return setRandomShape;
};
