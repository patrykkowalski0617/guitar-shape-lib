import { shapes, type Shapes, type BaseChordId } from "@/data";

export type ShapeOption = {
  shapeId: keyof Shapes;
  shapeSemitoneOffsetFromC: number;
};

export const getFilteredShapeOptions = (
  baseChordId: BaseChordId | null,
): ShapeOption[] => {
  if (!baseChordId) return [];

  const options: ShapeOption[] = [];
  Object.entries(shapes).forEach(([shapeId, shape]) => {
    if (!shape.semitoneOffsetFromMajorTonicRoot) return;

    const offsets = shape.semitoneOffsetFromMajorTonicRoot[baseChordId];

    if (offsets === undefined) return;

    offsets.forEach((shapeSemitoneOffsetFromC) =>
      options.push({
        shapeId: shapeId as keyof Shapes,
        shapeSemitoneOffsetFromC,
      }),
    );
  });

  return options;
};
