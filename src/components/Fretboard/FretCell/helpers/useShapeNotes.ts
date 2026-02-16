import { useMemo } from "react";
import { shapes } from "@/data";

export const isShapeNote = (coords: [number, number], notesInSapeCoordinates: number[][]): boolean => {
  const [stringIndex, fretIndex] = coords;
  return notesInSapeCoordinates.some(([shapeS, shapeF]) => shapeS === stringIndex && shapeF === fretIndex);
};

export const useShapeNotes = (
  currentShapeVariantLocationData: {
    currentShapeId: string | null;
    stringId: string;
    fretIdx: number;
    variantId: string;
  } | null,
) => {
  const notesInSapeCoordinates = useMemo(() => {
    const { currentShapeId, stringId, fretIdx, variantId } = currentShapeVariantLocationData || {};
    const shapeData = currentShapeId ? shapes[currentShapeId] : null;

    if (!shapeData || currentShapeVariantLocationData === null) return [];

    const { fretboardCoordinatesVariants } = shapeData;
    if (!stringId || fretIdx === undefined || !variantId) return [];

    const variantCoordinates =
      fretboardCoordinatesVariants?.[stringId as keyof typeof fretboardCoordinatesVariants]?.[
        variantId as keyof (typeof fretboardCoordinatesVariants)[keyof typeof fretboardCoordinatesVariants]
      ];

    return variantCoordinates?.map(([s, f]) => [s, f + fretIdx]) || [];
  }, [currentShapeVariantLocationData]);

  return notesInSapeCoordinates;
};
