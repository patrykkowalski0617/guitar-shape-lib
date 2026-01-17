import { useState } from "react";
import shapes, { type Shapes } from "@/utils/shapes";
import { useControlsStore } from "@/store/useControlsStore";

export const useFretboardShapes = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const [activeShapePoints, setActiveShapePoints] = useState<{ s: number; f: number }[]>([]);

  const [, setVariantState] = useState({ lastId: "", variantIdx: 0 });

  const showShape = (stringIndex: number, fretIndex: number) => {
    const shapeData = (shapes as Shapes)[currentShapeId as string];
    if (!shapeData || !shapeData.shapesCoordinates) return;

    const clickedId = `${stringIndex}_${fretIndex}`;
    const coordinates = shapeData.shapesCoordinates;

    const validVariants = Object.entries(coordinates)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB, undefined, { numeric: true }))
      .map(([, points]) => points as [number, number][])
      .filter((shapeArr) => shapeArr.length > 0 && shapeArr[0][0] === stringIndex);

    if (validVariants.length === 0) return;

    setVariantState((prev) => {
      const isSameNote = prev.lastId === clickedId;
      const nextIdx = isSameNote ? (prev.variantIdx + 1) % validVariants.length : 0;

      const selectedVariant = validVariants[nextIdx];
      const rootFretOffset = selectedVariant[0][1];

      const points = selectedVariant.map(([s, fOffset]) => ({
        s,
        f: fretIndex + (fOffset - rootFretOffset),
      }));

      setActiveShapePoints(points);

      return {
        lastId: clickedId,
        variantIdx: nextIdx,
      };
    });
  };

  return {
    showShape,
    clearActiveShape: () => setActiveShapePoints([]),
    isPointInShape: (s: number, f: number) => activeShapePoints.some((p) => p.s === s && p.f === f),
  };
};
