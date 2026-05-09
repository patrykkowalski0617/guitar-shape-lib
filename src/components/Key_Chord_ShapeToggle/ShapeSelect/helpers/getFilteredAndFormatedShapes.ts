import { SHAPES, type Shapes, type BaseChordDataKey } from "@/data";

export type ShapeOption = {
  shapeDataKey: keyof Shapes;
  semitoneOffsetFromMajorTonicRoot: number;
};

export const getFilteredAndFormatedShapes = (
  baseChordDataKey: BaseChordDataKey | null,
): ShapeOption[] => {
  if (!baseChordDataKey) return [];

  const filteredAndFormatedShapes: ShapeOption[] = [];
  Object.entries(SHAPES).forEach(([shapeDataKey, shape]) => {
    if (!shape.semitoneOffsetFromMajorTonicRoot) return;

    const offsets = shape.semitoneOffsetFromMajorTonicRoot[baseChordDataKey];

    if (offsets === undefined) return;

    offsets.forEach((semitoneOffsetFromMajorTonicRoot) =>
      filteredAndFormatedShapes.push({
        shapeDataKey: shapeDataKey as keyof Shapes,
        semitoneOffsetFromMajorTonicRoot,
      }),
    );
  });

  return filteredAndFormatedShapes;
};
