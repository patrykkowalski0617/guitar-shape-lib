export const getShapeFretRange = (notesInShapeCoordinates: number[][]) => {
  if (!notesInShapeCoordinates || notesInShapeCoordinates.length === 0) {
    return { min: 0, max: 0 };
  }

  const frets = notesInShapeCoordinates.map((pair) => pair[1]);

  const min = Math.min(...frets);
  const max = Math.max(...frets);

  return {
    min: min === Infinity ? 0 : min,
    max: max === -Infinity ? 0 : max,
  };
};
