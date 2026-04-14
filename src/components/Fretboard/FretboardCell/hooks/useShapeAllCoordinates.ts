import { SHAPES } from "@/data";
import { useControlsStore } from "@/store";
import { useShapeRootCoordinates } from "./useShapeRootCoordinates";

export const useShapeAllCoordinates = () => {
  const rootsCoordinates = useShapeRootCoordinates() || [];
  const shapeId = useControlsStore((state) => state.shapeId);

  const isMissingRequiredData = !shapeId || !rootsCoordinates.length;
  if (isMissingRequiredData) return [];

  const currentShapeVariants = SHAPES[shapeId].shapeVariants;

  type ShapeStringKey = keyof typeof currentShapeVariants;

  const stringIndexToNameMap: Record<number, ShapeStringKey> = {
    3: "strD",
    4: "strA",
    5: "strE",
  };

  const rawCalculatedCoordinates = rootsCoordinates.flatMap((x) => {
    const [rootStringIndex, rootFretIndex] = x;
    const stringName = stringIndexToNameMap[rootStringIndex];
    const stringVariants = currentShapeVariants[stringName];

    if (!stringVariants) return [];

    const allVariantsCoordinates = Object.values(stringVariants).flatMap(
      (variant) => variant.coordinates,
    );

    const calculatedPoints = allVariantsCoordinates.map(
      ([targetStringIndex, fretOffset]) => {
        const absoluteFretIndex = fretOffset + rootFretIndex;
        return [targetStringIndex, absoluteFretIndex];
      },
    );

    return calculatedPoints;
  });

  const uniqueCoordinates = Array.from(
    new Map(
      rawCalculatedCoordinates.map((point) => [point.join("-"), point]),
    ).values(),
  );

  return uniqueCoordinates;
};
