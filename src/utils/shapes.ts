import { getSemitonesMap } from "./intervals";
import type { RoleId } from "./roles";

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

export interface Shape {
  label: string;
  type: ShapeType;
  intervals: number[];
  semitoneOffsetFromMajorTonicRoot: {
    tonic?: SemitoneOffsetFromMajorTonicRoot;
    subdominant?: SemitoneOffsetFromMajorTonicRoot;
    dominant?: SemitoneOffsetFromMajorTonicRoot;
  };
  shapesCoordinates: { [key: string]: number[][] };
}

export interface Shapes {
  [key: string]: Shape;
}

type ExistingShapeIds = keyof typeof shapes;

type ModeRoleKey = `${"major" | "minor"}_${RoleId}`;

export const DEFAULT_SHAPES_CONFIG: Record<ModeRoleKey, ExistingShapeIds> = {
  major_tonic: "M7",
  major_subdominant: "M7",
  major_dominant: "dominant",
  minor_tonic: "m7",
  minor_subdominant: "m7",
  minor_dominant: "dominant",
};

const shapes: Shapes = {
  M7: {
    label: "M7",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _M7],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { bothModes: [_1] },
      subdominant: { bothModes: [_4] },
    },
    shapesCoordinates: {
      // prettier-ignore
      M7_str_E_v1: [[5, 0],[5, 4],[4, 2],[3, 1],[3, 2],[2, 1],[2, 4],[1, 4],[0, 0],[0, 4]],
      // prettier-ignore
      M7_str_E_v2: [[5, 0],[4, -1],[4, 2],[3, 1],[3, 2],[2, 1],[1, 0],[0, -1],[0, 0]],
      // prettier-ignore
      M7_str_E_v3: [[5, 0],[4, -1],[3, -3],[3, 1],[2, -3],[2, 1],[1, 0],[0, -1],[0, 0]],
      // prettier-ignore
      M7_str_E_v4: [[5, 0],[4, -1],[3, -3],[3, 1],[2, -3],[1, -3],[1, 0],[0, -1],[0, 0]],

      // prettier-ignore
      M7_str_A_v1: [[4, 0],[4, 4],[3, 2],[2, 1],[2, 2],[1, 2],[0, 0],[0, 4]],
      // prettier-ignore
      M7_str_A_v2: [[4, 0],[3, -1],[3, 2],[2, 1],[2, 2],[1, 2],[0, 0]],
      // prettier-ignore
      M7_str_A_v3: [[4, 0],[3, -1],[2, -3],[1, -3],[1, -2],[0, -3],[0, 0]],

      // prettier-ignore
      M7_str_D_v1: [[3, 0],[3, 4],[2, 2],[1, 2],[1, 3],[0, 2]],
      // prettier-ignore
      M7_str_D_v2: [[3, 0],[2, -1],[2, 2],[1, 2],[0, -2],[0, 2]],
      // prettier-ignore
      M7_str_D_v3: [[3, 0],[2, -1],[1, -2],[1, 2],[0, -2],[0, 2]],
      // prettier-ignore
      M7_str_D_v4: [[3, 0],[2, -1],[1, -2],[0, -3],[0, -2]],

      // prettier-ignore
      M7_str_G_v1: [[2, 0],[2, 4],[1, 3],[0, 2],[0, 3]],
      // prettier-ignore
      M7_str_G_v2: [[2, 0],[1, 0],[1, 3],[0, 2],[0, 3]],
      // prettier-ignore
      M7_str_G_v3: [[2, 0],[1, 0],[0, -2],[0, 2]],
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
    shapesCoordinates: {
      // prettier-ignore
      M_add9_1: [[5, 0],[5, 2],[5, 4],[4, 2],[3, 2],[3, 4],[2, 1],[1, 0],[0, 0],[0, 2],[0, 4]],
      // prettier-ignore
      M_add9_2: [[4, 0],[4, 2],[4, 4],[3, 2],[2, 2],[2, 4],[1, 2],[0, 0]],
      // prettier-ignore
      M_add9_3: [[3, 0],[3, 2],[3, 4],[2, 2],[1, 3],[1, 5],[0, 2]],
      // prettier-ignore
      M_add9_4: [[2, 0],[2, 2],[2, 4],[1, 3],[0, 3],[0, 5]],
      // prettier-ignore
      M_add9_7: [[5, 0],[5, 2],[4, -1],[4, 2],[3, 2],[2, -1],[2, 1],[1, 0],[0, 0],[0, 2]],
      // prettier-ignore
      M_add9_8: [[4, 0],[4, 2],[3, -1],[3, 2],[2, 2],[1, 0],[1, 2],[0, 0]],
      // prettier-ignore
      M_add9_9: [[3, 0],[3, 2],[2, -1],[2, 2],[1, 3],[0, 0],[0, 2]],
      // prettier-ignore
      M_add9_10: [[2, 0],[2, 2],[1, 0],[1, 3],[0, 3]],
      // prettier-ignore
      M_add9_13: [[5, 0],[4, -3],[4, -1],[3, -3],[2, -3],[2, -1],[1, -3],[1, 0],[0, 0]],
      // prettier-ignore
      M_add9_14: [[4, 0],[3, -3],[3, -1],[2, -3],[1, -2],[1, 0],[0, -3],[0, 0]],
      // prettier-ignore
      M_add9_15: [[3, 0],[2, -3],[2, -1],[1, -2],[0, -2],[0, 0]],
      // prettier-ignore
      M_add9_16: [[2, 0],[1, -2],[1, 0],[0, -2]],
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
    shapesCoordinates: {
      // prettier-ignore
      M9_1: [[5, 0],[5, 2],[5, 4],[4, 2],[3, 1],[3, 2],[3, 4],[2, 1],[2, 4],[1, 4],[0, 0],[0, 2],[0, 4]],
      // prettier-ignore
      M9_2: [[4, 0],[4, 2],[4, 4],[3, 2],[2, 1],[2, 2],[2, 4],[1, 2],[1, 5],[0, 4]],
      // prettier-ignore
      M9_3: [[3, 0],[3, 2],[3, 4],[2, 2],[1, 2],[1, 3],[1, 5],[0, 2],[0, 5]],
      // prettier-ignore
      M9_4: [[2, 0],[2, 2],[2, 4],[1, 3],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      M9_7: [[5, 0],[5, 2],[5, 4],[4, 2],[3, 1],[3, 2],[3, 4],[2, 1],[2, 4],[1, 4],[1, 5],[0, 2],[0, 4]],
      // prettier-ignore
      M9_8: [[4, 0],[4, 2],[4, 4],[3, 2],[2, 1],[2, 2],[2, 4],[1, 2],[1, 5],[0, 4],[0, 5]],
      // prettier-ignore
      M9_9: [[3, 0],[3, 2],[3, 4],[2, 2],[1, 2],[1, 3],[1, 5],[0, 2],[0, 5]],
      // prettier-ignore
      M9_10: [[2, 0],[2, 2],[2, 4],[1, 3],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      "M9_11": [[5, 0],[5, 2],[4, -1],[4, 2],[3, 1],[3, 2],[2, -1],[2, 1],[1, 0],[0, -1],[0, 0],[0, 2]],
      // prettier-ignore
      "M9_12": [[4, 0],[4, 2],[3, -1],[3, 2],[2, 1],[2, 2],[1, 0],[1, 2],[0, 0]],
      // prettier-ignore
      "M9_13": [[3, 0],[3, 2],[2, -1],[2, 2],[1, 2],[1, 3],[0, 0],[0, 2]],
      // prettier-ignore
      "M9_14": [[2, 0],[2, 2],[1, 0],[1, 3],[0, 2],[0, 3]],
      // prettier-ignore
      "M9_15": [[5, 0],[4, -3],[4, -1],[3, -3],[3, 1],[2, -3],[2, -1],[1, -3],[1, 0],[0, -1],[0, 0]],
      // prettier-ignore
      "M9_16": [[4, 0],[3, -3],[3, -1],[2, -3],[2, 1],[1, -2],[1, 0],[0, -3],[0, 0]],
      // prettier-ignore
      "M9_17": [[3, 0],[2, -3],[2, -1],[1, -2],[1, 2],[0, -2],[0, 0]],
      // prettier-ignore
      "M9_18": [[2, 0],[1, -2],[1, 0],[0, -2],[0, 2]],
    },
  },
  dominant: {
    label: "7",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: { majorMode: [_5], minorMode: [_M3] },
    },
    shapesCoordinates: {
      // prettier-ignore
      dominant_str_E_v1: [[5, 0],[5, 4],[4, 2],[3, 0],[3, 2],[2, 1],[2, 4],[1, 3],[0, 0],[0, 4]],
      // prettier-ignore
      dominant_str_E_v2: [[5, 0],[5, 4],[4, 2],[3, 0],[3, 2],[2, 1],[1, 0],[1, 3],[0, 0],[0, 4]],
      // prettier-ignore
      dominant_str_E_v3: [[5, 0],[4, -1],[4, 2],[3, 0],[3, 2],[2, 1],[1, 0],[1, 3],[0, 0],[0, 4]],
      // prettier-ignore
      dominant_str_E_v4: [[5, 0],[4, -1],[4, 2],[3, 0],[3, 2],[2, 1],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      dominant_str_E_v5: [[5, 0],[4, -1],[3, -3],[3, 0],[2, -3],[2, 1],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      dominant_str_E_v6: [[5, 0],[4, -1],[3, -3],[3, 0],[2, -3],[1, -3],[1, 0],[0, -2],[0, 0]],

      // prettier-ignore
      dominant_str_A_v1: [[4, 0],[4, 4],[3, 2],[2, 0],[2, 2],[1, 2],[0, 0],[0, 3]],
      // prettier-ignore
      dominant_str_A_v2: [[4, 0],[3, -1],[3, 2],[2, 0],[2, 2],[1, 2],[0, 0]],
      // prettier-ignore
      dominant_str_A_v3: [[4, 0],[3, -1],[2, -3],[2, 0],[1, -2],[0, -3],[0, 0]],

      // prettier-ignore
      dominant_str_D_v1: [[3, 0],[3, 4],[2, 2],[1, 1],[1, 3],[0, 2]],
      // prettier-ignore
      dominant_str_D_v2: [[3, 0],[2, -1],[2, 2],[1, 1],[0, -2],[0, 2]],
      // prettier-ignore
      dominant_str_D_v3: [[3, 0],[2, -1],[1, -2],[1, 1],[0, -2],[0, 2]],
      // prettier-ignore
      dominant_str_D_v4: [[3, 0],[2, -1],[1, -2],[0, -4],[0, -2]],

      // prettier-ignore
      dominant_str_G_v1: [[2, 0],[2, 4],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      dominant_str_G_v2: [[2, 0],[1, 0],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      dominant_str_G_v3: [[2, 0],[1, 0],[0, -2],[0, 1]],
    },
  },
  "7b9": {
    label: "7b9",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _m7, _m9],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: { minorMode: [_M3], majorMode: [_5] },
    },
    shapesCoordinates: {
      // prettier-ignore
      "7b9_str_E_v1": [[5, 0],[5, 1],[5, 4],[4, 2],[3, 0],[3, 2],[3, 3],[2, 1],[1, 0],[1, 3],[0, 0],[0, 1],[0, 4]],
      // prettier-ignore
      "7b9_str_E_v2": [[5, 0],[5, 1],[4, -1],[4, 2],[3, 0],[3, 2],[2, -2],[2, 1],[1, 0],[0, -2],[0, 0],[0, 1]],
      // prettier-ignore
      "7b9_str_E_v3": [[5, 0],[5, 1],[4, -1],[3, -3],[3, 0],[2, -3],[2, -2],[1, -3],[1, 0],[0, -2],[0, 0]],

      // prettier-ignore
      "7b9_2": [[4, 0],[4, 1],[4, 4],[3, 2],[2, 0],[2, 2],[2, 3],[1, 2],[0, 0],[0, 3]],
      // prettier-ignore
      "7b9_3": [[3, 0],[3, 1],[3, 4],[2, 2],[1, 1],[1, 3],[1, 4],[0, 2]],
      // prettier-ignore
      "7b9_4": [[2, 0],[2, 1],[2, 4],[1, 3],[0, 1],[0, 3],[0, 4]],
      // prettier-ignore
      "7b9_8": [[4, 0],[4, 1],[3, -1],[2, -3],[2, 0],[1, -2],[1, -1],[0, -3],[0, 0]],
      // prettier-ignore
      "7b9_9": [[3, 0],[3, 1],[2, -1],[1, -2],[1, 1],[0, -2],[0, -1]],
      // prettier-ignore
      "7b9_10": [[2, 0],[2, 1],[1, 0],[0, -2],[0, 1]],

      // prettier-ignore
      "7b9_16": [[4, 0],[4, 1],[3, -1],[3, 2],[2, 0],[2, 2],[1, -1],[1, 2],[0, 0]],
      // prettier-ignore
      "7b9_17": [[3, 0],[3, 1],[2, -1],[2, 2],[1, 1],[1, 3],[0, -1],[0, 2]],
      // prettier-ignore
      "7b9_18": [[2, 0],[2, 1],[1, 0],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      "7b9_12": [[4, 0],[4, 7],[4, 8],[3, -5],[3, 6],[3, 9],[2, 7],[2, 9],[1, 6],[1, 9],[0, 7]],
      // prettier-ignore
      "7b9_13": [[3, 0],[3, 7],[3, 8],[2, -5],[2, 6],[2, 9],[1, 8],[1, 10],[0, 6],[0, 9]],
      // prettier-ignore
      "7b9_14": [[2, 0],[2, 7],[2, 8],[1, -4],[1, 7],[1, 10],[0, 8],[0, 10]],
    },
  },
  m7b5: {
    label: "m7b5",
    type: "Arpegio",
    intervals: [_1, _m3, _T, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: { bothModes: [_M7] },
    },
    shapesCoordinates: {
      // prettier-ignore
      "m7b5_1": [[5, 0],[5, 3],[4, 1],[3, 0],[3, 2],[2, 0],[2, 3],[1, 3],[0, 0],[0, 3]],
      // prettier-ignore
      "m7b5_2": [[4, 0],[4, 3],[3, 1],[2, 0],[2, 2],[1, 1],[1, 4],[0, 3]],
      // prettier-ignore
      "m7b5_3": [[3, 0],[3, 3],[2, 1],[1, 1],[1, 3],[0, 1],[0, 4]],
      // prettier-ignore
      "m7b5_4": [[2, 0],[2, 3],[1, 2],[0, 1],[0, 3]],
      // prettier-ignore
      "m7b5_5": [[5, 0],[4, -2],[4, 1],[3, 0],[3, 2],[2, 0],[1, -1],[1, 3],[0, 0],[0, 3]],
      // prettier-ignore
      "m7b5_6": [[4, 0],[3, -2],[3, 1],[2, 0],[2, 2],[1, 1],[0, -1],[0, 3]],
      // prettier-ignore
      "m7b5_7": [[3, 0],[2, -2],[2, 1],[1, 1],[1, 3],[0, 1]],
      // prettier-ignore
      "m7b5_8": [[2, 0],[1, -1],[1, 2],[0, 1],[0, 3]],
      // prettier-ignore
      "m7b5_9": [[5, 0],[4, -2],[3, -4],[3, 0],[2, -3],[1, -4],[1, -1],[0, -2],[0, 0]],
      // prettier-ignore
      "m7b5_10": [[4, 0],[3, -2],[2, -4],[2, 0],[1, -2],[0, -4],[0, -1]],
      // prettier-ignore
      "m7b5_11": [[3, 0],[2, -2],[1, -3],[1, 1],[0, -2]],
      // prettier-ignore
      "m7b5_12": [[2, 0],[1, -1],[0, -3],[0, 1]],
    },
  },
  dim7: {
    label: "dim7",
    type: "Arpegio",
    intervals: [_1, _m3, _T, _M6],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: { bothModes: [_M7] },
    },
    shapesCoordinates: {
      // prettier-ignore
      "dim7_1": [[5, 0],[5, 3],[4, 1],[4, 4],[3, 2],[3, 5],[2, 3],[2, 6],[1, 5],[1, 8],[0, 6],[0, 9]],
      // prettier-ignore
      "dim7_2": [[4, 0],[4, 3],[3, 1],[3, 4],[2, 2],[2, 5],[1, 4],[1, 7],[0, 5],[0, 8]],
      // prettier-ignore
      "dim7_3": [[3, 0],[3, 3],[2, 1],[2, 4],[1, 3],[1, 6],[0, 4],[0, 7]],
      // prettier-ignore
      "dim7_4": [[2, 0],[2, 3],[1, 2],[1, 5],[0, 3],[0, 6]],
      // prettier-ignore
      "dim7_5": [[5, 0],[5, 3],[4, 1],[4, 4],[3, 2],[2, 0],[2, 3],[1, 2],[0, 0],[0, 3]],
      // prettier-ignore
      "dim7_6": [[4, 0],[4, 3],[3, 1],[3, 4],[2, 2],[1, 1],[1, 4],[0, 2]],
      // prettier-ignore
      "dim7_7": [[3, 0],[3, 3],[2, 1],[2, 4],[1, 3],[0, 1],[0, 4]],
      // prettier-ignore
      "dim7_8": [[2, 0],[2, 3],[1, 2],[1, 5],[0, 3]],
      // prettier-ignore
      "dim7_9": [[5, 0],[4, -2],[4, 1],[3, -1],[2, -3],[2, 0],[1, -1],[0, -3],[0, 0]],
      // prettier-ignore
      "dim7_10": [[4, 0],[3, -2],[3, 1],[2, -1],[1, -2],[1, 1],[0, -1]],
      // prettier-ignore
      "dim7_11": [[3, 0],[2, -2],[2, 1],[1, 0],[0, -2],[0, 1]],
      // prettier-ignore
      "dim7_12": [[2, 0],[1, -1],[1, 2],[0, 0]],
      // prettier-ignore
      "dim7_13": [[5, 0],[4, -2],[3, -4],[3, -1],[2, -3],[1, -4],[1, -1],[0, -3]],
      // prettier-ignore
      "dim7_14": [[4, 0],[3, -2],[2, -4],[2, -1],[1, -2],[0, -4],[0, -1]],
      // prettier-ignore
      "dim7_15": [[3, 0],[2, -2],[1, -3],[1, 0],[0, -2]],
      // prettier-ignore
      "dim7_16": [[2, 0],[1, -1],[0, -3],[0, 0]],
    },
  },
  m7: {
    label: "m7",
    type: "Arpegio",
    intervals: [_1, _m3, _5, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { bothModes: [_M6, _M3] },
      subdominant: { bothModes: [_M2, _M6] },
    },
    shapesCoordinates: {
      // prettier-ignore
      m7_str_E_v1: [[5, 0],[5, 3],[4, 2],[3, 0],[3, 2],[2, 0],[1, 0],[1, 3],[0, 0],[0, 3]],
      // prettier-ignore
      m7_str_E_v2: [[5, 0],[4, -2],[4, 2],[3, 0],[3, 2],[2, 0],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      m7_str_E_v3: [[5, 0],[4, -2],[3, -3],[3, 0],[2, -3],[2, 0],[1, 0],[0, -2],[0, 0]],

      // prettier-ignore
      m7_str_A_v1: [[4, 0],[4, 3],[3, 2],[2, 0],[2, 2],[1, 1],[0, 0],[0, 3]],
      // prettier-ignore
      m7_str_A_v2: [[4, 0],[3, -2],[3, 2],[2, 0],[2, 2],[1, 1],[0, 0]],
      // prettier-ignore
      m7_str_A_v3: [[4, 0],[3, -2],[2, -3],[2, 0],[1, -2],[0, -4],[0, 0]],

      // prettier-ignore
      m7_str_D_v1: [[3, 0],[3, 3],[2, 2],[1, 1],[1, 3],[0, 1]],
      // prettier-ignore
      m7_str_D_v2: [[3, 0],[2, -2],[1, -2],[1, 1],[0, -2],[0, 1]],

      // prettier-ignore
      m7_str_G_v1: [[2, 0],[2, 3],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      m7_str_G_v2: [[2, 0],[1, -1],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      m7_str_G_v3: [[2, 0],[1, -1],[0, -2],[0, 1]],
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
    shapesCoordinates: {
      // prettier-ignore
      "m_add9_1": [[5, 0],[5, 2],[5, 3],[4, 2],[3, 2],[3, 4],[2, 0],[1, 0],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "m_add9_2": [[4, 0],[4, 2],[4, 3],[3, 2],[2, 2],[2, 4],[1, 1],[0, 0]],
      // prettier-ignore
      "m_add9_3": [[3, 0],[3, 2],[3, 3],[2, 2],[1, 3],[1, 5],[0, 1]],
      // prettier-ignore
      "m_add9_4": [[2, 0],[2, 2],[2, 3],[1, 3],[0, 3],[0, 5]],
      // prettier-ignore
      "m_add9_5": [[5, 0],[5, 2],[4, -2],[4, 2],[3, 2],[2, -1],[2, 0],[1, 0],[0, 0]],
      // prettier-ignore
      "m_add9_6": [[4, 0],[4, 2],[3, -2],[3, 2],[2, 2],[1, 0],[1, 1],[0, 0]],
      // prettier-ignore
      "m_add9_7": [[3, 0],[3, 2],[2, -2],[1, -2],[0, -2],[0, 0],[0, 1]],
      // prettier-ignore
      "m_add9_8": [[2, 0],[2, 2],[1, -1],[1, 3],[0, 3]],
      // prettier-ignore
      "m_add9_9": [[5, 0],[4, -3],[4, -2],[3, -3],[2, -3],[2, -1],[2, 0],[1, 0],[0, 0]],
      // prettier-ignore
      "m_add9_10": [[4, 0],[3, -3],[3, -2],[2, -3],[1, -2],[1, 0],[1, 1],[0, 0]],
      // prettier-ignore
      "m_add9_11": [[3, 0],[2, -3],[2, -2],[1, -2],[0, -2],[0, 0],[0, 1]],
      // prettier-ignore
      "m_add9_12": [[2, 0],[1, -2],[1, -1],[0, -2]],
    },
  },
  m_9: {
    label: "m9",
    type: "Arpegio",
    intervals: [_1, _m3, _5, _m7, _M9],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: {
        bothModes: [_M6],
      },
    },
    shapesCoordinates: {
      // prettier-ignore
      "m_9_1": [[5, 0],[5, 2],[5, 3],[4, 2],[3, 0],[3, 2],[3, 4],[2, 0],[1, 0],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "m_9_2": [[4, 0],[4, 2],[4, 3],[3, 2],[2, 0],[2, 2],[2, 4],[1, 1],[0, 0],[0, 3]],
      // prettier-ignore
      "m_9_3": [[3, 0],[3, 2],[3, 3],[2, 2],[1, 1],[1, 3],[1, 5],[0, 1]],
      // prettier-ignore
      "m_9_4": [[2, 0],[2, 2],[2, 3],[1, 3],[0, 1],[0, 3],[0, 5]],
      // prettier-ignore
      "m_9_5": [[5, 0],[5, 2],[4, -2],[4, 2],[3, 0],[3, 2],[2, -1],[2, 0],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      "m_9_6": [[4, 0],[4, 2],[3, -2],[3, 2],[2, 0],[2, 2],[1, 0],[1, 1],[0, 0]],
      // prettier-ignore
      "m_9_7": [[3, 0],[3, 2],[2, -2],[2, 2],[1, 1],[1, 3],[0, 0],[0, 1]],
      // prettier-ignore
      "m_9_8": [[2, 0],[2, 2],[1, -1],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      "m_9_9": [[5, 0],[4, -3],[4, -2],[3, -3],[3, 0],[2, -3],[2, -1],[2, 0],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      "m_9_10": [[4, 0],[3, -3],[3, -2],[2, -3],[2, 0],[1, -2],[1, 0],[1, 1],[0, 0]],
      // prettier-ignore
      "m_9_11": [[3, 0],[2, -3],[2, -2],[1, -2],[1, 1],[0, -2],[0, 0],[0, 1]],
      // prettier-ignore
      "m_9_12": [[2, 0],[1, -2],[1, -1],[0, -2],[0, 1]],
    },
  },
  minor_pent: {
    label: "Minor Pentatonic",
    type: "Scale",
    intervals: [_1, _m3, _4, _5, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: {
        bothModes: [_M6],
      },
      subdominant: { bothModes: [_M2] },
      dominant: { majorMode: [_5, _M3] },
    },
    shapesCoordinates: {
      // prettier-ignore
      minor_pent_str_E_v1: [[5, 0],[5, 3],[4, 0],[4, 2],[3, 0],[3, 2],[2, 0],[2, 2],[1, 0],[1, 3],[0, 0],[0, 3]],
      // prettier-ignore
      minor_pent_str_E_v2: [[5, 0],[4, -2],[4, 0],[4, 2],[3, 0],[3, 2],[2, 0],[2, 2],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      minor_pent_str_E_v3: [[5, 0],[4, -2],[4, 0],[3, -3],[3, 0],[2, -3],[2, 0],[1, -2],[1, 0],[0, -2],[0, 0]],

      // prettier-ignore
      minor_pent_str_A_v1: [[4, 0],[4, 3],[3, 0],[3, 2],[2, 0],[2, 2],[1, 1],[1, 3],[0, 0],[0, 3]],
      // prettier-ignore
      minor_pent_str_A_v2: [[4, 0],[3, -2],[3, 0],[3, 2],[2, 0],[2, 2],[1, 1],[0, -2],[0, 0]],
      // prettier-ignore
      minor_pent_str_A_v3: [[4, 0],[3, -2],[3, 0],[2, -3],[2, 0],[1, -2],[1, 1],[0, -2],[0, 0]],

      // prettier-ignore
      minor_pent_str_D_v1: [[3, 0],[3, 3],[2, 0],[2, 2],[1, 1],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      minor_pent_str_D_v2: [[3, 0],[2, -2],[2, 0],[1, -2],[1, 1],[0, -2],[0, 1]],
      // prettier-ignore
      minor_pent_str_D_v3: [[3, 0],[2, -2],[1, -4],[1, -2],[0, -4],[0, -2]],

      // prettier-ignore
      minor_pent_str_G_v1: [[2, 0],[2, 3],[1, 1],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      minor_pent_str_G_v2: [[2, 0],[1, -1],[1, 1],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      minor_pent_str_G_v3: [[2, 0],[1, -1],[1, 1],[0, -2],[0, 1]],
    },
  },
  major_pent: {
    label: "Major Pentatonic",
    type: "Scale",
    intervals: [_1, _M2, _M3, _5, _M6],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { bothModes: [_1] },
      subdominant: { bothModes: [_4] },
      dominant: { majorMode: [_5] },
    },
    shapesCoordinates: {
      // prettier-ignore
      "major_pent_1": [[5, 0],[5, 2],[5, 4],[4, 2],[4, 4],[3, 2],[3, 4],[2, 1],[2, 4],[1, 2],[0, 0],[0, 2],[0, 4]],
      // prettier-ignore
      "major_pent_2": [[4, 0],[4, 2],[4, 4],[3, 2],[3, 4],[2, 2],[2, 4],[1, 2],[1, 5],[0, 2]],
      // prettier-ignore
      "major_pent_3": [[3, 0],[3, 2],[3, 4],[2, 2],[2, 4],[1, 3],[1, 5],[0, 2],[0, 5]],
      // prettier-ignore
      "major_pent_4": [[2, 0],[2, 2],[2, 4],[1, 3],[1, 5],[0, 3],[0, 5]],
      // prettier-ignore
      "major_pent_5": [[5, 0],[5, 2],[4, -1],[4, 2],[3, -1],[3, 2],[2, -1],[2, 1],[1, 0],[1, 2],[0, 0],[0, 2]],
      // prettier-ignore
      "major_pent_6": [[4, 0],[4, 2],[3, -1],[3, 2],[2, -1],[2, 2],[1, 0],[1, 2],[0, 0],[0, 2]],
      // prettier-ignore
      "major_pent_7": [[3, 0],[3, 2],[2, -1],[2, 2],[1, 0],[1, 3],[0, 0],[0, 2]],
      // prettier-ignore
      "major_pent_8": [[2, 0],[2, 2],[1, 0],[1, 3],[0, 0],[0, 3]],
      // prettier-ignore
      "major_pent_9": [[5, 0],[4, -3],[4, -1],[3, -3],[3, -1],[2, -3],[2, -1],[1, -3],[1, 0],[0, -3],[0, 0]],
      // prettier-ignore
      "major_pent_10": [[4, 0],[3, -3],[3, -1],[2, -3],[2, -1],[1, -2],[1, 0],[0, -3],[0, 0]],
      // prettier-ignore
      "major_pent_11": [[3, 0],[2, -3],[2, -1],[1, -2],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      "major_pent_12": [[2, 0],[1, -2],[1, 0],[0, -2],[0, 0]],
    },
  },
  no_avoid_notes_t_s_major: {
    label: '"No avoid notes"',
    type: "Note Set",
    intervals: [_1, _M2, _M3, _5, _M6, _M7],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { bothModes: [_1] },
      subdominant: { bothModes: [_4] },
    },
    shapesCoordinates: {
      // prettier-ignore
      "no_avoid_notes_t_s_major_1": [[5, 0],[5, 2],[5, 4],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 4],[1, 2],[1, 4],[0, 0],[0, 2],[0, 4]],
      // prettier-ignore
      "no_avoid_notes_t_s_major_2": [[4, 0],[4, 2],[4, 4],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 5],[0, 2],[0, 4]],
      // prettier-ignore
      "no_avoid_notes_t_s_major_3": [[3, 0],[3, 2],[3, 4],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 5]],
      // prettier-ignore
      "no_avoid_notes_t_s_major_4": [[2, 0],[2, 2],[2, 4],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      "no_avoid_notes_t_s_major_5": [[5, 0],[5, 2],[4, -1],[4, 2],[3, -1],[3, 1],[3, 2],[2, -1],[2, 1],[1, 0],[1, 2],[0, -1],[0, 0],[0, 2]],
      // prettier-ignore
      "no_avoid_notes_t_s_major_6": [[4, 0],[4, 2],[3, -1],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[0, 0],[0, 2]],
      // prettier-ignore
      "no_avoid_notes_t_s_major_7": [[3, 0],[3, 2],[2, -1],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2]],
      // prettier-ignore
      "no_avoid_notes_t_s_major_8": [[2, 0],[2, 2],[1, 0],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "no_avoid_notes_t_s_major_9": [[5, 0],[4, -3],[4, -1],[3, -3],[3, -1],[3, 1],[2, -3],[2, -1],[1, -3],[1, 0],[0, -3],[0, -1],[0, 0]],
      // prettier-ignore
      "no_avoid_notes_t_s_major_10": [[4, 0],[3, -3],[3, -1],[2, -3],[2, -1],[2, 1],[1, -2],[1, 0],[0, -3],[0, 0]],
      // prettier-ignore
      "no_avoid_notes_t_s_major_11": [[3, 0],[2, -3],[2, -1],[1, -2],[1, 0],[1, 2],[0, -2],[0, 0]],
      // prettier-ignore
      "no_avoid_notes_t_s_major_12": [[2, 0],[1, -2],[1, 0],[0, -2],[0, 0],[0, 2]],
    },
  },
  ionian: {
    label: "Ionian",
    type: "Scale",
    intervals: [_1, _M2, _M3, _4, _5, _M6, _M7],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { majorMode: [_1] },
    },
    shapesCoordinates: {
      // prettier-ignore
      "ionian_1": [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 4],[1, 5],[0, 2],[0, 4],[0, 5]],
      // prettier-ignore
      "ionian_2": [[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 4],[0, 5]],
      // prettier-ignore
      "ionian_3": [[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      "ionian_4": [[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      "ionian_5": [[5, 0],[5, 2],[5, 4],[4, 0],[4, 3],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 2],[1, 0],[1, 2],[1, 4],[0, 0],[0, 2],[0, 4]],
      // prettier-ignore
      "ionian_6": [[4, 0],[4, 2],[4, 4],[3, 0],[3, 3],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 3],[0, 0],[0, 2],[0, 4]],
      // prettier-ignore
      "ionian_7": [[3, 0],[3, 2],[3, 4],[2, 0],[2, 3],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 3]],
      // prettier-ignore
      "ionian_8": [[2, 0],[2, 2],[2, 4],[1, 1],[1, 4],[1, 5],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      "ionian_9": [[5, 0],[5, 2],[4, -1],[4, 0],[4, 2],[3, -1],[3, 1],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[0, -1],[0, 0],[0, 2]],
      // prettier-ignore
      "ionian_10": [[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2]],
      // prettier-ignore
      "ionian_11": [[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "ionian_12": [[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "ionian_13": [[5, 0],[4, -3],[4, -1],[4, 0],[3, -3],[3, -1],[3, 1],[2, -3],[2, -1],[1, -3],[1, -2],[1, 0],[0, -3],[0, -1],[0, 0]],
      // prettier-ignore
      "ionian_14": [[4, 0],[3, -3],[3, -1],[3, 0],[2, -3],[2, -1],[2, 1],[1, -2],[1, 0],[0, -3],[0, -2],[0, 0]],
      // prettier-ignore
      "ionian_15": [[3, 0],[2, -3],[2, -1],[2, 0],[1, -2],[1, 0],[1, 2],[0, -2],[0, 0]],
      // prettier-ignore
      "ionian_16": [[2, 0],[1, -2],[1, 0],[1, 1],[0, -2],[0, 0],[0, 2]],
    },
  },
  aeolian: {
    label: "Aeolian",
    type: "Scale",
    intervals: [_1, _M2, _m3, _4, _5, _m6, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { minorMode: [_M6] },
    },
    shapesCoordinates: {
      // prettier-ignore
      "aeolian_1": [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "aeolian_2": [[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 3],[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[0, 0],[0, 1],[0, 3]],
      // prettier-ignore
      "aeolian_3": [[3, 0],[3, 2],[3, 3],[2, 0],[2, 2],[2, 3],[1, 1],[1, 3],[1, 5],[0, 1],[0, 3]],
      // prettier-ignore
      "aeolian_4": [[2, 0],[2, 2],[2, 3],[1, 1],[1, 3],[1, 4],[0, 1],[0, 3],[0, 5]],
      // prettier-ignore
      "aeolian_5": [[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "aeolian_6": [[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -2],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 1],[0, 3]],
      // prettier-ignore
      "aeolian_7": [[3, 0],[3, 2],[2, -2],[2, 0],[2, 2],[1, -1],[1, 1],[1, 3],[0, 0],[0, 1],[0, 3]],
      // prettier-ignore
      "aeolian_8": [[2, 0],[2, 2],[1, -1],[1, 1],[1, 3],[0, -1],[0, 1],[0, 3]],
      // prettier-ignore
      "aeolian_9": [[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -1],[2, 0],[1, -2],[1, 0],[1, 1],[0, -2],[0, 0],[0, 2]],
      // prettier-ignore
      "aeolian_10": [[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -2],[2, 0],[2, 2],[1, 0],[1, 1],[0, -2],[0, 0],[0, 1]],
      // prettier-ignore
      "aeolian_11": [[3, 0],[3, 2],[2, -2],[2, 0],[2, 2],[1, -1],[1, 1],[1, 3],[0, 0],[0, 1]],
      // prettier-ignore
      "aeolian_12": [[5, 0],[4, -3],[4, -2],[4, 0],[3, -3],[3, -2],[3, 0],[2, -3],[2, -1],[1, -4],[1, -2],[1, 0],[0, -4],[0, -2],[0, 0]],
      // prettier-ignore
      "aeolian_13": [[4, 0],[3, -3],[3, -2],[3, 0],[2, -3],[2, -2],[2, 0],[1, -2],[1, 0],[0, -4],[0, -2],[0, 0]],
      // prettier-ignore
      "aeolian_14": [[3, 0],[2, -3],[2, -2],[2, 0],[1, -2],[1, -1],[1, 1],[0, -2],[0, 0]],
      // prettier-ignore
      "aeolian_15": [[2, 0],[1, -2],[1, -1],[1, 1],[0, -2],[0, -1],[0, 1]],
    },
  },
  dorian: {
    label: "Dorian",
    type: "Scale",
    intervals: [_1, _M2, _m3, _4, _5, _M6, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { minorMode: [_M6] },
      subdominant: { minorMode: [_M2] },
    },
    shapesCoordinates: {
      // prettier-ignore
      "dorian_1": [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      "dorian_2": [[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      "dorian_3": [[3, 0],[3, 2],[3, 3],[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 1],[0, 3],[0, 5]],
      // prettier-ignore
      "dorian_4": [[2, 0],[2, 2],[2, 3],[1, 1],[1, 3],[1, 5],[0, 1],[0, 3],[0, 5]],
      // prettier-ignore
      "dorian_5": [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "dorian_6": [[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "dorian_7": [[3, 0],[3, 2],[3, 3],[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 1],[0, 3]],
      // prettier-ignore
      "dorian_8": [[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 2],[0, -2],[0, 0],[0, 2]],
      // prettier-ignore
      "dorian_9": [[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 2]],
      // prettier-ignore
      "dorian_10": [[3, 0],[3, 2],[2, -2],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 1],[0, 3]],
      // prettier-ignore
      "dorian_11": [[2, 0],[2, 2],[1, -1],[1, 1],[1, 3],[0, 0],[0, 1],[0, 3]],
    },
  },
  lydian: {
    label: "Lydian",
    type: "Scale",
    intervals: [_1, _M2, _M3, _T, _5, _M6, _M7],
    semitoneOffsetFromMajorTonicRoot: {
      subdominant: { majorMode: [_4] },
    },
    shapesCoordinates: {
      // prettier-ignore
      "lydian_1": [[5, 0],[5, 2],[5, 4],[4, 1],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 3],[2, 4],[1, 2],[1, 4],[1, 5],[0, 2],[0, 4],[0, 6]],
      // prettier-ignore
      "lydian_2": [[4, 0],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 4],[1, 5],[0, 2],[0, 4],[0, 5]],
      // prettier-ignore
      "lydian_3": [[3, 0],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 4],[0, 5]],
      // prettier-ignore
      "lydian_4": [[2, 0],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      "lydian_5": [[5, 0],[5, 2],[5, 4],[4, 1],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 3],[2, 4],[1, 2],[1, 4],[0, 0],[0, 2],[0, 4]],
      // prettier-ignore
      "lydian_6": [[4, 0],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 4],[1, 5],[0, 2],[0, 4]],
      // prettier-ignore
      "lydian_7": [[5, 0],[5, 2],[4, -1],[4, 1],[4, 2],[3, -1],[3, 1],[3, 2],[2, -1],[2, 1],[1, -1],[1, 0],[1, 2],[0, -1],[0, 0],[0, 2]],
      // prettier-ignore
      "lydian_8": [[4, 0],[4, 2],[3, -1],[3, 1],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[0, -1],[0, 0],[0, 2]],
      // prettier-ignore
      "lydian_9": [[3, 0],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2]],
      // prettier-ignore
      "lydian_10": [[2, 0],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "lydian_11": [[5, 0],[4, -3],[4, -1],[4, 1],[3, -3],[3, -1],[3, 1],[2, -3],[2, -1],[1, -3],[1, -1],[1, 0],[0, -3],[0, -1],[0, 0]],
      // prettier-ignore
      "lydian_12": [[4, 0],[3, -3],[3, -1],[3, 1],[2, -3],[2, -1],[2, 1],[1, -2],[1, 0],[0, -3],[0, -1],[0, 0]],
      // prettier-ignore
      "lydian_13": [[3, 0],[2, -3],[2, -1],[2, 1],[1, -2],[1, 0],[1, 2],[0, -2],[0, 0]],
      // prettier-ignore
      "lydian_14": [[2, 0],[1, -2],[1, 0],[1, 2],[0, -2],[0, 0],[0, 2]],
    },
  },
  mixolydian: {
    label: "Mixolydian",
    type: "Scale",
    intervals: [_1, _M2, _M3, _4, _5, _M6, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: { majorMode: [_5], minorMode: [_M3] },
    },
    shapesCoordinates: {
      // prettier-ignore
      "mixolydian_1": [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 4],[0, 5]],
      // prettier-ignore
      "mixolydian_2": [[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      "mixolydian_3": [[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      "mixolydian_4": [[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 1],[0, 3],[0, 5]],
      // prettier-ignore
      "mixolydian_5": [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 1],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 4]],
      // prettier-ignore
      "mixolydian_6": [[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 2],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "mixolydian_7": [[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 2],[0, 3]],
      // prettier-ignore
      "mixolydian_8": [[5, 0],[5, 2],[4, -1],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 4]],
      // prettier-ignore
      "mixolydian_9": [[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "mixolydian_10": [[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 2],[0, 3]],
      // prettier-ignore
      "mixolydian_11": [[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 1],[0, 3]],
      // prettier-ignore
      "mixolydian_12": [[5, 0],[5, 2],[4, -1],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[0, -2],[0, 0],[0, 2]],
      // prettier-ignore
      "mixolydian_13": [[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2]],
    },
  },
  phrygian_dominant: {
    label: "Phrygian Dominant",
    type: "Scale",
    intervals: [_1, _m2, _M3, _4, _5, _m6, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: {
        minorMode: [_M3],
      },
    },
    shapesCoordinates: {
      // prettier-ignore
      "phrygian_dominant_1": [[5, 0],[5, 1],[5, 4],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 3],[2, 1],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 1],[0, 4],[0, 5]],
      // prettier-ignore
      "phrygian_dominant_2": [[4, 0],[4, 1],[4, 4],[3, 0],[3, 2],[3, 3],[2, 0],[2, 2],[2, 3],[1, 2],[1, 3],[1, 5],[0, 1],[0, 3],[0, 5]],
      // prettier-ignore
      "phrygian_dominant_3": [[3, 0],[3, 1],[3, 4],[2, 0],[2, 2],[2, 3],[1, 1],[1, 3],[1, 4],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      "phrygian_dominant_4": [[2, 0],[2, 1],[2, 4],[1, 1],[1, 3],[1, 4],[0, 1],[0, 3],[0, 4]],
      // prettier-ignore
      "phrygian_dominant_5": [[5, 0],[5, 1],[5, 4],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 3],[2, 1],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 1],[0, 4]],
      // prettier-ignore
      "phrygian_dominant_6": [[4, 0],[4, 1],[4, 4],[3, 0],[3, 2],[3, 3],[2, 0],[2, 2],[2, 3],[1, 2],[1, 3],[0, 0],[0, 1],[0, 3]],
      // prettier-ignore
      "phrygian_dominant_7": [[3, 0],[3, 1],[3, 4],[2, 0],[2, 2],[2, 3],[1, 1],[1, 3],[1, 4],[0, 2],[0, 3]],
      // prettier-ignore
      "phrygian_dominant_8": [[5, 0],[5, 1],[4, -1],[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -2],[2, 1],[1, -2],[1, 0],[1, 1],[0, -2],[0, 0],[0, 1]],
      // prettier-ignore
      "phrygian_dominant_9": [[4, 0],[4, 1],[3, -1],[3, 0],[3, 2],[2, -2],[2, 0],[2, 2],[1, -1],[1, 2],[0, -2],[0, 0],[0, 1]],
      // prettier-ignore
      "phrygian_dominant_10": [[3, 0],[3, 1],[2, -1],[2, 0],[2, 2],[1, -1],[1, 1],[1, 3],[0, -1],[0, 2]],
      // prettier-ignore
      "phrygian_dominant_11": [[2, 0],[2, 1],[1, 0],[1, 1],[1, 3],[0, -1],[0, 1],[0, 3]],
      // prettier-ignore
      "phrygian_dominant_12": [[5, 0],[4, -4],[4, -1],[4, 0],[3, -3],[3, -2],[2, -3],[2, -2],[1, -3],[1, -2],[1, 0],[0, -4],[0, -2],[0, 0]],
      // prettier-ignore
      "phrygian_dominant_13": [[4, 0],[3, -4],[3, -1],[3, 0],[2, -3],[2, -2],[1, -2],[1, -1],[0, -3],[0, -2],[0, 0]],
      // prettier-ignore
      "phrygian_dominant_14": [[3, 0],[2, -4],[2, -1],[2, 0],[1, -2],[1, -1],[0, -2],[0, -1]],
      // prettier-ignore
      "phrygian_dominant_15": [[2, 0],[1, -3],[1, 0],[1, 1],[0, -2],[0, -1]],
    },
  },
};

export default shapes;
