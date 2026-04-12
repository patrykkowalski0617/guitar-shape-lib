export const NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

export const NOTES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"] as const;

export type NoteSharp = (typeof NOTES_SHARP)[number];
export type NoteFlat = (typeof NOTES_FLAT)[number];
export type Note = NoteSharp | NoteFlat;
