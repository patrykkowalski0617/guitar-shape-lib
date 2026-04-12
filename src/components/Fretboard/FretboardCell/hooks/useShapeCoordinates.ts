import { shapes, type FretboardCoordinate } from "@/data";
import type { ShapeVariantLocationData } from "@/store";

export const useShapeCoordinates = (
  shapeVariantLocationData: ShapeVariantLocationData | null,
): FretboardCoordinate[] => {
  const { shapeId, stringId, fretIndex, variantId } =
    shapeVariantLocationData || {};
  const shapeData = shapeId ? shapes[shapeId] : null;

  if (!shapeData || shapeVariantLocationData === null) return [];

  const { shapeVariants } = shapeData;
  if (!stringId || fretIndex === undefined || !variantId) return [];

  const variantCoordinates =
    shapeVariants?.[stringId as keyof typeof shapeVariants]?.[
      variantId as keyof (typeof shapeVariants)[keyof typeof shapeVariants]
    ];

  const shapeCoordinates =
    variantCoordinates.coordinates?.map(
      ([s, f]) => [s, f + fretIndex] as FretboardCoordinate,
    ) || [];

  return shapeCoordinates;
};
