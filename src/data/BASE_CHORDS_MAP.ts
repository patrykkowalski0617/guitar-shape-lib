import type { RoleId } from "./roles";

export type BaseChordId = keyof typeof BASE_CHORDS_MAP;

export interface BaseChordValue {
  role: RoleId;
  baseScale: string;
  isMajorMode: boolean;
  semitoneOffsetFromMajorScaleRoot: number;
}

export const BASE_CHORDS_MAP = {
  Tonic: {
    role: "tonic",
    baseScale: "Ionian",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 0,
  },
  subdomi: {
    role: "subdominant",
    baseScale: "Dorian",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 2,
  },
  DomiPh: {
    role: "dominant",
    baseScale: "Phrygian Dominant",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 4,
  },
  mediant: {
    role: "mediant",
    baseScale: "Phrygian",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 4,
  },
  Subdomi: {
    role: "subdominant",
    baseScale: "Lydian",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 5,
  },
  Domi: {
    role: "dominant",
    baseScale: "Mixolydian",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 7,
  },
  tonic: {
    role: "tonic",
    baseScale: "Aeolian",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 9,
  },
} as const satisfies Record<string, BaseChordValue>;
