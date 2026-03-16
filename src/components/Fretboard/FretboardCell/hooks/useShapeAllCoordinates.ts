import { shapes } from "@/data";
import { useControlsStore } from "@/store";
import { useShapeRootCoordinates } from "./useShapeRootCoordinates";

export const useShapeAllCoordinates = () => {
  const rootsCoordinates = useShapeRootCoordinates() || [];
  const shapeId = useControlsStore((state) => state.shapeId);

  const isMissingRequiredData = !shapeId || !rootsCoordinates.length;
  if (isMissingRequiredData) return [];

  const currentShapeVariants = shapes[shapeId].fretboardCoordinatesVariants;

  type ShapeStringKey = keyof typeof currentShapeVariants;

  const stringIndexToNameMap: Record<number, ShapeStringKey> = {
    3: "strD",
    4: "strA",
    5: "strE",
  };

  const rawCalculatedCoordinates = rootsCoordinates.flatMap(
    ([rootStringIndex, rootFretIndex]) => {
      const stringName = stringIndexToNameMap[rootStringIndex];
      const stringVariants = currentShapeVariants[stringName];

      if (!stringVariants) return [];

      const allVariantsCoordinates = Object.values(stringVariants).flat();

      const calculatedPoints = allVariantsCoordinates.map(
        ([targetStringIndex, fretOffset]) => {
          const absoluteFretIndex = fretOffset + rootFretIndex;
          return [targetStringIndex, absoluteFretIndex];
        },
      );

      return calculatedPoints;
    },
  );

  const uniqueCoordinates = Array.from(
    new Map(
      rawCalculatedCoordinates.map((point) => [point.join("-"), point]),
    ).values(),
  );

  return uniqueCoordinates;
};
