import type { RoleId } from "./roles";
import type { SemitoneTemplateKey } from "./scalesSemitoneTemplates";

export type BaseChordId = keyof typeof BASE_CHORDS_MAP;

export interface BaseChordValue {
  role: RoleId;
  baseScaleName: string;
  baseScaleId: SemitoneTemplateKey;
  isMajorMode: boolean;
  semitoneOffsetFromMajorScaleRoot: number;
}

export const BASE_CHORDS_MAP = {
  Tonic: {
    role: "tonic",
    baseScaleName: "Ionian",
    baseScaleId: "ionianScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 0,
  },
  subdomi: {
    role: "subdominant",
    baseScaleName: "Dorian",
    baseScaleId: "dorianScale",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 2,
  },
  mediant: {
    role: "mediant",
    baseScaleName: "Phrygian",
    baseScaleId: "phrygianScale",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 4,
  },
  DomiPh: {
    role: "dominant",
    baseScaleName: "Phrygian Dominant",
    baseScaleId: "phrygianDominantScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 4,
  },
  Subdomi: {
    role: "subdominant",
    baseScaleName: "Lydian",
    baseScaleId: "lydianScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 5,
  },
  Domi: {
    role: "dominant",
    baseScaleName: "Mixolydian",
    baseScaleId: "mixolydianScale",
    isMajorMode: true,
    semitoneOffsetFromMajorScaleRoot: 7,
  },
  tonic: {
    role: "tonic",
    baseScaleName: "Aeolian",
    baseScaleId: "aeolianScale",
    isMajorMode: false,
    semitoneOffsetFromMajorScaleRoot: 9,
  },
} as const satisfies Record<string, BaseChordValue>;
