import { useMemo } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import shapes from "@/utils/shapesNew";

export const useShapeNotes = () => {
  const currentShapeVariantLocationData = useMusicStore(
    (state) => state.currentShapeVariantLocationData,
  );
  const currentShapeId = useControlsStore((state) => state.currentShapeId);

  const notesInSapeCoordinates = useMemo(() => {
    const shapeData = currentShapeId ? shapes[currentShapeId] : null;
    if (!shapeData) return [];

    const { coordinatesVariants } = shapeData;
    const { stringKey, fretIdx, variantId } = currentShapeVariantLocationData || {};

    if (!stringKey || fretIdx === undefined || !variantId) return [];

    const variantCoordinates =
      coordinatesVariants?.[stringKey as keyof typeof coordinatesVariants]?.[
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
