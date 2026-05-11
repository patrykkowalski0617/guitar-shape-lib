export const getFullRange = (values: number[]) => {
  const start = Math.min(...values);
  const end = Math.max(...values);
  const range = [];
  for (let i = start; i <= end; i++) range.push(i);
  return range;
};

export const calculatePercent = (
  current: number,
  min: number,
  range: number,
) => {
  return ((current - min) / range) * 100;
};

export const getPotentialRange = (val1: number, val2: number) => [
  Math.min(val1, val2),
  Math.max(val1, val2),
];

export const getAllIndexesFromIndexRange = (range: number[]): number[] => {
  if (range.length === 0) return [];

  const start = Math.min(...range);
  const end = Math.max(...range);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
