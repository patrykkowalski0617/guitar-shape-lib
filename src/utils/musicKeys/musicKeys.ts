import { type Note } from "@/utils";

export interface MusicKeyInfo {
  readonly orderNumber: number;
  readonly isFlatKey: boolean;
  readonly majorFirstNote: Note;
  readonly majorName: string;
  readonly relativeMinorFirstNote: Note;
  readonly relativeMinorName: string;
}

export const UNIFIED_MUSIC_KEYS = {
  C: {
    orderNumber: 0,
    isFlatKey: false,
    majorFirstNote: "C",
    majorName: "C",
    relativeMinorName: "Am",
    relativeMinorFirstNote: "A",
  },
  Db: {
    orderNumber: 1,
    isFlatKey: true,
    majorFirstNote: "Db",
    majorName: "Db",
    relativeMinorName: "Bbm",
    relativeMinorFirstNote: "Bb",
  },
  D: {
    orderNumber: 2,
    isFlatKey: false,
    majorFirstNote: "D",
    majorName: "D",
    relativeMinorName: "Bm",
    relativeMinorFirstNote: "B",
  },
  Eb: {
    orderNumber: 3,
    isFlatKey: true,
    majorFirstNote: "Eb",
    majorName: "Eb",
    relativeMinorName: "Cm",
    relativeMinorFirstNote: "C",
  },
  E: {
    orderNumber: 4,
    isFlatKey: false,
    majorFirstNote: "E",
    majorName: "E",
    relativeMinorName: "C#m",
    relativeMinorFirstNote: "C#",
  },
  F: {
    orderNumber: 5,
    isFlatKey: true,
    majorFirstNote: "F",
    majorName: "F",
    relativeMinorName: "Dm",
    relativeMinorFirstNote: "D",
  },
  "F#": {
    orderNumber: 6,
    isFlatKey: false,
    majorFirstNote: "F#",
    majorName: "F#",
    relativeMinorName: "D#m",
    relativeMinorFirstNote: "D#",
  },
  G: {
    orderNumber: 7,
    isFlatKey: false,
    majorFirstNote: "G",
    majorName: "G",
    relativeMinorName: "Em",
    relativeMinorFirstNote: "E",
  },
  Ab: {
    orderNumber: 8,
    isFlatKey: true,
    majorFirstNote: "Ab",
    majorName: "Ab",
    relativeMinorName: "Fm",
    relativeMinorFirstNote: "F",
  },
  A: {
    orderNumber: 9,
    isFlatKey: false,
    majorFirstNote: "A",
    majorName: "A",
    relativeMinorName: "F#m",
    relativeMinorFirstNote: "F#",
  },
  Bb: {
    orderNumber: 10,
    isFlatKey: true,
    majorFirstNote: "Bb",
    majorName: "Bb",
    relativeMinorName: "Gm",
    relativeMinorFirstNote: "G",
  },
  B: {
    orderNumber: 11,
    isFlatKey: false,
    majorFirstNote: "B",
    majorName: "B",
    relativeMinorName: "G#m",
    relativeMinorFirstNote: "G#",
  },
} as const;

export type MusicKeyId = keyof typeof UNIFIED_MUSIC_KEYS;
