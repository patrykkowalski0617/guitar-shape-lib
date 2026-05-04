import type { SemitoneTemplateKey } from "./SCALE_SEMITONE_TEMPLATES";

export type BaseChordId = keyof typeof BASE_CHORDS;

export type RoleId = "tonic" | "subdominant" | "mediant" | "dominant";

export interface BaseChordValue {
  role: RoleId;
  baseScaleName: string;
  baseScaleId: SemitoneTemplateKey;
  isMajorMode: boolean;
  semitoneOffsetFromMajorScaleRoot: number;
  modeExtendedName: string;
  CAGEDchordShape: string;
}

export const BASE_CHORDS = {
  Tonic: {
    role: "tonic",
    baseScaleName: "Ionian",
    baseScaleId: "ionianScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 0,
    modeExtendedName: "M7",
    CAGEDchordShape: "major",
  },
  subdomi: {
    role: "subdominant",
    baseScaleName: "Dorian",
    baseScaleId: "dorianScale",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 2,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
  },
  mediant: {
    role: "mediant",
    baseScaleName: "Phrygian",
    baseScaleId: "phrygianScale",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 4,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
  },
  DomiPh: {
    role: "dominant",
    baseScaleName: "Phrygian Dominant",
    baseScaleId: "phrygianDominantScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 4,
    modeExtendedName: "7",
    CAGEDchordShape: "major",
  },
  Subdomi: {
    role: "subdominant",
    baseScaleName: "Lydian",
    baseScaleId: "lydianScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 5,
    modeExtendedName: "M7",
    CAGEDchordShape: "major",
  },
  Domi: {
    role: "dominant",
    baseScaleName: "Mixolydian",
    baseScaleId: "mixolydianScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 7,
    modeExtendedName: "7",
    CAGEDchordShape: "major",
  },
  tonic: {
    role: "tonic",
    baseScaleName: "Aeolian",
    baseScaleId: "aeolianScale",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 9,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
  },
  halfDim: {
    role: "subdominant",
    baseScaleName: "Locrian",
    baseScaleId: "locrianScale",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 11,
    modeExtendedName: "m7b5",
    CAGEDchordShape: "halfDim",
  },
} as const satisfies Record<string, BaseChordValue>;
