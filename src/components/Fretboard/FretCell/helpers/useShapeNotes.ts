import { useMemo } from "react";
import { shapes } from "@/data";
import type { ShapeVariantLocationData } from "@/store/useMusicStore";

export const isShapeNote = (coords: [number, number], notesInSapeCoordinates: number[][]): boolean => {
  const [stringIndex, fretIndex] = coords;
  return notesInSapeCoordinates.some(([shapeS, shapeF]) => shapeS === stringIndex && shapeF === fretIndex);
};

export const useShapeNotes = (currentShapeVariantLocationData: ShapeVariantLocationData | null) => {
  const notesInSapeCoordinates = useMemo(() => {
    const { shapeId, stringId, fretIndex, variantId } = currentShapeVariantLocationData || {};
    const shapeData = shapeId ? shapes[shapeId] : null;

    if (!shapeData || currentShapeVariantLocationData === null) return [];

    const { fretboardCoordinatesVariants } = shapeData;
    if (!stringId || fretIndex === undefined || !variantId) return [];

    const variantCoordinates =
      fretboardCoordinatesVariants?.[stringId as keyof typeof fretboardCoordinatesVariants]?.[
        variantId as keyof (typeof fretboardCoordinatesVariants)[keyof typeof fretboardCoordinatesVariants]
      ];

    return variantCoordinates?.map(([s, f]) => [s, f + fretIndex]) || [];
  }, [currentShapeVariantLocationData]);

  return notesInSapeCoordinates;
};
