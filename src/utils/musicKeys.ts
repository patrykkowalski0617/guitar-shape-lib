import { type Note } from "@/utils";

export interface MusicKeyInfo {
  readonly offsetFromC: number;
  readonly isFlatTune: boolean;
  readonly majorFirstNote: Note;
  readonly majorName: string;
  readonly relativeMinorFirstNote: Note;
  readonly relativeMinorName: string;
}

export const UNIFIED_MUSIC_KEYS = {
  C: {
    offsetFromC: 0,
    isFlatTune: false,
    majorFirstNote: "C",
    majorName: "C",
    relativeMinorName: "Am",
    relativeMinorFirstNote: "A",
  },
  Db: {
    offsetFromC: 1,
    isFlatTune: true,
    majorFirstNote: "Db",
    majorName: "Db",
    relativeMinorName: "Bbm",
    relativeMinorFirstNote: "Bb",
  },
  D: {
    offsetFromC: 2,
    isFlatTune: false,
    majorFirstNote: "D",
    majorName: "D",
    relativeMinorName: "Bm",
    relativeMinorFirstNote: "B",
  },
  Eb: {
    offsetFromC: 3,
    isFlatTune: true,
    majorFirstNote: "Eb",
    majorName: "Eb",
    relativeMinorName: "Cm",
    relativeMinorFirstNote: "C",
  },
  E: {
    offsetFromC: 4,
    isFlatTune: false,
    majorFirstNote: "E",
    majorName: "E",
    relativeMinorName: "C#m",
    relativeMinorFirstNote: "C#",
  },
  F: {
    offsetFromC: 5,
    isFlatTune: true,
    majorFirstNote: "F",
    majorName: "F",
    relativeMinorName: "Dm",
    relativeMinorFirstNote: "D",
  },
  "F#": {
    offsetFromC: 6,
    isFlatTune: false,
    majorFirstNote: "F#",
    majorName: "F#",
    relativeMinorName: "D#m",
    relativeMinorFirstNote: "D#",
  },
  G: {
    offsetFromC: 7,
    isFlatTune: false,
    majorFirstNote: "G",
    majorName: "G",
    relativeMinorName: "Em",
    relativeMinorFirstNote: "E",
  },
  Ab: {
    offsetFromC: 8,
    isFlatTune: true,
    majorFirstNote: "Ab",
    majorName: "Ab",
    relativeMinorName: "Fm",
    relativeMinorFirstNote: "F",
  },
  A: {
    offsetFromC: 9,
    isFlatTune: false,
    majorFirstNote: "A",
    majorName: "A",
    relativeMinorName: "F#m",
    relativeMinorFirstNote: "F#",
  },
  Bb: {
    offsetFromC: 10,
    isFlatTune: true,
    majorFirstNote: "Bb",
    majorName: "Bb",
    relativeMinorName: "Gm",
    relativeMinorFirstNote: "G",
  },
  B: {
    offsetFromC: 11,
    isFlatTune: false,
    majorFirstNote: "B",
    majorName: "B",
    relativeMinorName: "G#m",
    relativeMinorFirstNote: "G#",
  },
} as const;

export type MusicKeyId = keyof typeof UNIFIED_MUSIC_KEYS;
