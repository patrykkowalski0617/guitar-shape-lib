export const getTheLowestFret = (notesInSapeCoordinates: number[][]): number => {
  if (!notesInSapeCoordinates || notesInSapeCoordinates.length === 0) return 0;
  const frets = notesInSapeCoordinates.map((pair) => pair[1]);
  const min = Math.min(...frets);
  return min === Infinity ? 0 : min;
};
