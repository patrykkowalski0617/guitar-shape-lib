import { useMemo, useCallback } from "react";
import shapes, { type Shapes } from "@/utils/shapes";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useProgressStore } from "@/store/useProgressStore";

export const useFretboardShapes = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const activeShapePoint = useMusicStore((state) => state.activeShapePoint);
  const setActiveShapePoint = useMusicStore((state) => state.setActiveShapePoint);
  const { learned, learning } = useProgressStore();

  const { activeShapePoints, variantId, stringVariants } = useMemo(() => {
    if (!activeShapePoint || !currentShapeId)
      return { activeShapePoints: [], variantId: null, stringVariants: [] };

    const shapeData = (shapes as Shapes)[currentShapeId as string];
    if (!shapeData) return { activeShapePoints: [], variantId: null, stringVariants: [] };

    const { stringIdx, fretIdx, variantIdx } = activeShapePoint;

    const allVariants = Object.entries(shapeData.shapesCoordinates);

    const validVariants = allVariants.filter(
      ([, coords]) => coords.length > 0 && coords[0][0] === stringIdx,
    );

    const mappedVariants = validVariants.map(([id]) => ({
      id,
      isLearned: learned.includes(id),
      isLearning: learning.includes(id),
    }));

    if (mappedVariants.length === 0)
      return { activeShapePoints: [], variantId: null, stringVariants: [] };

    const count = mappedVariants.length;
    const selectedVariant = mappedVariants[variantIdx % count];
    const selectedCoords = validVariants[variantIdx % count][1];
    const rootFretOffset = selectedCoords[0][1];

    const mappedPoints = selectedCoords.map(([s, fOffset]) => ({
      s,
      f: fretIdx + (fOffset - rootFretOffset),
    }));

    return {
      activeShapePoints: mappedPoints,
      variantId: selectedVariant.id,
      stringVariants: mappedVariants,
    };
  }, [activeShapePoint, currentShapeId, learned, learning]);

  const showShape = useCallback(
    (stringIndex: number, fretIndex: number) => {
      const currentPoint = useMusicStore.getState().activeShapePoint;
      const isSamePoint =
        currentPoint?.stringIdx === stringIndex && currentPoint?.fretIdx === fretIndex;

      setActiveShapePoint({
        stringIdx: stringIndex,
        fretIdx: fretIndex,
        variantIdx: isSamePoint ? (currentPoint?.variantIdx ?? 0) + 1 : 0,
      });
    },
    [setActiveShapePoint],
  );

  return {
    showShape,
    isPointInShape: (s: number, f: number) => activeShapePoints.some((p) => p.s === s && p.f === f),
    currentVariantId: variantId,
    stringVariants,
  };
};
