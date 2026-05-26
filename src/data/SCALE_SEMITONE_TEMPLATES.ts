import {
  _1,
  _4,
  _5,
  _m2,
  _M2,
  _m3,
  _M3,
  _m6,
  _M6,
  _m7,
  _M7,
  _T,
} from "./INTERVAL_SEMITONES";

type SemitoneScale = {
  template: number[];
  perfectConsonances: number[];
  guideTones: number[];
  color: number[];
  avoidNotes: number[];
};

export const SCALE_SEMITONE_TEMPLATES = {
  lydianScale: {
    template: [_1, _M2, _M3, _T, _5, _M6, _M7],
    perfectConsonances: [_1, _5],
    guideTones: [_M3, _M7],
    color: [_M2, _T, _M6],
    avoidNotes: [],
  },
  ionianScale: {
    template: [_1, _M2, _M3, _4, _5, _M6, _M7],
    perfectConsonances: [_1, _5],
    guideTones: [_M3, _M7],
    color: [_M2, _M6],
    avoidNotes: [_4],
  },
  mixolydianScale: {
    template: [_1, _M2, _M3, _4, _5, _M6, _m7],
    perfectConsonances: [_1, _5],
    guideTones: [_M3, _m7],
    color: [_M2, _M6],
    avoidNotes: [_4],
  },
  dorianScale: {
    template: [_1, _M2, _m3, _4, _5, _M6, _m7],
    perfectConsonances: [_1, _5],
    guideTones: [_m3, _m7],
    color: [_M2, _4],
    avoidNotes: [_M6],
  },
  aeolianScale: {
    template: [_1, _M2, _m3, _4, _5, _m6, _m7],
    perfectConsonances: [_1, _5],
    guideTones: [_m3, _m7],
    color: [_M2, _4],
    avoidNotes: [_m6],
  },
  phrygianScale: {
    template: [_1, _m2, _m3, _4, _5, _m6, _m7],
    perfectConsonances: [_1, _5],
    guideTones: [_m3, _m7],
    color: [_4],
    avoidNotes: [_m2, _m6],
  },
  phrygianDominantScale: {
    template: [_1, _m2, _M3, _4, _5, _m6, _m7],
    perfectConsonances: [_1, _5],
    guideTones: [_M3, _m7],
    color: [_m2, _m6],
    avoidNotes: [_4],
  },
  locrianScale: {
    template: [_1, _m2, _m3, _4, _T, _m6, _m7],
    perfectConsonances: [_1],
    guideTones: [_m3, _m7],
    color: [_4, _T, _m6],
    avoidNotes: [_m2],
  },
  locrianScalePh: {
    template: [_1, _m2, _m3, _4, _T, _M6, _m7],
    perfectConsonances: [_1],
    guideTones: [_m3, _m7],
    color: [_4, _T, _M6],
    avoidNotes: [_m2],
  },
} as const satisfies Record<string, SemitoneScale>;

export type ScaleSemitoneTemplateDataKey =
  keyof typeof SCALE_SEMITONE_TEMPLATES;
