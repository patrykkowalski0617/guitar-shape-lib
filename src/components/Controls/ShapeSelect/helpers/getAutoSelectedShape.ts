import { DEFAULT_SHAPES_CONFIG, type RoleId } from "@/data";
import { getFilteredShapeOptions } from "./getFilteredShapeOptions";

export const getAutoSelectedShape = (roleId: RoleId | null, isMajorMode: boolean) => {
  const options = getFilteredShapeOptions(roleId, isMajorMode);

  const isGlobal = roleId === "all-one-instacne" || roleId === "all-maching-key";

  if (!roleId || isGlobal) {
    return { shapeId: null, offset: null };
  }

  const configKey = `${isMajorMode ? "major" : "minor"}_${roleId}` as keyof typeof DEFAULT_SHAPES_CONFIG;
  const defaultShapeId = DEFAULT_SHAPES_CONFIG[configKey];

  const defaultOption = options.find((opt) => opt.shapeId === defaultShapeId);
  const finalSelection = defaultOption || null;

  return {
    shapeId: finalSelection ? String(finalSelection.shapeId) : null,
    offset: finalSelection ? finalSelection.offset : null,
  };
};
