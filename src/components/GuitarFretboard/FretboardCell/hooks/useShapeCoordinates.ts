import {
  SHAPES,
  type FretboardCoordinate,
  type ShapeVariantDataKeys,
} from "@/data";

export const useShapeCoordinates = (
  shapeVariantDataKeys: ShapeVariantDataKeys | null,
): FretboardCoordinate[] => {
  const { shapeDataKey, stringId, fretIndex, variantDataKey } =
    shapeVariantDataKeys || {};
  const shapeData = shapeDataKey ? SHAPES[shapeDataKey] : null;

  if (!shapeData || shapeVariantDataKeys === null) return [];

  const { shapeVariants } = shapeData;
  if (!stringId || fretIndex === undefined || !variantDataKey) return [];

  const variantCoordinates =
    shapeVariants?.[stringId as keyof typeof shapeVariants]?.[
      variantDataKey as keyof (typeof shapeVariants)[keyof typeof shapeVariants]
    ];

  const shapeCoordinates =
    variantCoordinates.coordinates?.map(
      ([s, f]) => [s, f + fretIndex] as FretboardCoordinate,
    ) || [];

  return shapeCoordinates;
};
