import { useMemo, useCallback } from "react";
import shapes, { type Shapes } from "@/utils/shapes";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";

export const useFretboardShapes = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const activeShapePoint = useMusicStore((state) => state.activeShapePoint);
  const setActiveShapePoint = useMusicStore((state) => state.setActiveShapePoint);

  const activeShapePoints = useMemo(() => {
    if (!activeShapePoint || !currentShapeId) return [];

    const shapeData = (shapes as Shapes)[currentShapeId as string];
    if (!shapeData) return [];

    const { stringIdx, fretIdx, variantIdx } = activeShapePoint;

    const validVariants = Object.entries(shapeData.shapesCoordinates)
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([, points]) => points as [number, number][])
      .filter((v) => v.length > 0 && v[0][0] === stringIdx);

    if (validVariants.length === 0) return [];

    const selectedVariant = validVariants[variantIdx % validVariants.length];
    const rootFretOffset = selectedVariant[0][1];

    return selectedVariant.map(([s, fOffset]) => ({
      s,
      f: fretIdx + (fOffset - rootFretOffset),
    }));
  }, [activeShapePoint, currentShapeId]);

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
    [setActiveShapePoint]
  );

  return {
    showShape,
    isPointInShape: (s: number, f: number) => activeShapePoints.some((p) => p.s === s && p.f === f),
  };
};
