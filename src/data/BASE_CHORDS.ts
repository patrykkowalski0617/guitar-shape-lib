import type { SemitoneTemplateKey } from "./SCALE_SEMITONE_TEMPLATES";

export type BaseChordId = keyof typeof BASE_CHORDS;
export interface BaseChordValue {
  roleName: string;
  roleShortName: string;
  baseScaleName: string;
  baseScaleId: SemitoneTemplateKey;
  semitoneOffsetFromMajorScaleRoot: number;
  modeExtendedName: string;
  CAGEDchordShape: string;
}

export const BASE_CHORDS = {
  Tonic: {
    roleName: "Major Tonic",
    roleShortName: "T",
    baseScaleName: "Ionian",
    baseScaleId: "ionianScale",
    semitoneOffsetFromMajorScaleRoot: 0,
    modeExtendedName: "M7",
    CAGEDchordShape: "major",
  },
  subdomi: {
    roleName: "Minor Subdominant",
    roleShortName: "s",
    baseScaleName: "Dorian",
    baseScaleId: "dorianScale",
    semitoneOffsetFromMajorScaleRoot: 2,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
  },
  mediant: {
    roleName: "Mediant",
    roleShortName: "m",
    baseScaleName: "Phrygian",
    baseScaleId: "phrygianScale",
    semitoneOffsetFromMajorScaleRoot: 4,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
  },
  DomiPh: {
    roleName: "Dominant (Phrygian)",
    roleShortName: "DPh",
    baseScaleName: "Phrygian Dominant",
    baseScaleId: "phrygianDominantScale",
    semitoneOffsetFromMajorScaleRoot: 4,
    modeExtendedName: "7",
    CAGEDchordShape: "major",
  },
  Subdomi: {
    roleName: "Major Subdominant",
    roleShortName: "S",
    baseScaleName: "Lydian",
    baseScaleId: "lydianScale",
    semitoneOffsetFromMajorScaleRoot: 5,
    modeExtendedName: "M7",
    CAGEDchordShape: "major",
  },
  Domi: {
    roleName: "Dominant",
    roleShortName: "D",
    baseScaleName: "Mixolydian",
    baseScaleId: "mixolydianScale",
    semitoneOffsetFromMajorScaleRoot: 7,
    modeExtendedName: "7",
    CAGEDchordShape: "major",
  },
  tonic: {
    roleName: "Minor Tonic",
    roleShortName: "t",
    baseScaleName: "Aeolian",
    baseScaleId: "aeolianScale",
    semitoneOffsetFromMajorScaleRoot: 9,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
  },
  halfDim: {
    roleName: "Minor Sub. (Half Dim.)",
    roleShortName: "h-dim",
    baseScaleName: "Locrian",
    baseScaleId: "locrianScale",
    semitoneOffsetFromMajorScaleRoot: 11,
    modeExtendedName: "m7b5",
    CAGEDchordShape: "halfDim",
  },
} as const satisfies Record<string, BaseChordValue>;
