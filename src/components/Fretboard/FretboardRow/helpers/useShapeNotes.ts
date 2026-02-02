import { useMemo } from "react";
import shapes from "@/utils/shapes";

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
    if (!shapeData) return [];

    const { coordinatesVariants } = shapeData;

    if (!stringId || fretIdx === undefined || !variantId) return [];

    const variantCoordinates =
      coordinatesVariants?.[stringId as keyof typeof coordinatesVariants]?.[
        variantId as keyof (typeof coordinatesVariants)[keyof typeof coordinatesVariants]
      ];

    return variantCoordinates?.map(([s, f]) => [s, f + fretIdx]) || [];
  }, [currentShapeVariantLocationData]);

  const isShapeNote = (coords: [number, number]): boolean => {
    const [stringIndex, fretIndex] = coords;
    return notesInSapeCoordinates.some(
      ([shapeS, shapeF]) => shapeS === stringIndex && shapeF === fretIndex,
    );
  };

  return {
    isShapeNote,
  };
};
