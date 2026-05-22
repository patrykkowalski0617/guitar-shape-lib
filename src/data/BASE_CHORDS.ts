import type { ScaleSemitoneTemplateDataKey } from "./SCALE_SEMITONE_TEMPLATES";

export type BaseChordDataKey = keyof typeof BASE_CHORDS;

export type RoleNumName = "I" | "II" | "III" | "IV" | "V" | "VI" | "VII";
export interface BaseChord {
  roleName: string;
  roleShortName: string;
  baseScaleName: string;
  baseScaleDataKey: ScaleSemitoneTemplateDataKey;
  semitoneOffsetFromMajorRoot: number;
  modeExtendedName: string;
  CAGEDchordShape: string;
  majorRoleNumName: RoleNumName;
  minorRoleNumName: RoleNumName;
}

export const BASE_CHORDS = {
  BaseChord1: {
    roleName: "Major Tonic",
    roleShortName: "T",
    baseScaleName: "Ionian",
    baseScaleDataKey: "ionianScale",
    semitoneOffsetFromMajorRoot: 0,
    modeExtendedName: "M7",
    CAGEDchordShape: "major",
    majorRoleNumName: "I",
    minorRoleNumName: "III",
  },
  BaseChord2: {
    roleName: "Minor Dominant",
    roleShortName: "s",
    baseScaleName: "Dorian",
    baseScaleDataKey: "dorianScale",
    semitoneOffsetFromMajorRoot: 2,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
    majorRoleNumName: "II",
    minorRoleNumName: "IV",
  },
  BaseChord3: {
    roleName: "Mediant",
    roleShortName: "m",
    baseScaleName: "Phrygian",
    baseScaleDataKey: "phrygianScale",
    semitoneOffsetFromMajorRoot: 4,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
    majorRoleNumName: "III",
    minorRoleNumName: "V",
  },
  BaseChord3Ph: {
    roleName: "Dominant (Phrygian)",
    roleShortName: "DPh",
    baseScaleName: "Phrygian Dominant",
    baseScaleDataKey: "phrygianDominantScale",
    semitoneOffsetFromMajorRoot: 4,
    modeExtendedName: "7",
    CAGEDchordShape: "major",
    majorRoleNumName: "V",
    minorRoleNumName: "V",
  },
  BaseChord4: {
    roleName: "Major Dominant",
    roleShortName: "S",
    baseScaleName: "Lydian",
    baseScaleDataKey: "lydianScale",
    semitoneOffsetFromMajorRoot: 5,
    modeExtendedName: "M7",
    CAGEDchordShape: "major",
    majorRoleNumName: "IV",
    minorRoleNumName: "VI",
  },
  BaseChord5: {
    roleName: "Dominant",
    roleShortName: "D",
    baseScaleName: "Mixolydian",
    baseScaleDataKey: "mixolydianScale",
    semitoneOffsetFromMajorRoot: 7,
    modeExtendedName: "7",
    CAGEDchordShape: "major",
    majorRoleNumName: "V",
    minorRoleNumName: "VII",
  },
  BaseChord6: {
    roleName: "Minor Tonic",
    roleShortName: "t",
    baseScaleName: "Aeolian",
    baseScaleDataKey: "aeolianScale",
    semitoneOffsetFromMajorRoot: 9,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
    majorRoleNumName: "VI",
    minorRoleNumName: "VI",
  },
  BaseChord7: {
    roleName: "Minor Sub. (Half Dim.)",
    roleShortName: "h-dim",
    baseScaleName: "Locrian",
    baseScaleDataKey: "locrianScale",
    semitoneOffsetFromMajorRoot: 11,
    modeExtendedName: "m7b5",
    CAGEDchordShape: "BaseChord7",
    majorRoleNumName: "VII",
    minorRoleNumName: "II",
  },
} satisfies Record<string, BaseChord>;
