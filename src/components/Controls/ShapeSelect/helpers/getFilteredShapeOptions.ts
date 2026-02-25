import { shapes, type Shapes, type RoleId, type MusicKeyId } from "@/data";
import { sortShapeOptionsByNote } from "./sortShapeOptionsByNote";

export type ShapeOption = { shapeId: keyof Shapes; offset: number };

export const getFilteredShapeOptions = (
  currentRoleId: RoleId | null,
  isMajorMode: boolean,
  currentKeyId: MusicKeyId,
): ShapeOption[] => {
  if (!currentRoleId) return [];

  if (currentRoleId === "all-matching-key") {
    const rolesToCombine: RoleId[] = ["tonic", "subdominant", "dominant"];
    const allOptions = rolesToCombine.flatMap((role) => getFilteredShapeOptions(role, isMajorMode, currentKeyId));

    const seen = new Set<string>();
    const unique = allOptions.filter((opt) => {
      const key = `${opt.shapeId}|${opt.offset}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return sortShapeOptionsByNote(unique, currentKeyId);
  }

  if (currentRoleId === "all-one-instance") {
    return Object.keys(shapes).map((id) => ({ shapeId: id as keyof Shapes, offset: 0 }));
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

    offsets.forEach((offset) => options.push({ shapeId: shapeId as keyof Shapes, offset }));
  });

  return options;
};
