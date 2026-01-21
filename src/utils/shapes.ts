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
      M7_1: [[5, 0],[5, 4],[4, 2],[3, 1],[3, 2],[2, 1],[1, 0],[1, 4],[0, 0],[0, 4]],
      // prettier-ignore
      M7_2: [[4, 0],[4, 4],[3, 2],[2, 1],[2, 2],[1, 2],[0, 0],[0, 4]],
      // prettier-ignore
      M7_3: [[3, 0],[3, 4],[2, 2],[1, 2],[1, 3],[0, 2]],
      // prettier-ignore
      M7_4: [[2, 0],[2, 4],[1, 3],[0, 2],[0, 3]],
      // prettier-ignore
      M7_5: [[1, 0],[1, 4],[0, 2]],
      // prettier-ignore
      M7_6: [[0, 0],[0, 4]],
      // prettier-ignore
      M7_7: [[5, 0],[4, -1],[4, 2],[3, 1],[3, 2],[2, 1],[1, 0],[0, -1],[0, 0]],
      // prettier-ignore
      M7_8: [[4, 0],[3, -1],[3, 2],[2, 1],[2, 2],[1, 2],[0, 0]],
      // prettier-ignore
      M7_9: [[3, 0],[2, -1],[2, 2],[1, 2],[0, -2],[0, 2]],
      // prettier-ignore
      M7_10: [[2, 0],[1, 0],[1, 3],[0, 2],[0, 3]],
      // prettier-ignore
      M7_11: [[1, 0],[0, -1],[0, 2]],
      // prettier-ignore
      M7_13: [[5, 0],[4, -1],[3, -3],[3, 1],[2, -3],[2, 1],[1, 0],[0, -1],[0, 0]],
      // prettier-ignore
      // prettier-ignore
      "M7_14": [[5, 0],[4, -1],[3, -3],[3, 1],[2, -3],[1, -3],[1, 0],[0, -1],[0, 0]],
      // prettier-ignore
      "M7_15": [[3, 0],[2, -1],[1, -2],[1, 2],[0, -2]],
      // prettier-ignore
      "M7_16": [[1, 0],[0, -1]],
      // prettier-ignore
      M7_17: [[4, 0],[3, -1],[2, -3],[2, 1],[1, -2],[0, -3],[0, 0]],
      // prettier-ignore
      M7_18: [[3, 0],[2, -1],[1, -2],[1, 2],[0, -2],[0, 2]],
      // prettier-ignore
      M7_19: [[2, 0],[1, 0],[0, -2],[0, 2]],
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
      M_add9_5: [[1, 0],[1, 2],[1, 4],[0, 2]],
      // prettier-ignore
      M_add9_6: [[0, 0],[0, 2],[0, 4]],
      // prettier-ignore
      M_add9_7: [[5, 0],[5, 2],[4, -1],[4, 2],[3, 2],[2, -1],[2, 1],[1, 0],[0, 0],[0, 2]],
      // prettier-ignore
      M_add9_8: [[4, 0],[4, 2],[3, -1],[3, 2],[2, 2],[1, 0],[1, 2],[0, 0]],
      // prettier-ignore
      M_add9_9: [[3, 0],[3, 2],[2, -1],[2, 2],[1, 3],[0, 0],[0, 2]],
      // prettier-ignore
      M_add9_10: [[2, 0],[2, 2],[1, 0],[1, 3],[0, 3]],
      // prettier-ignore
      M_add9_11: [[1, 0],[1, 2],[0, -1],[0, 2]],
      // prettier-ignore
      M_add9_12: [[0, 0],[0, 2]],
      // prettier-ignore
      M_add9_13: [[5, 0],[4, -3],[4, -1],[3, -3],[2, -3],[2, -1],[1, -3],[1, 0],[0, 0]],
      // prettier-ignore
      M_add9_14: [[4, 0],[3, -3],[3, -1],[2, -3],[1, -2],[1, 0],[0, -3],[0, 0]],
      // prettier-ignore
      M_add9_15: [[3, 0],[2, -3],[2, -1],[1, -2],[0, -2],[0, 0]],
      // prettier-ignore
      M_add9_16: [[2, 0],[1, -2],[1, 0],[0, -2]],
      // prettier-ignore
      M_add9_17: [[1, 0],[0, -3],[0, -1]],
      // prettier-ignore
      M_add9_18: [[0, 0]],
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
      M9_5: [[1, 0],[1, 2],[1, 4],[0, 2]],
      // prettier-ignore
      M9_6: [[0, 0],[0, 2],[0, 4]],
      // prettier-ignore
      M9_7: [[5, 0],[5, 2],[5, 4],[4, 2],[3, 1],[3, 2],[3, 4],[2, 1],[2, 4],[1, 4],[1, 5],[0, 2],[0, 4]],
      // prettier-ignore
      M9_8: [[4, 0],[4, 2],[4, 4],[3, 2],[2, 1],[2, 2],[2, 4],[1, 2],[1, 5],[0, 4],[0, 5]],
      // prettier-ignore
      M9_9: [[3, 0],[3, 2],[3, 4],[2, 2],[1, 2],[1, 3],[1, 5],[0, 2],[0, 5]],
      // prettier-ignore
      M9_10: [[2, 0],[2, 2],[2, 4],[1, 3],[0, 2],[0, 3],[0, 5]],
      // prettier-ignore
      M9_11: [[1, 0],[1, 2],[1, 4],[0, 2]],
      // prettier-ignore
      M9_12: [[0, 0],[0, 2],[0, 4]],
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
      dominant_1: [[5, 0],[5, 4],[4, 2],[3, 0],[3, 2],[2, 1],[2, 4],[1, 3],[0, 0],[0, 4]],
      // prettier-ignore
      dominant_2: [[4, 0],[4, 4],[3, 2],[2, 0],[2, 2],[1, 2],[1, 5],[0, 3]],
      // prettier-ignore
      dominant_3: [[3, 0],[3, 4],[2, 2],[1, 1],[1, 3],[0, 2],[0, 5]],
      // prettier-ignore
      dominant_7: [[5, 0],[5, 4],[4, 2],[3, 0],[3, 2],[2, 1],[1, 0],[1, 3],[0, 0],[0, 4]],
      // prettier-ignore
      dominant_8: [[4, 0],[4, 4],[3, 2],[2, 0],[2, 2],[1, 2],[0, 0],[0, 3]],
      // prettier-ignore
      dominant_9: [[3, 0],[3, 4],[2, 2],[1, 1],[1, 3],[0, 2]],
      // prettier-ignore
      dominant_10: [[2, 0],[2, 4],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      dominant_11: [[1, 0],[1, 4],[0, 2]],
      // prettier-ignore
      dominant_12: [[0, 0],[0, 4]],
      // prettier-ignore
      dominant_13: [[5, 0],[4, -1],[4, 2],[3, 0],[3, 2],[2, 1],[1, 0],[1, 3],[0, 0],[0, 4]],
      // prettier-ignore
      dominant_14: [[4, 0],[3, -1],[3, 2],[2, 0],[2, 2],[1, 2],[0, 0],[0, 3]],
      // prettier-ignore
      dominant_19: [[5, 0],[4, -1],[4, 2],[3, 0],[3, 2],[2, 1],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      dominant_20: [[4, 0],[3, -1],[3, 2],[2, 0],[2, 2],[1, 2],[0, 0]],
      // prettier-ignore
      dominant_21: [[3, 0],[2, -1],[2, 2],[1, 1],[1, 3],[0, 2]],
      // prettier-ignore
      dominant_22: [[2, 0],[1, 0],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      dominant_23: [[1, 0],[0, -1],[0, 2]],
      // prettier-ignore
      dominant_25: [[5, 0],[4, -1],[3, -3],[3, 0],[2, -3],[2, 1],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      dominant_26: [[4, 0],[3, -1],[2, -3],[2, 0],[1, -2],[1, 2],[0, 0]],
      // prettier-ignore
      dominant_27: [[3, 0],[2, -1],[1, -2],[1, 1],[0, -2],[0, 2]],
      // prettier-ignore
      dominant_29: [[1, 0],[0, -1]],
      // prettier-ignore
      dominant_31: [[5, 0],[4, -1],[3, -3],[3, 0],[2, -3],[1, -3],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      dominant_32: [[4, 0],[3, -1],[2, -3],[2, 0],[1, -2],[0, -3],[0, 0]],
      // prettier-ignore
      dominant_33: [[3, 0],[2, -1],[1, -2],[1, 1],[0, -2]],
      // prettier-ignore
      dominant_34: [[2, 0],[1, 0],[0, -2],[0, 1]],
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
      "7b9_1": [[5, 0],[5, 1],[5, 4],[4, 2],[3, 0],[3, 2],[3, 3],[2, 1],[1, 0],[1, 3],[0, 0],[0, 1],[0, 4]],
      // prettier-ignore
      "7b9_2": [[4, 0],[4, 1],[4, 4],[3, 2],[2, 0],[2, 2],[2, 3],[1, 2],[0, 0],[0, 3]],
      // prettier-ignore
      "7b9_3": [[3, 0],[3, 1],[3, 4],[2, 2],[1, 1],[1, 3],[1, 4],[0, 2]],
      // prettier-ignore
      "7b9_4": [[2, 0],[2, 1],[2, 4],[1, 3],[0, 1],[0, 3],[0, 4]],
      // prettier-ignore
      "7b9_5": [[1, 0],[1, 1],[1, 4],[0, 2]],
      // prettier-ignore
      "7b9_6": [[0, 0],[0, 1],[0, 4]],
      // prettier-ignore
      "7b9_7": [[5, 0],[5, 1],[4, -1],[3, -3],[3, 0],[2, -3],[2, -2],[1, -3],[1, 0],[0, -2],[0, 0],[0, 1]],
      // prettier-ignore
      "7b9_8": [[4, 0],[4, 1],[3, -1],[2, -3],[2, 0],[1, -2],[1, -1],[0, -3],[0, 0]],
      // prettier-ignore
      "7b9_9": [[3, 0],[3, 1],[2, -1],[1, -2],[1, 1],[0, -2],[0, -1]],
      // prettier-ignore
      "7b9_10": [[2, 0],[2, 1],[1, 0],[0, -2],[0, 1]],
      // prettier-ignore
      "7b9_11": [[1, 0],[1, 1],[0, -1]],
      // prettier-ignore
      "7b9_12": [[0, 0],[0, 1]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      "m7_1": [[5, 0],[5, 3],[4, 2],[3, 0],[3, 2],[2, 0],[1, 0],[1, 3],[0, 0],[0, 3]],
      // prettier-ignore
      "m7_2": [[4, 0],[4, 3],[3, 2],[2, 0],[2, 2],[1, 1],[0, 0],[0, 3]],
      // prettier-ignore
      "m7_3": [[3, 0],[3, 3],[2, 2],[1, 1],[1, 3],[0, 1]],
      // prettier-ignore
      "m7_4": [[2, 0],[2, 3],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      "m7_5": [[1, 0],[1, 3],[0, 2]],
      // prettier-ignore
      "m7_6": [[0, 0],[0, 3]],
      // prettier-ignore
      "m7_7": [[5, 0],[4, -2],[4, 2],[3, 0],[3, 2],[2, 0],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      "m7_8": [[4, 0],[3, -2],[3, 2],[2, 0],[2, 2],[1, 1],[0, 0]],
      // prettier-ignore
      "m7_9": [[3, 0],[2, -2],[2, 2],[1, 1],[1, 3],[0, 1]],
      // prettier-ignore
      "m7_10": [[2, 0],[1, -1],[1, 3],[0, 1],[0, 3]],
      // prettier-ignore
      "m7_11": [[1, 0],[0, -2],[0, 2]],
      // prettier-ignore
      "m7_12": [[5, 0],[4, -2],[3, -3],[3, 0],[2, -3],[2, 0],[1, 0],[0, -2],[0, 0]],
      // prettier-ignore
      "m7_13": [[4, 0],[3, -2],[2, -3],[2, 0],[1, -2],[1, 1],[0, 0]],
      // prettier-ignore
      "m7_14": [[3, 0],[2, -2],[1, -2],[1, 1],[0, -2],[0, 1]],
      // prettier-ignore
      "m7_15": [[2, 0],[1, -1],[0, -2],[0, 1]],
      // prettier-ignore
      "m7_16": [[1, 0],[0, -2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
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
      // test: [[5, 0],[5, 2],[5, 4],[4, 2]],
    },
  },
};

export default shapes;
