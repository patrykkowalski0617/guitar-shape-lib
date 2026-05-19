import {
  GUITAR_SHAPES,
  type FretboardCoordinate,
  type ShapeVariantDataKeys,
} from "@/data";

export const useShapeCoordinates = () => {
  const getShapeCoordinates = (
    shapeVariantDataKeys: ShapeVariantDataKeys | null,
  ): FretboardCoordinate[] => {
    if (!shapeVariantDataKeys) return [];

    const { shapeDataKey, stringId, fretIndex, variantDataKey } =
      shapeVariantDataKeys || {};
    const shapeData = shapeDataKey ? GUITAR_SHAPES[shapeDataKey] : null;

    if (!shapeData || shapeVariantDataKeys === null) return [];

    const { shapeVariants } = shapeData;
    if (!stringId || fretIndex === undefined || !variantDataKey) return [];

    const variantCoordinates =
      shapeVariants?.[stringId as keyof typeof shapeVariants]?.[
        variantDataKey as keyof (typeof shapeVariants)[keyof typeof shapeVariants]
      ];

    const shapeCoordinates =
      variantCoordinates?.coordinates?.map(
        ([s, f]) => [s, f + fretIndex] as FretboardCoordinate,
      ) || [];

    return shapeCoordinates;
  };

  return getShapeCoordinates;
};
