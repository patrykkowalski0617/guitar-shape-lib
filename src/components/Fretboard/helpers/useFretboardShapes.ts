import { useState, useMemo } from "react";
import shapes, { type Shapes } from "@/utils/shapes";
import { useControlsStore } from "@/store/useControlsStore";
import { getNotes } from "@/utils";
import { STRINGS_FIRST_NOTES, numberOfFrets } from "./constants";

export const useFretboardShapes = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentShapeOffset = useControlsStore((state) => state.currentShapeOffset);

  const [variantState, setVariantState] = useState({
    stringIdx: -1,
    variantIdx: 0,
  });

  const targetNoteName = useMemo(() => {
    const notes = getNotes({ firstNote: currentKeyId });
    return notes[(currentShapeOffset || 0) % 12].sharpNoteName;
  }, [currentKeyId, currentShapeOffset]);

  const activeShapePoints = useMemo(() => {
    if (variantState.stringIdx === -1 || !currentShapeId) return [];

    const startNote = STRINGS_FIRST_NOTES[variantState.stringIdx];
    const notesOnString = getNotes({
      firstNote: startNote.noteName,
      length: numberOfFrets,
      firstOctave: startNote.octaveNumber,
    });

    const currentFretIdx = notesOnString.findIndex((n) => n.sharpNoteName === targetNoteName);
    if (currentFretIdx === -1) return [];

    const shapeData = (shapes as Shapes)[currentShapeId as string];
    if (!shapeData) return [];

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
  }, [variantState, currentShapeId, targetNoteName]);

  const showShape = (stringIndex: number) => {
    setVariantState((prev) => ({
      stringIdx: stringIndex,
      variantIdx: prev.stringIdx === stringIndex ? prev.variantIdx + 1 : 0,
    }));
  };

  return {
    showShape,
    clearActiveShape: () => setVariantState({ stringIdx: -1, variantIdx: 0 }),
    isPointInShape: (s: number, f: number) => activeShapePoints.some((p) => p.s === s && p.f === f),
  };
};
