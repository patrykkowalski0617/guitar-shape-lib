import {
  GUITAR_SHAPES,
  type FretboardCoordinate,
  type ShapeVariantDataKeys,
} from "@/data";

export const useShapeCoordinates = () => {
  const getShapeCoordinates = (
    guitarShapeVariantDataKeys: ShapeVariantDataKeys | null,
  ): FretboardCoordinate[] => {
    if (!guitarShapeVariantDataKeys) return [];

    const { guitarShapeDataKey, stringId, fretIndex, variantDataKey } =
      guitarShapeVariantDataKeys || {};
    const guitarShapeData = guitarShapeDataKey
      ? GUITAR_SHAPES[guitarShapeDataKey]
      : null;

    if (!guitarShapeData || guitarShapeVariantDataKeys === null) return [];

    const { guitarShapeVariants } = guitarShapeData;
    if (!stringId || fretIndex === undefined || !variantDataKey) return [];

    const variantCoordinates =
      guitarShapeVariants?.[stringId as keyof typeof guitarShapeVariants]?.[
        variantDataKey as keyof (typeof guitarShapeVariants)[keyof typeof guitarShapeVariants]
      ];

    const guitarShapeCoordinates =
      variantCoordinates?.coordinates?.map(
        ([s, f]) => [s, f + fretIndex] as FretboardCoordinate,
      ) || [];

    return guitarShapeCoordinates;
  };

  return getShapeCoordinates;
};
