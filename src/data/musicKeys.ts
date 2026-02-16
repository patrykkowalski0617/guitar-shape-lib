import { type Note } from "@/data";

export interface MusicKeyInfo {
  readonly offsetFromC: number;
  readonly isFlatTune: boolean;
  readonly majorFirstNote: Note;
  readonly relativeMinorFirstNote: Note;
  readonly majorName: string;
  readonly relativeMinorName: string;
}

export const UNIFIED_MUSIC_KEYS = {
  C: {
    offsetFromC: 0,
    isFlatTune: false,
    majorFirstNote: "C",
    majorName: "C",
    relativeMinorFirstNote: "A",
    relativeMinorName: "Am",
  },
  Db: {
    offsetFromC: 1,
    isFlatTune: true,
    majorFirstNote: "Db",
    majorName: "Db",
    relativeMinorFirstNote: "Bb",
    relativeMinorName: "Bbm",
  },
  D: {
    offsetFromC: 2,
    isFlatTune: false,
    majorFirstNote: "D",
    majorName: "D",
    relativeMinorFirstNote: "B",
    relativeMinorName: "Bm",
  },
  Eb: {
    offsetFromC: 3,
    isFlatTune: true,
    majorFirstNote: "Eb",
    majorName: "Eb",
    relativeMinorFirstNote: "C",
    relativeMinorName: "Cm",
  },
  E: {
    offsetFromC: 4,
    isFlatTune: false,
    majorFirstNote: "E",
    majorName: "E",
    relativeMinorFirstNote: "C#",
    relativeMinorName: "C#m",
  },
  F: {
    offsetFromC: 5,
    isFlatTune: true,
    majorFirstNote: "F",
    majorName: "F",
    relativeMinorFirstNote: "D",
    relativeMinorName: "Dm",
  },
  "F#": {
    offsetFromC: 6,
    isFlatTune: false,
    majorFirstNote: "F#",
    majorName: "F#",
    relativeMinorFirstNote: "D#",
    relativeMinorName: "D#m",
  },
  G: {
    offsetFromC: 7,
    isFlatTune: false,
    majorFirstNote: "G",
    majorName: "G",
    relativeMinorFirstNote: "E",
    relativeMinorName: "Em",
  },
  Ab: {
    offsetFromC: 8,
    isFlatTune: true,
    majorFirstNote: "Ab",
    majorName: "Ab",
    relativeMinorFirstNote: "F",
    relativeMinorName: "Fm",
  },
  A: {
    offsetFromC: 9,
    isFlatTune: false,
    majorFirstNote: "A",
    majorName: "A",
    relativeMinorFirstNote: "F#",
    relativeMinorName: "F#m",
  },
  Bb: {
    offsetFromC: 10,
    isFlatTune: true,
    majorFirstNote: "Bb",
    majorName: "Bb",
    relativeMinorFirstNote: "G",
    relativeMinorName: "Gm",
  },
  B: {
    offsetFromC: 11,
    isFlatTune: false,
    majorFirstNote: "B",
    majorName: "B",
    relativeMinorFirstNote: "G#",
    relativeMinorName: "G#m",
  },
} as const;

export type MusicKeyId = keyof typeof UNIFIED_MUSIC_KEYS;
