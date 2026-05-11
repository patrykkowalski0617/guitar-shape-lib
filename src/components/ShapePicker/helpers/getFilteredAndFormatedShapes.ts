import { SHAPES, type Shapes, type BaseChordDataKey } from "@/data";

export type ShapeOption = {
  shapeDataKey: keyof Shapes;
  semitoneOffsetFromMajorRoot: number;
};

export const getFilteredAndFormatedShapes = (
  baseChordDataKey: BaseChordDataKey | null,
): ShapeOption[] => {
  if (!baseChordDataKey) return [];

  const filteredAndFormatedShapes: ShapeOption[] = [];
  Object.entries(SHAPES).forEach(([shapeDataKey, shape]) => {
    if (!shape.semitoneOffsetFromMajorRoot) return;

    const offsets = shape.semitoneOffsetFromMajorRoot[baseChordDataKey];

    if (offsets === undefined) return;

    offsets.forEach((semitoneOffsetFromMajorRoot) =>
      filteredAndFormatedShapes.push({
        shapeDataKey: shapeDataKey as keyof Shapes,
        semitoneOffsetFromMajorRoot,
      }),
    );
  });

  return filteredAndFormatedShapes;
};
