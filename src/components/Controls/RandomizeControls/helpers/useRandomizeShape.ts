import { useControlsStore } from "@/store/useControlsStore";
import { getFilteredShapeOptions } from "../../ShapeSelect/helpers/shapeHelpers";
import type { RoleId } from "@/utils";

export const useRandomizeShape = () => {
  const setShape = useControlsStore((state) => state.setShape);

  const setRandomShape = (randomRole: RoleId, randomIsMajorMode: boolean) => {
    const shapeOptions = getFilteredShapeOptions(randomRole, randomIsMajorMode);

    const randomShape = shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
    const shapeId = randomShape.shapeId as string;
    const offset = randomShape.offset;

    setShape(shapeId, offset);

    return offset;
  };

  return setRandomShape;
};
