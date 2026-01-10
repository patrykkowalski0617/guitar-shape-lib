// src/constants/musicKeys.ts
import { type Note } from "@/utils";

export interface MusicKeyInfo {
  readonly firstNote: Note;
  readonly isFlatKey: boolean;
  readonly unifiedName: string;
}

export const UNIFIED_MUSIC_KEYS = {
  C: { firstNote: "C", isFlatKey: false, unifiedName: "C / Am" },
  Db: { firstNote: "Db", isFlatKey: true, unifiedName: "Db / Bbm" },
  D: { firstNote: "D", isFlatKey: false, unifiedName: "D / Bm" },
  Eb: { firstNote: "Eb", isFlatKey: true, unifiedName: "Eb / Cm" },
  E: { firstNote: "E", isFlatKey: false, unifiedName: "E / C#m" },
  F: { firstNote: "F", isFlatKey: true, unifiedName: "F / Dm" },
  Fsharp: { firstNote: "F#", isFlatKey: false, unifiedName: "F# / D#m" },
  G: { firstNote: "G", isFlatKey: false, unifiedName: "G / Em" },
  Ab: { firstNote: "Ab", isFlatKey: true, unifiedName: "Ab / Fm" },
  A: { firstNote: "A", isFlatKey: false, unifiedName: "A / F#m" },
  B: { firstNote: "B", isFlatKey: false, unifiedName: "B / G#m" },
  Bb: { firstNote: "Bb", isFlatKey: true, unifiedName: "Bb / Gm" },
} as const;

export type MusicKeyId = keyof typeof UNIFIED_MUSIC_KEYS;
