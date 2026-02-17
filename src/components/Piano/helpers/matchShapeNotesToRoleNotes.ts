export const matchShapeNotesToRoleNotes = (target: string[], input: string[]): string[] => {
  const inputPool = [...input];
  const getNoteName = (note: string) => note.split("-")[0];
  const getOctave = (note: string) => parseInt(note.split("-")[1], 10);

  const matchedFromTarget = target.reduce<string[]>((matchedNotes, targetNote, index) => {
    const targetName = getNoteName(targetNote);
    const targetOctave = getOctave(targetNote);

    const perfectMatchIndex = inputPool.findIndex((n) => getNoteName(n) === targetName);
    const isBeyondFoundations = index > 2;
    const hasNotes = inputPool.length > 0;

    let foundIndex = perfectMatchIndex;

    if (foundIndex === -1 && isBeyondFoundations && hasNotes) {
      const remainingTargetNames = target.slice(index + 1).map(getNoteName);
      foundIndex = inputPool.findIndex((n) => !remainingTargetNames.includes(getNoteName(n)));
    }

    if (foundIndex !== -1) {
      const matchedInputNote = inputPool[foundIndex];
      const matchedName = getNoteName(matchedInputNote);
      const originalOctave = getOctave(matchedInputNote);

      let finalOctave = targetOctave;

      const octaveDiff = Math.abs(targetOctave - originalOctave);

      if (octaveDiff > 1) {
        finalOctave = targetOctave > originalOctave ? originalOctave + 1 : originalOctave - 1;
      }

      matchedNotes.push(`${matchedName}-${finalOctave}`);
      inputPool.splice(foundIndex, 1);
    }

    return matchedNotes;
  }, []);

  return [...matchedFromTarget, ...inputPool];
};
