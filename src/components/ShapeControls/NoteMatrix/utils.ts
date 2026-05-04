export const getIsScaleNoteVisible = (
  index: number,
  onlyScaleNotesIndices: number[],
) => {
  const positionInScale = onlyScaleNotesIndices.indexOf(index);
  const isInScale = positionInScale !== -1;
  const isTertiarySelected = positionInScale % 2 === 0;
  return isInScale && isTertiarySelected;
};

export const getIsShapeNoteVisible = (
  index: number,
  shapeIndexes: number[],
) => {
  return shapeIndexes.includes(index);
};
