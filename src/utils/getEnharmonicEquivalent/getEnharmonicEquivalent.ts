import { NOTES_FLAT, NOTES_SHARP, type Note } from "@/utils";

type NoteSharp = (typeof NOTES_SHARP)[number];
type NoteFlat = (typeof NOTES_FLAT)[number];

export const getEnharmonicEquivalent = (note: Note): Note => {
  const sharpIndex = NOTES_SHARP.indexOf(note as NoteSharp);
  if (sharpIndex !== -1) return NOTES_FLAT[sharpIndex];

  const flatIndex = NOTES_FLAT.indexOf(note as NoteFlat);
  if (flatIndex !== -1) return NOTES_SHARP[flatIndex];

  return note;
};
