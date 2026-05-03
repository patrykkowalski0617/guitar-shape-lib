import { useControlsStore } from "@/store";
import {
  getFilteredAndFormatedShapes,
  type ShapeOption,
} from "@/components/ShapeControls/ShapeSelect/helpers";

export const useRandomizeShape = () => {
  const setShape = useControlsStore((state) => state.setShape);
  const shapeOptions: ShapeOption[] = getFilteredAndFormatedShapes("tonic");

  const setRandomShape = () => {
    if (shapeOptions.length === 0) {
      return { shapeId: null, shapeSemitoneOffsetFromC: null };
    }

    const randomOption =
      shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
    const shapeId = String(randomOption.shapeId);
    const shapeSemitoneOffsetFromC = randomOption.shapeSemitoneOffsetFromC;

    setShape(shapeId, shapeSemitoneOffsetFromC);

    return { shapeId, shapeSemitoneOffsetFromC };
  };

  return { setRandomShape };
};
