import shapes, { DEFAULT_SHAPES_CONFIG, type Shapes } from "@/utils/shapes";

export const getFilteredShapeOptions = (currentRoleId: string | null, isMajorMode: boolean) => {
  if (!currentRoleId) return [];

  const options: { shapeId: keyof Shapes; offset: number }[] = [];
  const typedShapes = shapes as Shapes;

  Object.entries(typedShapes).forEach(([shapeId, shape]) => {
    const hasCoordinates =
      shape.shapesCoordinates && Object.keys(shape.shapesCoordinates).length > 0;

    if (!hasCoordinates) return;

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

export const getAutoSelectedShape = (roleId: string, isMajorMode: boolean) => {
  const options = getFilteredShapeOptions(roleId, isMajorMode);

  const configKey = `${
    isMajorMode ? "major" : "minor"
  }_${roleId}` as keyof typeof DEFAULT_SHAPES_CONFIG;
  const defaultShapeId = DEFAULT_SHAPES_CONFIG[configKey];

  const defaultOption = options.find((opt) => opt.shapeId === defaultShapeId);
  const finalSelection = defaultOption || options[0];

  return {
    shapeId: (finalSelection?.shapeId as string) ?? null,
    offset: finalSelection?.offset ?? null,
  };
};
