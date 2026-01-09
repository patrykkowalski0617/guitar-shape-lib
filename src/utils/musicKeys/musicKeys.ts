// src/constants/musicKeys.ts
import { type Note } from "@/utils";

export interface MusicKeyInfo {
  readonly firstNote: Note;
  readonly isFlatKey: boolean;
  readonly unifiedName: string;
}

export const MUSIC_KEYS = {
  C: { firstNote: "C", isFlatKey: false, unifiedName: "C / Am" },
  G: { firstNote: "G", isFlatKey: false, unifiedName: "G / Em" },
  D: { firstNote: "D", isFlatKey: false, unifiedName: "D / Bm" },
  A: { firstNote: "A", isFlatKey: false, unifiedName: "A / F#m" },
  E: { firstNote: "E", isFlatKey: false, unifiedName: "E / C#m" },
  B: { firstNote: "B", isFlatKey: false, unifiedName: "B / G#m" },
  Fsharp: { firstNote: "F#", isFlatKey: false, unifiedName: "F# / D#m" },
  F: { firstNote: "F", isFlatKey: true, unifiedName: "F / Dm" },
  Bb: { firstNote: "Bb", isFlatKey: true, unifiedName: "Bb / Gm" },
  Eb: { firstNote: "Eb", isFlatKey: true, unifiedName: "Eb / Cm" },
  Ab: { firstNote: "Ab", isFlatKey: true, unifiedName: "Ab / Fm" },
  Db: { firstNote: "Db", isFlatKey: true, unifiedName: "Db / Bbm" },
  Gb: { firstNote: "Gb", isFlatKey: true, unifiedName: "Gb / Ebm" },
} as const;

export type MusicKeyId = keyof typeof MUSIC_KEYS;
