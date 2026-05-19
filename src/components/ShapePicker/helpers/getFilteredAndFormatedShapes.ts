import {
  GUITAR_SHAPES,
  type GuitarShapes,
  type BaseChordDataKey,
} from "@/data";

export type ShapeOption = {
  guitarShapeDataKey: keyof GuitarShapes;
  semitoneOffsetFromMajorRoot: number;
};

export const getFilteredAndFormatedShapes = (
  baseChordDataKey: BaseChordDataKey | null,
): ShapeOption[] => {
  if (!baseChordDataKey) return [];

  const filteredAndFormatedShapes: ShapeOption[] = [];
  Object.entries(GUITAR_SHAPES).forEach(([guitarShapeDataKey, guitarShape]) => {
    if (!guitarShape.semitoneOffsetFromMajorRoot) return;

    const offsets = guitarShape.semitoneOffsetFromMajorRoot[baseChordDataKey];

    if (offsets === undefined) return;

    offsets.forEach((semitoneOffsetFromMajorRoot) =>
      filteredAndFormatedShapes.push({
        guitarShapeDataKey: guitarShapeDataKey as keyof GuitarShapes,
        semitoneOffsetFromMajorRoot,
      }),
    );
  });

  return filteredAndFormatedShapes;
};
