import { shapes, type Shapes, type RoleId } from "@/data";

export type ShapeOption = { shapeId: keyof Shapes; offset: number };

export const getFilteredShapeOptions = (currentRoleId: RoleId | null, isMajorMode: boolean): ShapeOption[] => {
  if (!currentRoleId) return [];

  if (currentRoleId === "all-maching-key") {
    const rolesToCombine: RoleId[] = ["tonic", "subdominant", "dominant"];

    const allOptions = rolesToCombine.flatMap((role) => getFilteredShapeOptions(role, isMajorMode));

    const seen = new Set<string>();
    return allOptions.filter((option) => {
      const key = `${option.shapeId}|${option.offset}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  if (currentRoleId === "all-one-instacne") {
    return Object.keys(shapes).map((shapeId) => ({
      shapeId: shapeId as keyof Shapes,
      offset: 0,
    }));
  }

  const options: ShapeOption[] = [];

  Object.entries(shapes).forEach(([shapeId, shape]) => {
    const roleData =
      shape.semitoneOffsetFromMajorTonicRoot[currentRoleId as keyof typeof shape.semitoneOffsetFromMajorTonicRoot];

    if (!roleData) return;

    const offsets = [
      ...(roleData.bothModes || []),
      ...(isMajorMode ? roleData.majorMode || [] : roleData.minorMode || []),
    ];

    offsets.forEach((offset) => {
      options.push({ shapeId: shapeId as keyof Shapes, offset });
    });
  });

  return options;
};
