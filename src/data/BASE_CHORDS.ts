import type { ScaleSemitoneTemplateDataKey } from "./SCALE_SEMITONE_TEMPLATES";

export type BaseChordDataKey = keyof typeof BASE_CHORDS;
export interface BaseChord {
  roleName: string;
  roleShortName: string;
  baseScaleName: string;
  baseScaleDataKey: ScaleSemitoneTemplateDataKey;
  semitoneOffsetFromMajorRoot: number;
  modeExtendedName: string;
  CAGEDchordShape: string;
}

export const BASE_CHORDS = {
  BaseChord1: {
    roleName: "Major BaseChord1",
    roleShortName: "T",
    baseScaleName: "Ionian",
    baseScaleDataKey: "ionianScale",
    semitoneOffsetFromMajorRoot: 0,
    modeExtendedName: "M7",
    CAGEDchordShape: "major",
  },
  BaseChord2: {
    roleName: "Minor BaseChord4nant",
    roleShortName: "s",
    baseScaleName: "Dorian",
    baseScaleDataKey: "dorianScale",
    semitoneOffsetFromMajorRoot: 2,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
  },
  BaseChord3: {
    roleName: "Mediant",
    roleShortName: "m",
    baseScaleName: "Phrygian",
    baseScaleDataKey: "phrygianScale",
    semitoneOffsetFromMajorRoot: 4,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
  },
  BaseChord3Ph: {
    roleName: "BaseChord5nant (Phrygian)",
    roleShortName: "DPh",
    baseScaleName: "Phrygian BaseChord5nant",
    baseScaleDataKey: "phrygianBaseChord5nantScale",
    semitoneOffsetFromMajorRoot: 4,
    modeExtendedName: "7",
    CAGEDchordShape: "major",
  },
  BaseChord4: {
    roleName: "Major BaseChord4nant",
    roleShortName: "S",
    baseScaleName: "Lydian",
    baseScaleDataKey: "lydianScale",
    semitoneOffsetFromMajorRoot: 5,
    modeExtendedName: "M7",
    CAGEDchordShape: "major",
  },
  BaseChord5: {
    roleName: "BaseChord5nant",
    roleShortName: "D",
    baseScaleName: "Mixolydian",
    baseScaleDataKey: "mixolydianScale",
    semitoneOffsetFromMajorRoot: 7,
    modeExtendedName: "7",
    CAGEDchordShape: "major",
  },
  BaseChord6: {
    roleName: "Minor BaseChord1",
    roleShortName: "t",
    baseScaleName: "Aeolian",
    baseScaleDataKey: "aeolianScale",
    semitoneOffsetFromMajorRoot: 9,
    modeExtendedName: "m7",
    CAGEDchordShape: "minor",
  },
  BaseChord7: {
    roleName: "Minor Sub. (Half Dim.)",
    roleShortName: "h-dim",
    baseScaleName: "Locrian",
    baseScaleDataKey: "locrianScale",
    semitoneOffsetFromMajorRoot: 11,
    modeExtendedName: "m7b5",
    CAGEDchordShape: "BaseChord7",
  },
};
