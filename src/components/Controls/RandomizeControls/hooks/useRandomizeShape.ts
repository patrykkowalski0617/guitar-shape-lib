import { useControlsStore } from "@/store/useControlsStore";
import { getFilteredShapeOptions } from "@/components/Controls/ShapeSelect/helpers/shapeHelpers";
import type { RoleId } from "@/data";

export const useRandomizeShape = () => {
  const setShape = useControlsStore((state) => state.setShape);

  const setRandomShape = (randomRole: RoleId, randomIsMajorMode: boolean) => {
    const shapeOptions = getFilteredShapeOptions(randomRole, randomIsMajorMode);

    const randomShape = shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
    const shapeId = String(randomShape.shapeId);
    const offset = randomShape.offset;

    setShape(shapeId, offset);

    return { shapeId, offset };
  };

  return setRandomShape;
};
