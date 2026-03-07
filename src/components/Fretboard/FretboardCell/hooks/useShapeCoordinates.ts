import { shapes } from "@/data";
import type { ShapeVariantLocationData } from "@/store";

export const useShapeCoordinates = (
  shapeVariantLocationData: ShapeVariantLocationData | null,
) => {
  const { shapeId, stringId, fretIndex, variantId } =
    shapeVariantLocationData || {};
  const shapeData = shapeId ? shapes[shapeId] : null;

  if (!shapeData || shapeVariantLocationData === null) return [];

  const { fretboardCoordinatesVariants } = shapeData;
  if (!stringId || fretIndex === undefined || !variantId) return [];

  const variantCoordinates =
    fretboardCoordinatesVariants?.[
      stringId as keyof typeof fretboardCoordinatesVariants
    ]?.[
      variantId as keyof (typeof fretboardCoordinatesVariants)[keyof typeof fretboardCoordinatesVariants]
    ];

  const shapeCoordinates =
    variantCoordinates?.map(([s, f]) => [s, f + fretIndex]) || [];

  return shapeCoordinates;
};
