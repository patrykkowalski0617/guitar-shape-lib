import { type Note } from "@/utils";

export interface MusicKeyInfo {
  readonly isFlatKey: boolean;
  readonly majorFirstNote: Note;
  readonly majorName: string;
  readonly relativeMinorFirstNote: Note;
  readonly relativeMinorName: string;
}

export const UNIFIED_MUSIC_KEYS = {
  C: {
    isFlatKey: false,
    majorFirstNote: "C",
    majorName: "C",
    relativeMinorName: "Am",
    relativeMinorFirstNote: "A",
  },
  Db: {
    isFlatKey: true,
    majorFirstNote: "Db",
    majorName: "Db",
    relativeMinorName: "Bbm",
    relativeMinorFirstNote: "Bb",
  },
  D: {
    isFlatKey: false,
    majorFirstNote: "D",
    majorName: "D",
    relativeMinorName: "Bm",
    relativeMinorFirstNote: "B",
  },
  Eb: {
    isFlatKey: true,
    majorFirstNote: "Eb",
    majorName: "Eb",
    relativeMinorName: "Cm",
    relativeMinorFirstNote: "C",
  },
  E: {
    isFlatKey: false,
    majorFirstNote: "E",
    majorName: "E",
    relativeMinorName: "C#m",
    relativeMinorFirstNote: "C",
  },
  F: {
    isFlatKey: true,
    majorFirstNote: "F",
    majorName: "F",
    relativeMinorName: "Dm",
    relativeMinorFirstNote: "D",
  },
  Fsharp: {
    isFlatKey: false,
    majorFirstNote: "F#",
    majorName: "F#",
    relativeMinorName: "D#m",
    relativeMinorFirstNote: "D",
  },
  G: {
    isFlatKey: false,
    majorFirstNote: "G",
    majorName: "G",
    relativeMinorName: "Em",
    relativeMinorFirstNote: "E",
  },
  Ab: {
    isFlatKey: true,
    majorFirstNote: "Ab",
    majorName: "Ab",
    relativeMinorName: "Fm",
    relativeMinorFirstNote: "F",
  },
  A: {
    isFlatKey: false,
    majorFirstNote: "A",
    majorName: "A",
    relativeMinorName: "F#m",
    relativeMinorFirstNote: "F#",
  },
  B: {
    isFlatKey: false,
    majorFirstNote: "B",
    majorName: "B",
    relativeMinorName: "G#m",
    relativeMinorFirstNote: "G",
  },
  Bb: {
    isFlatKey: true,
    majorFirstNote: "Bb",
    majorName: "Bb",
    relativeMinorName: "Gm",
    relativeMinorFirstNote: "G",
  },
} as const;

export type MusicKeyId = keyof typeof UNIFIED_MUSIC_KEYS;
