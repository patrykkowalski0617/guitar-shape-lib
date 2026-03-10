import {
  type RoleId,
  type FunctionalRoleId,
  DEFAULT_SHAPES_CONFIG,
  type MusicKeyId,
} from "@/data";
import { isGlobalRole } from "@/utils";
import {
  getFilteredShapeOptions,
  type ShapeOption,
} from "./getFilteredShapeOptions";

export const getAutoSelectedShape = (
  roleId: RoleId | null,
  isMajorMode: boolean,
  tuneKeyId: MusicKeyId,
) => {
  const options: ShapeOption[] = getFilteredShapeOptions(
    roleId,
    isMajorMode,
    tuneKeyId,
  );

  if (!roleId || isGlobalRole(roleId)) {
    return { shapeId: null, shapeSemitoneOffsetFromC: null };
  }

  const configKey =
    `${isMajorMode ? "major" : "minor"}_${roleId as FunctionalRoleId}` as keyof typeof DEFAULT_SHAPES_CONFIG;
  const defaultShapeId = DEFAULT_SHAPES_CONFIG[configKey];

  const defaultOption = options.find(
    (option) => option.shapeId === defaultShapeId,
  );
  const finalSelection = defaultOption || null;

  return {
    shapeId: finalSelection ? String(finalSelection.shapeId) : null,
    shapeSemitoneOffsetFromC: finalSelection
      ? finalSelection.shapeSemitoneOffsetFromC
      : null,
  };
};
