export interface IntervalInfo {
  readonly semitones: number;
  readonly unifiedName: string;
}

export const INTERVALS = {
  _1: { semitones: 0, unifiedName: "1" },
  _m2: { semitones: 1, unifiedName: "m2" },
  _M2: { semitones: 2, unifiedName: "M2" },
  _m3: { semitones: 3, unifiedName: "m3" },
  _M3: { semitones: 4, unifiedName: "M3" },
  _4: { semitones: 5, unifiedName: "4" },
  _T: { semitones: 6, unifiedName: "T" },
  _5: { semitones: 7, unifiedName: "5" },
  _m6: { semitones: 8, unifiedName: "m6" },
  _M6: { semitones: 9, unifiedName: "M6" },
  _m7: { semitones: 10, unifiedName: "m7" },
  _M7: { semitones: 11, unifiedName: "M7" },
  _8: { semitones: 12, unifiedName: "8" },
  _m9: { semitones: 13, unifiedName: "m9" },
  _M9: { semitones: 14, unifiedName: "M9" },
  _m10: { semitones: 15, unifiedName: "m10" },
  _M10: { semitones: 16, unifiedName: "M10" },
  _11: { semitones: 17, unifiedName: "11" },
  _TT: { semitones: 18, unifiedName: "TT" },
  _12: { semitones: 19, unifiedName: "12" },
  _m13: { semitones: 20, unifiedName: "m13" },
  _M13: { semitones: 21, unifiedName: "M13" },
  _m14: { semitones: 22, unifiedName: "m14" },
  _M14: { semitones: 23, unifiedName: "M14" },
} as const;

export const getSemitones = (keys: IntervalKey[]): number[] =>
  keys.map((key) => INTERVALS[key].semitones);

export const getSemitonesMap = () => {
  return Object.fromEntries(
    Object.entries(INTERVALS).map(([key, value]) => [key, value.semitones])
  ) as { [K in keyof typeof INTERVALS]: number };
};

export type IntervalKey = keyof typeof INTERVALS;
