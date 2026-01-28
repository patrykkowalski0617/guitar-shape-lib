import { useMemo } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import shapes from "@/utils/shapesNew";

export const useShapeNotes = (
  currentShapeVariantLocationData: {
    stringId: string;
    fretIdx: number;
    variantId: string;
  } | null,
) => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);

  const notesInSapeCoordinates = useMemo(() => {
    const shapeData = currentShapeId ? shapes[currentShapeId] : null;
    if (!shapeData) return [];

    const { coordinatesVariants } = shapeData;
    const { stringId, fretIdx, variantId } = currentShapeVariantLocationData || {};

    if (!stringId || fretIdx === undefined || !variantId) return [];

    const variantCoordinates =
      coordinatesVariants?.[stringId as keyof typeof coordinatesVariants]?.[
        variantId as keyof (typeof coordinatesVariants)[keyof typeof coordinatesVariants]
      ];

    return variantCoordinates?.map(([s, f]) => [s, f + fretIdx]) || [];
  }, [currentShapeVariantLocationData, currentShapeId]);

  const isNoteInShape = (coords: [number, number]): boolean => {
    const [stringIndex, fretIndex] = coords;
    return notesInSapeCoordinates.some(
      ([shapeS, shapeF]) => shapeS === stringIndex && shapeF === fretIndex,
    );
  };

  return {
    isNoteInShape,
  };
};
