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
      M7_8: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
      // prettier-ignore
      M7_9: [[4, 0],[3, 0],[2, 0],[1, 1],[0, 0]],
      // prettier-ignore
      M7_10: [[3, 0],[2, 0],[1, 1],[0, 1]],
      // prettier-ignore
      M7_11: [[2, 0],[1, 1],[0, 1]],
      // prettier-ignore
      M7_12: [[1, 0],[0, 0]],
      // prettier-ignore
      M7_13: [[0, 0]],
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
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
      M7_2: [[5, 0],[5, 1]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
    shapesCoordinates: {
      // prettier-ignore
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
    shapesCoordinates: {
      // prettier-ignore
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
    shapesCoordinates: {
      // prettier-ignore
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
    },
  },
  ionian: {
    label: "Ionian",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { majorMode: [_1] },
    },
    shapesCoordinates: {
      // prettier-ignore
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
    },
  },
  aeolian: {
    label: "Aeolian",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: { minorMode: [_M6] },
    },
    shapesCoordinates: {
      // prettier-ignore
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
    shapesCoordinates: {
      // prettier-ignore
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
    },
  },
  lydian: {
    label: "Lydian",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      subdominant: { majorMode: [_4] },
    },
    shapesCoordinates: {
      // prettier-ignore
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
    },
  },
  mixolydian: {
    label: "Mixolydian",
    type: "Scale",
    intervals: [_1, _M3],
    semitoneOffsetFromMajorTonicRoot: {
      dominant: { majorMode: [_5], minorMode: [_M3] },
    },
    shapesCoordinates: {
      // prettier-ignore
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
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
    shapesCoordinates: {
      // prettier-ignore
      M7_2: [[5, 0],[5, 1],[5, 2],[5, 3]],
      // prettier-ignore
      M7_3: [[5, 0],[4, 0],[3, 0],[2, 0],[1, 0],[0, 0]],
    },
  },
};

export default shapes;
