import type { SemitoneTemplateKey } from "./SCALE_SEMITONE_TEMPLATES";

export type BaseChordId = keyof typeof BASE_CHORDS;

export type RoleId =
  | "tonic"
  | "subdominant"
  | "mediant"
  | "dominant"
  | "subdominant"
  | "dominant"
  | "tonic";

export interface BaseChordValue {
  role: RoleId;
  baseScaleName: string;
  baseScaleId: SemitoneTemplateKey;
  isMajorMode: boolean;
  semitoneOffsetFromMajorScaleRoot: number;
  modeExtendedName: "M7" | "7";
}

export const BASE_CHORDS = {
  Tonic: {
    role: "tonic",
    baseScaleName: "Ionian",
    baseScaleId: "ionianScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 0,
    modeExtendedName: "M7",
  },
  subdomi: {
    role: "subdominant",
    baseScaleName: "Dorian",
    baseScaleId: "dorianScale",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 2,
    modeExtendedName: "7",
  },
  mediant: {
    role: "mediant",
    baseScaleName: "Phrygian",
    baseScaleId: "phrygianScale",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 4,
    modeExtendedName: "7",
  },
  DomiPh: {
    role: "dominant",
    baseScaleName: "Phrygian Dominant",
    baseScaleId: "phrygianDominantScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 4,
    modeExtendedName: "7",
  },
  Subdomi: {
    role: "subdominant",
    baseScaleName: "Lydian",
    baseScaleId: "lydianScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 5,
    modeExtendedName: "M7",
  },
  Domi: {
    role: "dominant",
    baseScaleName: "Mixolydian",
    baseScaleId: "mixolydianScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 7,
    modeExtendedName: "7",
  },
  tonic: {
    role: "tonic",
    baseScaleName: "Aeolian",
    baseScaleId: "aeolianScale",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 9,
    modeExtendedName: "7",
  },
} as const satisfies Record<string, BaseChordValue>;
