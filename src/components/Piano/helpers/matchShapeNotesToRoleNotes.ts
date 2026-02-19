const NOTE_BASE_INTERVALS: Record<string, number> = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
};

export const matchShapeNotesToRoleNotes = (target: string[], input: string[]): string[] => {
  const inputPool = [...input];
  const getNoteName = (n: string) => n.split("-")[0];
  const getOctave = (n: string) => parseInt(n.split("-")[1], 10);
  const getPitch = (name: string, oct: number) => (NOTE_BASE_INTERVALS[name] ?? 0) + oct * 12;

  const matchedFromTarget = target.reduce<string[]>((matchedNotes, targetNote, index) => {
    const targetName = getNoteName(targetNote);
    const targetOctave = getOctave(targetNote);
    const targetPitch = getPitch(targetName, targetOctave);

    const perfectMatchIndex = inputPool.findIndex((n) => getNoteName(n) === targetName);
    const isBeyondFoundations = index > 2;

    let foundIndex = perfectMatchIndex;
    if (foundIndex === -1 && isBeyondFoundations && inputPool.length > 0) {
      const remainingTargetNames = target.slice(index + 1).map(getNoteName);
      foundIndex = inputPool.findIndex((n) => !remainingTargetNames.includes(getNoteName(n)));
    }

    if (foundIndex !== -1) {
      const matchedInputNote = inputPool[foundIndex];
      const name = getNoteName(matchedInputNote);

      const finalOctave = [targetOctave - 1, targetOctave, targetOctave + 1].reduce((prev, curr) =>
        Math.abs(getPitch(name, curr) - targetPitch) < Math.abs(getPitch(name, prev) - targetPitch) ? curr : prev,
      );

      matchedNotes.push(`${name}-${finalOctave}`);
      inputPool.splice(foundIndex, 1);
    }

    return matchedNotes;
  }, []);

  return [...matchedFromTarget, ...inputPool];
};
