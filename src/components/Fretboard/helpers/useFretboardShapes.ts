import { useState, useMemo } from "react";
import shapes, { type Shapes } from "@/utils/shapes";
import { useControlsStore } from "@/store/useControlsStore";

export const useFretboardShapes = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);

  const [variantState, setVariantState] = useState({
    stringIdx: -1,
    fretIdx: -1,
    variantIdx: 0,
  });

  const activeShapePoints = useMemo(() => {
    if (variantState.stringIdx === -1 || variantState.fretIdx === -1 || !currentShapeId) {
      return [];
    }

    const shapeData = (shapes as Shapes)[currentShapeId as string];
    if (!shapeData) return [];

    const currentFretIdx = variantState.fretIdx;

    const validVariants = Object.entries(shapeData.shapesCoordinates)
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([, points]) => points as [number, number][])
      .filter((v) => v.length > 0 && v[0][0] === variantState.stringIdx);

    if (validVariants.length === 0) return [];

    const selectedVariant = validVariants[variantState.variantIdx % validVariants.length];
    const rootFretOffset = selectedVariant[0][1];

    return selectedVariant.map(([s, fOffset]) => ({
      s,
      f: currentFretIdx + (fOffset - rootFretOffset),
    }));
  }, [variantState, currentShapeId]);

  const showShape = (stringIndex: number, fretIndex: number) => {
    setVariantState((prev) => ({
      stringIdx: stringIndex,
      fretIdx: fretIndex,
      variantIdx:
        prev.stringIdx === stringIndex && prev.fretIdx === fretIndex ? prev.variantIdx + 1 : 0,
    }));
  };

  return {
    showShape,
    clearActiveShape: () => setVariantState({ stringIdx: -1, fretIdx: -1, variantIdx: 0 }),
    isPointInShape: (s: number, f: number) => activeShapePoints.some((p) => p.s === s && p.f === f),
  };
};
