import { shapes, DEFAULT_SHAPES_CONFIG, type Shapes } from "@/data";

export const getFilteredShapeOptions = (currentRoleId: string | null, isMajorMode: boolean) => {
  if (currentRoleId === "all") {
    return Object.keys(shapes).map((shapeId) => ({
      shapeId: shapeId as keyof Shapes,
      offset: 0,
    }));
  }

  const options: { shapeId: keyof Shapes; offset: number }[] = [];
  if (!currentRoleId) return options;

  Object.entries(shapes).forEach(([shapeId, shape]) => {
    const roleKey = currentRoleId as keyof typeof shape.semitoneOffsetFromMajorTonicRoot;
    const roleData = shape.semitoneOffsetFromMajorTonicRoot[roleKey];

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

export const getAutoSelectedShape = (roleId: string | null, isMajorMode: boolean) => {
  const options = getFilteredShapeOptions(roleId, isMajorMode);

  const configKey = `${isMajorMode ? "major" : "minor"}_${roleId}` as keyof typeof DEFAULT_SHAPES_CONFIG;
  const defaultShapeId = DEFAULT_SHAPES_CONFIG[configKey];

  const defaultOption = options.find((opt) => opt.shapeId === defaultShapeId);
  const finalSelection = defaultOption || options[0];

  return {
    shapeId: finalSelection ? String(finalSelection.shapeId) : null,
    offset: finalSelection ? finalSelection.offset : null,
  };
};
