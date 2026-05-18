import { SHAPES } from "@/data";
import { useControllersStore } from "@/store";
import { useShapeRootCoordinates } from "./useShapeRootCoordinates";

export const useShapeAllCoordinates = () => {
  const rootsCoordinates = useShapeRootCoordinates() || [];
  const shapeDataKey = useControllersStore((state) => state.shapeDataKey);

  const isMissingRequiredData = !shapeDataKey || !rootsCoordinates.length;
  if (isMissingRequiredData) return [];

  const currentShapeVariants = SHAPES[shapeDataKey].shapeVariants;

  type ShapeStringKey = keyof typeof currentShapeVariants;

  const stringIndexToNameMap: Record<number, ShapeStringKey> = {
    3: "strD",
    4: "strA",
    5: "strE",
  };

  const rawCalculatedCoordinates = rootsCoordinates.flatMap((x) => {
    const [rootStringIndexes, rootFretIndex] = x;
    const stringName = stringIndexToNameMap[rootStringIndexes];
    const stringVariants = currentShapeVariants[stringName];

    if (!stringVariants) return [];

    const allVariantsCoordinates = Object.values(stringVariants).flatMap(
      (variant) => variant.coordinates,
    );

    const calculatedPoints = allVariantsCoordinates.map(
      ([targetStringIndexes, fretOffset]) => {
        const absoluteFretIndex = fretOffset + rootFretIndex;
        return [targetStringIndexes, absoluteFretIndex];
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
