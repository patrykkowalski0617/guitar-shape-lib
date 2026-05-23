import type { NoteId } from "@/utils";

const NOTE_SEMITONES: Record<string, number> = {
  C: 0,
  "C#": 1,
  D: 2,
  "D#": 3,
  E: 4,
  F: 5,
  "F#": 6,
  G: 7,
  "G#": 8,
  A: 9,
  "A#": 10,
  B: 11,
};

export const noteIdToFrequency = (noteId: NoteId): number => {
  const match = noteId.match(/([A-G]#?)-(\d+)$/);
  if (!match) return 440;

  const [, note, octaveStr] = match;
  const octave = parseInt(octaveStr, 10);

  const semitone = NOTE_SEMITONES[note] ?? 0;
  const midi = (octave + 1) * 12 + semitone;
  return 440 * Math.pow(2, (midi - 69) / 12);
};
