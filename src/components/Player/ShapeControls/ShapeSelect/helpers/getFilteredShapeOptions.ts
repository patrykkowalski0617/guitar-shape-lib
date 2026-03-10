import { shapes, type Shapes, type RoleId, type MusicKeyId } from "@/data";
import { sortShapeOptionsByNote } from "./sortShapeOptionsByNote";

export type ShapeOption = { shapeId: keyof Shapes; shapeSemitoneOffsetFromC: number };

export const getFilteredShapeOptions = (
  roleId: RoleId | null,
  isMajorMode: boolean,
  tuneKeyId: MusicKeyId,
): ShapeOption[] => {
  if (!roleId) return [];

  if (roleId === "all-matching-key") {
    const rolesToCombine: RoleId[] = ["tonic", "subdominant", "dominant"];
    const allOptions = rolesToCombine.flatMap((role) => getFilteredShapeOptions(role, isMajorMode, tuneKeyId));

    const seen = new Set<string>();
    const unique = allOptions.filter((opt) => {
      const key = `${opt.shapeId}|${opt.shapeSemitoneOffsetFromC}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return sortShapeOptionsByNote(unique, tuneKeyId);
  }

  if (roleId === "all-one-instance") {
    return Object.keys(shapes).map((id) => ({ shapeId: id as keyof Shapes, shapeSemitoneOffsetFromC: 0 }));
  }

  const options: ShapeOption[] = [];
  Object.entries(shapes).forEach(([shapeId, shape]) => {
    const roleData =
      shape.semitoneOffsetFromMajorTonicRoot[roleId as keyof typeof shape.semitoneOffsetFromMajorTonicRoot];
    if (!roleData) return;

    const offsets = [
      ...(roleData.bothModes || []),
      ...(isMajorMode ? roleData.majorMode || [] : roleData.minorMode || []),
    ];

    offsets.forEach((shapeSemitoneOffsetFromC) =>
      options.push({ shapeId: shapeId as keyof Shapes, shapeSemitoneOffsetFromC }),
    );
  });

  return options;
};
