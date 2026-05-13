import type { NoteName } from "./NOTE_NAMES";

export type UnifiedMusicKeysDataKey = keyof typeof UNIFIED_MUSIC_KEYS;

export interface UnifiedMusicKeysDataKeyRecord {
  semitonOffsetFromC: number;
  isFlatTune: boolean;
  majorFirstNote: NoteName;
  relativeMinorFirstNote: NoteName;
  majorName: string;
  relativeMinorName: string;
}

export const UNIFIED_MUSIC_KEYS = {
  C: {
    semitonOffsetFromC: 0,
    isFlatTune: false,
    majorFirstNote: "C",
    relativeMinorFirstNote: "A",
    majorName: "C",
    relativeMinorName: "Am",
  },
  Db: {
    semitonOffsetFromC: 1,
    isFlatTune: true,
    majorFirstNote: "Db",
    relativeMinorFirstNote: "Bb",
    majorName: "Db",
    relativeMinorName: "Bbm",
  },
  D: {
    semitonOffsetFromC: 2,
    isFlatTune: false,
    majorFirstNote: "D",
    relativeMinorFirstNote: "B",
    majorName: "D",
    relativeMinorName: "Bm",
  },
  Eb: {
    semitonOffsetFromC: 3,
    isFlatTune: true,
    majorFirstNote: "Eb",
    relativeMinorFirstNote: "C",
    majorName: "Eb",
    relativeMinorName: "Cm",
  },
  E: {
    semitonOffsetFromC: 4,
    isFlatTune: false,
    majorFirstNote: "E",
    relativeMinorFirstNote: "C#",
    majorName: "E",
    relativeMinorName: "C#m",
  },
  F: {
    semitonOffsetFromC: 5,
    isFlatTune: true,
    majorFirstNote: "F",
    relativeMinorFirstNote: "D",
    majorName: "F",
    relativeMinorName: "Dm",
  },
  "F#": {
    semitonOffsetFromC: 6,
    isFlatTune: false,
    majorFirstNote: "F#",
    relativeMinorFirstNote: "D#",
    majorName: "F#",
    relativeMinorName: "D#m",
  },
  G: {
    semitonOffsetFromC: 7,
    isFlatTune: false,
    majorFirstNote: "G",
    relativeMinorFirstNote: "E",
    majorName: "G",
    relativeMinorName: "Em",
  },
  Ab: {
    semitonOffsetFromC: 8,
    isFlatTune: true,
    majorFirstNote: "Ab",
    relativeMinorFirstNote: "F",
    majorName: "Ab",
    relativeMinorName: "Fm",
  },
  A: {
    semitonOffsetFromC: 9,
    isFlatTune: false,
    majorFirstNote: "A",
    relativeMinorFirstNote: "F#",
    majorName: "A",
    relativeMinorName: "F#m",
  },
  Bb: {
    semitonOffsetFromC: 10,
    isFlatTune: true,
    majorFirstNote: "Bb",
    relativeMinorFirstNote: "G",
    majorName: "Bb",
    relativeMinorName: "Gm",
  },
  B: {
    semitonOffsetFromC: 11,
    isFlatTune: false,
    majorFirstNote: "B",
    relativeMinorFirstNote: "G#",
    majorName: "B",
    relativeMinorName: "G#m",
  },
} satisfies Record<string, UnifiedMusicKeysDataKeyRecord>;
