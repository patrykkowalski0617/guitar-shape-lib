export const getContinuousRangeIndices = (indices: number[]): Set<number> => {
  if (indices.length === 0) return new Set();

  const first = Math.min(...indices);
  const last = Math.max(...indices);
  const result = new Set<number>();

  for (let i = first; i <= last; i++) {
    result.add(i);
  }

  return result;
};
