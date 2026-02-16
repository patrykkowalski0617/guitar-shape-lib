export const matchShapeNotesToRoleNotes = (target: string[], input: string[]): string[] => {
  const inputPool = [...input];
  const getNoteName = (note: string) => note.split("-")[0];

  const matchedFromTarget = target.reduce<string[]>((matchedNotes, targetNote, index) => {
    const targetName = getNoteName(targetNote);
    const targetOctave = targetNote.split("-")[1];

    const perfectMatchIndex = inputPool.findIndex((note) => getNoteName(note) === targetName);

    const isPerfectMatchFound = perfectMatchIndex !== -1;
    const isBeyondChordsFoundations = index > 2; // skip 1, 3, 5
    const hasAvailableNotes = inputPool.length > 0;

    let foundIndex = perfectMatchIndex;

    if (!isPerfectMatchFound && isBeyondChordsFoundations && hasAvailableNotes) {
      const remainingTargetNames = target.slice(index + 1).map(getNoteName);

      foundIndex = inputPool.findIndex((note) => {
        const noteName = getNoteName(note);
        const isNotNeededForLaterPerfectMatch = !remainingTargetNames.includes(noteName);
        return isNotNeededForLaterPerfectMatch;
      });
    }

    if (foundIndex !== -1) {
      const matchedInputNote = inputPool[foundIndex];
      const matchedInputName = getNoteName(matchedInputNote);

      matchedNotes.push(`${matchedInputName}-${targetOctave}`);
      inputPool.splice(foundIndex, 1);
    }

    return matchedNotes;
  }, []);

  return [...matchedFromTarget, ...inputPool];
};
