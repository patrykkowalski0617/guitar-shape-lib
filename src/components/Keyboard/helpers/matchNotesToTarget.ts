export const matchNotesToTarget = (target: string[], input: string[]): string[] => {
  const inputPool = [...input];

  const getNoteName = (note: string) => note.split("-")[0];
  const matchedFromTarget = target.reduce<string[]>((acc, targetNote) => {
    const targetName = getNoteName(targetNote);
    const foundIndex = inputPool.findIndex((n) => getNoteName(n) === targetName);

    if (foundIndex !== -1) {
      acc.push(targetNote);
      inputPool.splice(foundIndex, 1);
    }

    return acc;
  }, []);

  return [...matchedFromTarget, ...inputPool];
};
