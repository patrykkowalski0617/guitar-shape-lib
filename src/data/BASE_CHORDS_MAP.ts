import type { RoleId } from "./roles";

export type BaseChordId = keyof typeof BASE_CHORDS_MAP;

export interface BaseChordValue {
  role: RoleId;
  isMajorMode: boolean;
  semitoneOffsetFromC: number;
}

export const BASE_CHORDS_MAP = {
  Tonic: {
    role: "tonic",
    isMajorMode: true,
    semitoneOffsetFromC: 0,
  },
  subdomi: {
    role: "subdominant",
    isMajorMode: false,
    semitoneOffsetFromC: 2,
  },
  DomiPh: {
    role: "dominant",
    isMajorMode: true,
    semitoneOffsetFromC: 4,
  },
  mediant: {
    role: "mediant",
    isMajorMode: false,
    semitoneOffsetFromC: 4,
  },
  Subdomi: {
    role: "subdominant",
    isMajorMode: true,
    semitoneOffsetFromC: 5,
  },
  Domi: {
    role: "dominant",
    isMajorMode: true,
    semitoneOffsetFromC: 7,
  },
  tonic: {
    role: "tonic",
    isMajorMode: false,
    semitoneOffsetFromC: 9,
  },
} as const satisfies Record<string, BaseChordValue>;
