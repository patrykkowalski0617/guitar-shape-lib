export const getIndexRangeArray = (start: number, end: number): number[] => {
  const from = Math.min(start, end);
  const to = Math.max(start, end);
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
};

export const getRangeFromVisibleStrings = (
  visibleStrings: number[],
): { start: number; end: number } => {
  if (!visibleStrings.length) return { start: 0, end: 0 };

  return {
    start: Math.min(...visibleStrings),
    end: Math.max(...visibleStrings),
  };
};
