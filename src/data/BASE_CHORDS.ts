import type { ScaleSemitoneTemplateDataKey } from "./SCALE_SEMITONE_TEMPLATES";

export type BaseChordDataKey = keyof typeof BASE_CHORDS;

export type MajorRoleNumName =
  | "I"
  | "ii"
  | "iii"
  | "IV"
  | "V"
  | "vi"
  | "vii"
  | "viio";
export type MinorRoleNumName =
  | "III"
  | "iv"
  | "V"
  | "VI"
  | "VII"
  | "i"
  | "ii"
  | "iio";

export type RoleNumName = MajorRoleNumName | MinorRoleNumName;
export interface BaseChord {
  baseScaleName: string;
  baseScaleDataKey: ScaleSemitoneTemplateDataKey;
  semitoneOffsetFromMajorRoot: number;
  modeExtendedName: string;
  CAGEDchordShape: string;
  majorRoleNumName?: MajorRoleNumName;
  minorRoleNumName?: MinorRoleNumName;
}

export const BASE_CHORDS = {
  BaseChord1: {
    baseScaleName: "Ionian",
    baseScaleDataKey: "ionianScale",
    semitoneOffsetFromMajorRoot: 0,
    modeExtendedName: "M7",
    CAGEDchordShape: "major",
    majorRoleNumName: "I",
    minorRoleNumName: "III",
  },
  BaseChord2: {
    baseScaleName: "Dorian",
    baseScaleDataKey: "dorianScale",
    semitoneOffsetFromMajorRoot: 2,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
    majorRoleNumName: "ii",
    minorRoleNumName: "iv",
  },
  BaseChord3: {
    baseScaleName: "Phrygian",
    baseScaleDataKey: "phrygianScale",
    semitoneOffsetFromMajorRoot: 4,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
    majorRoleNumName: "iii",
  },
  BaseChord3Ph: {
    baseScaleName: "Phrygian Dominant",
    baseScaleDataKey: "phrygianDominantScale",
    semitoneOffsetFromMajorRoot: 4,
    modeExtendedName: "7",
    CAGEDchordShape: "major",
    minorRoleNumName: "V",
  },
  BaseChord4: {
    baseScaleName: "Lydian",
    baseScaleDataKey: "lydianScale",
    semitoneOffsetFromMajorRoot: 5,
    modeExtendedName: "M7",
    CAGEDchordShape: "major",
    majorRoleNumName: "IV",
    minorRoleNumName: "VI",
  },
  BaseChord5: {
    baseScaleName: "Mixolydian",
    baseScaleDataKey: "mixolydianScale",
    semitoneOffsetFromMajorRoot: 7,
    modeExtendedName: "7",
    CAGEDchordShape: "major",
    majorRoleNumName: "V",
    minorRoleNumName: "VII",
  },
  BaseChord6: {
    baseScaleName: "Aeolian",
    baseScaleDataKey: "aeolianScale",
    semitoneOffsetFromMajorRoot: 9,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
    majorRoleNumName: "vi",
    minorRoleNumName: "i",
  },
  BaseChord7: {
    baseScaleName: "Locrian",
    baseScaleDataKey: "locrianScale",
    semitoneOffsetFromMajorRoot: 11,
    modeExtendedName: "m7b5",
    CAGEDchordShape: "BaseChord7",
    majorRoleNumName: "vii",
    minorRoleNumName: "ii",
  },
  BaseChord7dim: {
    baseScaleName: "Locrian",
    baseScaleDataKey: "locrianScalePh",
    semitoneOffsetFromMajorRoot: 11,
    modeExtendedName: "dim",
    CAGEDchordShape: "BaseChord7dim",
    majorRoleNumName: "viio",
    minorRoleNumName: "iio",
  },
} satisfies Record<string, BaseChord>;
