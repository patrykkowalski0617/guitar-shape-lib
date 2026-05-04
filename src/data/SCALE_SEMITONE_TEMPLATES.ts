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

type SemitoneScale = number[];

export const SCALE_SEMITONE_TEMPLATES: Record<string, SemitoneScale> = {
  lydianScale: [_1, _M2, _M3, _T, _5, _M6, _M7],
  ionianScale: [_1, _M2, _M3, _4, _5, _M6, _M7],
  mixolydianScale: [_1, _M2, _M3, _4, _5, _M6, _m7],
  dorianScale: [_1, _M2, _m3, _4, _5, _M6, _m7],
  aeolianScale: [_1, _M2, _m3, _4, _5, _m6, _m7],
  phrygianScale: [_1, _m2, _m3, _4, _5, _m6, _m7],
  phrygianDominantScale: [_1, _m2, _M3, _4, _5, _m6, _m7],
  locrianScale: [_1, _m2, _m3, _4, _T, _m6, _m7],
} as const;

export type SemitoneTemplateKey = keyof typeof SCALE_SEMITONE_TEMPLATES;
