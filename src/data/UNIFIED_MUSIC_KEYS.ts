import type { NoteName } from "./NOTE_NAMES";

export type UnifiedMusicKeysDataKeys = keyof typeof UNIFIED_MUSIC_KEYS;

export interface UnifiedMusicKeysDataKeysRecord {
  offsetFromC: number;
  isFlatTune: boolean;
  majorFirstNote: NoteName;
  relativeMinorFirstNote: NoteName;
  majorName: string;
  relativeMinorName: string;
}

export const UNIFIED_MUSIC_KEYS = {
  C: {
    offsetFromC: 0,
    isFlatTune: false,
    majorFirstNote: "C",
    relativeMinorFirstNote: "A",
    majorName: "C",
    relativeMinorName: "Am",
  },
  Db: {
    offsetFromC: 1,
    isFlatTune: true,
    majorFirstNote: "Db",
    relativeMinorFirstNote: "Bb",
    majorName: "Db",
    relativeMinorName: "Bbm",
  },
  D: {
    offsetFromC: 2,
    isFlatTune: false,
    majorFirstNote: "D",
    relativeMinorFirstNote: "B",
    majorName: "D",
    relativeMinorName: "Bm",
  },
  Eb: {
    offsetFromC: 3,
    isFlatTune: true,
    majorFirstNote: "Eb",
    relativeMinorFirstNote: "C",
    majorName: "Eb",
    relativeMinorName: "Cm",
  },
  E: {
    offsetFromC: 4,
    isFlatTune: false,
    majorFirstNote: "E",
    relativeMinorFirstNote: "C#",
    majorName: "E",
    relativeMinorName: "C#m",
  },
  F: {
    offsetFromC: 5,
    isFlatTune: true,
    majorFirstNote: "F",
    relativeMinorFirstNote: "D",
    majorName: "F",
    relativeMinorName: "Dm",
  },
  "F#": {
    offsetFromC: 6,
    isFlatTune: false,
    majorFirstNote: "F#",
    relativeMinorFirstNote: "D#",
    majorName: "F#",
    relativeMinorName: "D#m",
  },
  G: {
    offsetFromC: 7,
    isFlatTune: false,
    majorFirstNote: "G",
    relativeMinorFirstNote: "E",
    majorName: "G",
    relativeMinorName: "Em",
  },
  Ab: {
    offsetFromC: 8,
    isFlatTune: true,
    majorFirstNote: "Ab",
    relativeMinorFirstNote: "F",
    majorName: "Ab",
    relativeMinorName: "Fm",
  },
  A: {
    offsetFromC: 9,
    isFlatTune: false,
    majorFirstNote: "A",
    relativeMinorFirstNote: "F#",
    majorName: "A",
    relativeMinorName: "F#m",
  },
  Bb: {
    offsetFromC: 10,
    isFlatTune: true,
    majorFirstNote: "Bb",
    relativeMinorFirstNote: "G",
    majorName: "Bb",
    relativeMinorName: "Gm",
  },
  B: {
    offsetFromC: 11,
    isFlatTune: false,
    majorFirstNote: "B",
    relativeMinorFirstNote: "G#",
    majorName: "B",
    relativeMinorName: "G#m",
  },
} satisfies Record<string, UnifiedMusicKeysDataKeysRecord>;
