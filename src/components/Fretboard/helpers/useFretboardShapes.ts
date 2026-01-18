import { useMemo, useCallback } from "react";
import shapes, { type Shapes } from "@/utils/shapes";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";

export const useFretboardShapes = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const activeShapePoint = useMusicStore((state) => state.activeShapePoint);
  const setActiveShapePoint = useMusicStore((state) => state.setActiveShapePoint);
  const setCurrentShapeRootFret = useMusicStore((state) => state.setCurrentShapeRootFret);

  const { activeShapePoints, variantId } = useMemo(() => {
    if (!activeShapePoint || !currentShapeId) return { activeShapePoints: [], variantId: null };

    const shapeData = (shapes as Shapes)[currentShapeId as string];
    if (!shapeData) return { activeShapePoints: [], variantId: null };

    const { stringIdx, fretIdx, variantIdx } = activeShapePoint;

    setCurrentShapeRootFret(fretIdx);

    const allVariants = Object.entries(shapeData.shapesCoordinates).sort(([a], [b]) =>
      a.localeCompare(b, undefined, { numeric: true })
    );

    const validVariants = allVariants.filter(
      ([, coords]) => coords.length > 0 && coords[0][0] === stringIdx
    );

    if (validVariants.length === 0) return { activeShapePoints: [], variantId: null };

    const [selectedId, selectedCoords] = validVariants[variantIdx % validVariants.length];
    const rootFretOffset = selectedCoords[0][1];

    const mappedPoints = selectedCoords.map(([s, fOffset]) => ({
      s,
      f: fretIdx + (fOffset - rootFretOffset),
    }));

    return { activeShapePoints: mappedPoints, variantId: selectedId };
  }, [activeShapePoint, currentShapeId, setCurrentShapeRootFret]);

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
    currentVariantId: variantId,
  };
};
