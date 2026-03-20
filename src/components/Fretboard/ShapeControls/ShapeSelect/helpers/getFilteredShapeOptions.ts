import {
  shapes,
  type Shapes,
  type RoleId,
  type MusicKeyId,
  type BaseChorId,
} from "@/data";
import { sortShapeOptionsByNote } from "./sortShapeOptionsByNote";

export type ShapeOption = {
  shapeId: keyof Shapes;
  shapeSemitoneOffsetFromC: number;
};

export const getFilteredShapeOptions = (
  roleId: RoleId | null,
  isMajorMode: boolean,
  tuneKeyId: MusicKeyId,
  baseChordId: BaseChorId,
): ShapeOption[] => {
  if (!roleId) return [];

  if (roleId === "all-matching-key") {
    const rolesToCombine: RoleId[] = ["tonic", "subdominant", "dominant"];
    const allOptions = rolesToCombine.flatMap((role) =>
      getFilteredShapeOptions(role, isMajorMode, tuneKeyId, baseChordId),
    );

    const seen = new Set<string>();
    const unique = allOptions.filter((opt) => {
      const key = `${opt.shapeId}|${opt.shapeSemitoneOffsetFromC}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return sortShapeOptionsByNote(unique, tuneKeyId);
  }

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
