import { SHAPES, type Shapes, type BaseChordId } from "@/data";

export type ShapeOption = {
  shapeId: keyof Shapes;
  semitoneOffsetFromMajorTonicRoot: number;
};

export const getFilteredAndFormatedShapes = (
  baseChordId: BaseChordId | null,
): ShapeOption[] => {
  if (!baseChordId) return [];

  const filteredAndFormatedShapes: ShapeOption[] = [];
  Object.entries(SHAPES).forEach(([shapeId, shape]) => {
    if (!shape.semitoneOffsetFromMajorTonicRoot) return;

    const offsets = shape.semitoneOffsetFromMajorTonicRoot[baseChordId];

    if (offsets === undefined) return;

    offsets.forEach((semitoneOffsetFromMajorTonicRoot) =>
      filteredAndFormatedShapes.push({
        shapeId: shapeId as keyof Shapes,
        semitoneOffsetFromMajorTonicRoot,
      }),
    );
  });

  return filteredAndFormatedShapes;
};
