import { _1, _4, _5, _M2, _m3, _M3, _m6, _M6, _m7, _M7 } from "./intervals";

type SemitoneScale = number[];

export const majorScale: SemitoneScale = [_1, _M2, _M3, _4, _5, _M6, _M7];
export const minorScale: SemitoneScale = [_1, _M2, _m3, _4, _5, _m6, _m7];
export const harmonicMinorScale: SemitoneScale = [
  _1,
  _M2,
  _m3,
  _4,
  _5,
  _m6,
  _M7,
];

export const semitoneTemplates: Record<string, SemitoneScale> = {
  ionianScale: [_1, _M2, _M3, _4, _5, _M6, _M7],
  dorianScale: [_1, _M2, _M3, _4, _5, _M6, _M7],
  phrygianScale: [_1, _M2, _M3, _4, _5, _M6, _M7],
  phrygianDominantScale: [_1, _M2, _M3, _4, _5, _M6, _M7],
  lydianScale: [_1, _M2, _M3, _4, _5, _M6, _M7],
  mixolydianScale: [_1, _M2, _M3, _4, _5, _M6, _M7],
  aeolianScale: [_1, _M2, _M3, _4, _5, _M6, _M7],
} as const;

export type SemitoneTemplateKey = keyof typeof semitoneTemplates;
