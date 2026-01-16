import { getSemitonesMap } from "./intervals";

export const {
  _1,
  _m2,
  _M2,
  _m3,
  _M3,
  _4,
  _T,
  _5,
  _m6,
  _M6,
  _m7,
  _M7,
  _8,
  _m9,
  _M9,
  _m10,
  _M10,
  _11,
  _TT,
  _12,
  _m13,
  _M13,
  _m14,
  _M14,
} = getSemitonesMap();

export type ShapeType = "Arpegio" | "Scale" | "Note Set";

export interface SemitoneOffsetFromMajorTonicRoot {
  majorMode?: number[];
  minorMode?: number[];
  bothModes?: number[];
}

export interface Variants {
  targetStringIndex: number;
  shape: number[][];
}

export interface Shape {
  label: string;
  type: ShapeType;
  intervals: number[];
  semitoneOffsetFromMajorTonicRoot: {
    tonic?: SemitoneOffsetFromMajorTonicRoot;
    subdominant?: SemitoneOffsetFromMajorTonicRoot;
    dominant?: SemitoneOffsetFromMajorTonicRoot;
  };
  variants: { [key: string]: Variants };
}

export interface Shapes {
  [key: string]: Shape;
}

const shapes: Shapes = {
  M7: {
    label: "M7",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _M7],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { bothModes: [_1] },
      subdominant: { bothModes: [_4] },
    },
    variants: {
      M7_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[5, 0],[5, 1],[5, 2],[5, 3]],
      },
    },
  },
  M_add9: {
    label: "M(add9)",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _M9],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { bothModes: [_1] },
      subdominant: { bothModes: [_4] },
    },
    variants: {
      M_add9_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[3,7],[5,24],[5,26],[5,16]],
      },

      M_add9_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[3,7],[5,24],[5,26],[5,16]],
      },
      M_add9_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[3,7],[5,24],[5,26],[5,16]],
      },
      M_add9_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[4,19],[5,24],[5,26],[5,16]],
      },
      M_add9_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[4,19],[5,24],[5,26],[5,16]],
      },
      M_add9_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[4,19],[5,24],[5,26],[5,16]],
      },
      M_add9_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      M_add9_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      M_add9_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      M_add9_15a: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,-10],[1,4],[2,7],[3,12],[3,14],[3,4]],
      },

      M_add9_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      M_add9_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      M_add9_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      M_add9_19: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
      M_add9_20: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
      M_add9_21: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
      M_add9_22: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
      M_add9_23: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
      M_add9_24: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
    },
  },
  M9: {
    label: "M9",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _M7, _M9],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { bothModes: [_1] },
      subdominant: { bothModes: [_4] },
    },
    variants: {
      M9_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,11],[2,12],[2,2],[3,16],[4,19],[4,11],[5,24],[5,26],[5,16]],
      },
      M9_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,11],[2,12],[2,2],[3,16],[4,19],[4,11],[5,24],[5,26],[5,16]],
      },
      M9_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,11],[2,12],[2,2],[3,16],[4,19],[4,11],[5,24],[5,26],[5,16]],
      },
      M9_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,11],[2,12],[2,2],[3,16],[4,19],[4,11],[5,24],[5,26],[5,16]],
      },
      M9_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      M9_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      M9_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      M9_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      M9_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      M9_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      M9_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,11],[3,12],[3,14],[3,16],[4,19],[5,23],[5,24]],
      },
      M9_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,11],[3,12],[3,14],[3,16],[4,19],[5,23],[5,24]],
      },
      M9_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,11],[3,12],[3,14],[3,16],[4,19],[5,23],[5,24]],
      },
      M9_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,11],[3,12],[3,14],[3,16],[4,19],[5,23],[5,24]],
      },
      M9_19: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,11],[3,12],[3,14],[4,16],[4,19],[5,23],[5,24]],
      },
      M9_20: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,11],[3,12],[3,14],[4,16],[4,19],[5,23],[5,24]],
      },
      M9_21: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,11],[3,12],[3,14],[4,16],[4,19],[5,23],[5,24]],
      },
      M9_24: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,11],[3,12],[3,14],[4,16],[4,19],[5,23],[5,24]],
      },
    },
  },
  dominant: {
    label: "7",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: { majorMode: [_5], minorMode: [_M3] },
    },
    variants: {
      dominant_10: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      dominant_11: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      dominant_12: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      dominant_13: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      dominant_14: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      dominant_15: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      dominant_17: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      dominant_18: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      dominant_19: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      dominant_20: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      dominant_22: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24]],
      },
      dominant_28: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[5,22],[5,24]],
      },
      dominant_29: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[5,22],[5,24]],
      },
      dominant_34: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[3,16],[4,19],[5,22],[5,24]],
      },
      dominant_36: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[3,16],[4,19],[5,22],[5,24]],
      },
      dominant_37: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[3,16],[4,19],[5,22],[5,24]],
      },
      dominant_38: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[3,16],[4,19],[5,22],[5,24]],
      },
      dominant_40: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[4,16],[4,19],[5,22],[5,24]],
      },
      dominant_41: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[4,16],[4,19],[5,22],[5,24]],
      },
    },
  },
  "7b9": {
    label: "7b9",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _m7, _m9],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: { minorMode: [_M3], majorMode: [_5] },
    },
    variants: {
      "7b9_7": {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      "7b9_8": {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      "7b9_9": {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      "7b9_10": {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      "7b9_11": {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      "7b9_12": {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      "7b9_13": {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_14": {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_15": {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_16": {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_17": {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_18": {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_19": {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_20": {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_21": {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_22": {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_23": {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_24": {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      "7b9_25": {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      "7b9_26": {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      "7b9_27": {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      "7b9_28": {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      "7b9_29": {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      "7b9_30": {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      "7b9_31": {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
      "7b9_32": {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
      "7b9_33": {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
      "7b9_34": {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
      "7b9_35": {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
      "7b9_36": {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
    },
  },
  m7b5: {
    label: "m7b5",
    type: "Arpegio",
    intervals: [_1, _m3, _T, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: { bothModes: [_M7] },
    },
    variants: {
      m7b5_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[3,18],[4,22],[5,24],[5,27]],
      },
      m7b5_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[4,18],[4,22]],
      },
      m7b5_3: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[3,18],[4,22],[5,24],[5,27]],
      },
      m7b5_4: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[3,18],[4,22],[5,24],[5,27]],
      },
      m7b5_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[3,18],[4,22],[5,24],[5,27]],
      },
      m7b5_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[3,18],[4,22],[5,24],[5,27]],
      },
      m7b5_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      m7b5_19: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
      m7b5_20: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
      m7b5_21: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
      m7b5_22: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
      m7b5_23: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
      m7b5_24: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
    },
  },
  dim7: {
    label: "dim7",
    type: "Arpegio",
    intervals: [_1, _m3, _T, _M6],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: { bothModes: [_M7] },
    },
    variants: {
      dim7_10: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      dim7_11: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      dim7_12: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      dim7_13: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      dim7_14: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      dim7_15: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      dim7_16: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      dim7_17: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      dim7_18: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      dim7_19: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      dim7_20: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      dim7_22: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      dim7_24: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      dim7_25: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      dim7_26: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      dim7_28: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[4,15],[4,18],[5,21]],
      },
      dim7_29: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[4,15],[4,18],[5,21]],
      },
      dim7_30: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[4,15],[4,18],[5,21]],
      },
      dim7_31: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[4,15],[4,18],[5,21]],
      },
    },
  },
  m7: {
    label: "m7",
    type: "Arpegio",
    intervals: [_1, _m3, _5, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { bothModes: [_M3, _M6] },
      subdominant: { bothModes: [_M2, _M6] },
    },
    variants: {
      m7_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      m7_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      m7_3: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      m7_4: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      m7_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      m7_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      m7_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      m7_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      m7_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      m7_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      m7_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      m7_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      m7_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
      m7_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
      m7_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
      m7_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
      m7_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
      m7_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
    },
  },
  m_add9: {
    label: "m(add9)",
    type: "Arpegio",
    intervals: [_1, _m3, _5, _M9],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: {
        bothModes: [_M6],
      },
    },
    variants: {
      m_add9_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      m_add9_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      m_add9_3: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      m_add9_4: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      m_add9_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      m_add9_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      m_add9_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      m_add9_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      m_add9_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      m_add9_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      m_add9_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      m_add9_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      m_add9_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
      m_add9_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
      m_add9_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
      m_add9_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
      m_add9_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
      m_add9_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
    },
  },
  minor_pent: {
    label: "Minor Pentatonic",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: {
        bothModes: [_M6, _M3],
      },
      subdominant: { bothModes: [_M2, _M6] },
      dominant: { bothModes: [_M3, _5] },
    },
    variants: {
      minor_pent_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      minor_pent_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      minor_pent_3: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      minor_pent_4: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      minor_pent_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      minor_pent_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      minor_pent_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[5,22],[5,24]],
      },
      minor_pent_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[5,22],[5,24]],
      },
      minor_pent_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[5,22],[5,24]],
      },
      minor_pent_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[5,22],[5,24]],
      },
      minor_pent_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[5,22],[5,24]],
      },
      minor_pent_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
      minor_pent_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
      minor_pent_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
      minor_pent_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
      minor_pent_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
      minor_pent_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
    },
  },
  major_pent: {
    label: "Major Pentatonic",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { bothModes: [_1] },
      subdominant: { bothModes: [_4] },
      dominant: { bothModes: [_5] },
    },
    variants: {
      major_pent_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      major_pent_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      major_pent_3: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      major_pent_4: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      major_pent_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      major_pent_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      major_pent_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      major_pent_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      major_pent_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      major_pent_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      major_pent_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      major_pent_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      major_pent_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
      major_pent_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
      major_pent_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
      major_pent_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
      major_pent_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
      major_pent_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
    },
  },
  no_avoid_notes_t_s_major: {
    label: '"No avoid notes"',
    type: "Note Set",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { bothModes: [_1] },
      subdominant: { bothModes: [_4] },
    },
    variants: {
      no_avoid_notes_t_s_major_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_3: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_4: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      no_avoid_notes_t_s_major_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      no_avoid_notes_t_s_major_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      no_avoid_notes_t_s_major_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      no_avoid_notes_t_s_major_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      no_avoid_notes_t_s_major_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      no_avoid_notes_t_s_major_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      no_avoid_notes_t_s_major_19: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      no_avoid_notes_t_s_major_20: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      no_avoid_notes_t_s_major_21: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      no_avoid_notes_t_s_major_22: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      no_avoid_notes_t_s_major_23: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      no_avoid_notes_t_s_major_24: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      no_avoid_notes_t_s_major_25: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      no_avoid_notes_t_s_major_26: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      no_avoid_notes_t_s_major_27: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      no_avoid_notes_t_s_major_28: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      no_avoid_notes_t_s_major_29: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      no_avoid_notes_t_s_major_30: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
    },
  },
  ionian: {
    label: "Ionian",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { majorMode: [_1] },
    },
    variants: {
      ionian_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      ionian_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      ionian_3: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      ionian_4: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      ionian_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      ionian_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      ionian_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      ionian_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      ionian_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      ionian_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      ionian_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      ionian_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      ionian_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      ionian_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      ionian_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      ionian_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      ionian_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      ionian_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      ionian_19: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      ionian_20: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      ionian_21: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      ionian_22: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      ionian_23: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      ionian_24: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
    },
  },
  aeolian: {
    label: "Aeolian",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { minorMode: [_M6] },
    },
    variants: {
      aeolian_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_3: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_4: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      aeolian_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_19: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_20: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_21: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_22: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_23: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_24: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      aeolian_25: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
      aeolian_26: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
      aeolian_27: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
      aeolian_28: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
      aeolian_29: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
      aeolian_30: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
    },
  },
  dorian: {
    label: "Dorian",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { minorMode: [_M6] },
      subdominant: { majorMode: [_M2] },
    },
    variants: {
      dorian_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      dorian_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      dorian_3: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      dorian_4: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      dorian_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      dorian_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      dorian_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      dorian_19: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      dorian_20: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      dorian_21: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      dorian_22: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      dorian_23: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      dorian_24: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
    },
  },
  lydian: {
    label: "Lydian",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      subdominant: { majorMode: [_4] },
    },
    variants: {
      lydian_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      lydian_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      lydian_3: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      lydian_4: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      lydian_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      lydian_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      lydian_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      lydian_19: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_20: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_21: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_22: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_23: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_24: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_25: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_26: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_27: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_28: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_29: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_30: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      lydian_31: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
      lydian_32: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
      lydian_33: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
      lydian_34: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
      lydian_35: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
      lydian_36: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
    },
  },
  mixolydian: {
    label: "Mixolydian",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: { majorMode: [_5], minorMode: [_M3] },
    },
    variants: {
      mixolydian_1: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      mixolydian_2: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      mixolydian_3: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      mixolydian_4: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      mixolydian_5: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      mixolydian_6: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      mixolydian_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      mixolydian_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      mixolydian_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      mixolydian_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      mixolydian_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      mixolydian_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      mixolydian_13: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      mixolydian_14: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      mixolydian_15: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      mixolydian_16: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      mixolydian_17: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      mixolydian_18: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      "mixolydian_19-checked": {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      mixolydian_20: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      mixolydian_21: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      mixolydian_22: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      mixolydian_23: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      mixolydian_24: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      mixolydian_25: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      mixolydian_26: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      mixolydian_27: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      mixolydian_28: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      mixolydian_29: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      mixolydian_30: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
    },
  },
  phrygian_dominant: {
    label: "Phrygian Dominant",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: {
        minorMode: [_M3],
      },
    },
    variants: {
      phrygian_dominant_7: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      phrygian_dominant_8: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      phrygian_dominant_9: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      phrygian_dominant_10: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      phrygian_dominant_11: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      phrygian_dominant_12: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      M7_19: {
        targetStringIndex: 5,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
      M7_20: {
        targetStringIndex: 4,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
      M7_21: {
        targetStringIndex: 3,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
      M7_22: {
        targetStringIndex: 2,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
      M7_23: {
        targetStringIndex: 1,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
      M7_24: {
        targetStringIndex: 0,
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
    },
  },
};

export default shapes;
