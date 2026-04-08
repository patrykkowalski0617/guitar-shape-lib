import type { BaseChordId } from "./BASE_CHORDS_MAP";
import {
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
  _m9,
  _M9,
} from "./intervals";

export type ShapeType = "Arpeggio" | "Scale" | "Set";

export interface SemitoneOffsetFromMajorTonicRoot {
  majorMode?: number[];
  minorMode?: number[];
  bothModes?: number[];
}

export type FretboardCoordinate = [number, number];

export type VariantId = `v${number}`;

export type CAGEDassigments = "C" | "A" | "G" | "E" | "D" | "";

export type StringVariants = Record<
  VariantId,
  {
    coordinates: FretboardCoordinate[];
    CAGEDassigments: { major: CAGEDassigments; minor: CAGEDassigments };
  }
>;

export type FretboardStringId = keyof FretboardCoordinates;

export interface FretboardCoordinates {
  strE: StringVariants;
  strA: StringVariants;
  strD: StringVariants;
}

export interface Shape {
  label: string;
  type: ShapeType;
  intervals: number[];
  semitoneOffsetFromMajorTonicRoot: Partial<Record<BaseChordId, number[]>>;
  shapeVariants: FretboardCoordinates;
}

export interface Shapes {
  [key: string]: Shape;
}

export const shapes: Shapes = {
  M7: {
    label: "M7",
    type: "Arpeggio",
    intervals: [_1, _M3, _5, _M7],
    semitoneOffsetFromMajorTonicRoot: {
      Tonic: [_1],
      subdomi: [_4],
      Subdomi: [_4],
      tonic: [_1],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 0],[4, -1],[3, -3],[3, 1],[2, -3],[1, -3],[1, 0],[0, -1],[0, 0]],
          CAGEDassigments: { major: "G", minor: "E" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 0],[4, -1],[3, -3],[3, 1],[2, -3],[2, 1],[1, 0],[0, -1],[0, 0]],
          CAGEDassigments: { major: "G", minor: "E" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 0],[4, -1],[4, 2],[3, 1],[3, 2],[2, 1],[1, 0],[0, -1],[0, 0]],
          CAGEDassigments: { major: "E", minor: "D" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 4],[4, 2],[3, 1],[3, 2],[2, 1],[2, 4],[1, 4],[0, 0],[0, 4]],
          CAGEDassigments: { major: "E", minor: "C" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, 0],[4, -1],[4, 0],[3, -1],[2, -3],[1, -3],[1, -2],[0, -3],[0, 0]],
          CAGEDassigments: { major: "C", minor: "A" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[4, -1],[4, 0],[3, -1],[3, 2],[2, 1],[2, 2],[1, 2],[0, 0]],
          CAGEDassigments: { major: "A", minor: "G" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 4],[4, 0],[4, 4],[3, 2],[2, 1],[2, 2],[1, 2],[0, 0],[0, 4]],
          CAGEDassigments: { major: "A", minor: "E" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 2],[4, 0],[4, 4],[3, 0],[3, 4],[2, 2],[1, 2],[1, 3],[0, 2]],
          CAGEDassigments: { major: "D", minor: "A" },
        },
      },
    },
  },
  M_add9: {
    label: "M(add9)",
    type: "Arpeggio",
    intervals: [_1, _M3, _5, _M9],
    semitoneOffsetFromMajorTonicRoot: {
      Tonic: [_1],
      tonic: [_1],
      Subdomi: [_4],
      subdomi: [_4],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[4, -3],[4, -1],[3, -3],[2, -3],[2, -1],[1, -3],[1, 0],[0, 0]],
          CAGEDassigments: { major: "G", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, -1],[4, 2],[3, 2],[2, -1],[2, 1],[1, 0],[0, 0],[0, 2]],
          CAGEDassigments: { major: "E", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 2],[3, 2],[3, 4],[2, 1],[1, 0],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "E", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, 0],[4, 0],[3, -3],[3, -1],[2, -3],[1, -2],[1, 0],[0, -3],[0, 0]],
          CAGEDassigments: { major: "C", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[4, 0],[4, 2],[3, -1],[3, 2],[2, 2],[1, 0],[1, 2],[0, 0]],
          CAGEDassigments: { major: "A", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[4, 0],[4, 2],[4, 4],[3, 2],[2, 2],[2, 4],[1, 2],[0, 0]],
          CAGEDassigments: { major: "A", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, 0],[3, 0],[3, 2],[2, -1],[2, 2],[1, 3],[0, 0],[0, 2]],
          CAGEDassigments: { major: "D", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, 0],[3, 0],[3, 2],[3, 4],[2, 2],[1, 3],[0, 0],[0, 2]],
          CAGEDassigments: { major: "D", minor: "" },
        },
      },
    },
  },
  M9: {
    label: "M9",
    type: "Arpeggio",
    intervals: [_1, _M3, _5, _M7, _M9],
    semitoneOffsetFromMajorTonicRoot: {
      Tonic: [_1],
      tonic: [_1],
      Subdomi: [_4],
      subdomi: [_4],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 0],[4, -3],[4, -1],[3, -3],[3, 1],[2, -3],[2, -1],[1, -3],[1, 0],[0, -1],[0, 0]],
          CAGEDassigments: { major: "G", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 0],[5, 2],[4, -1],[4, 2],[3, 1],[3, 2],[2, -1],[2, 1],[1, 0],[0, -1],[0, 0],[0, 2]],
          CAGEDassigments: { major: "E", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 2],[3, 1],[3, 2],[3, 4],[2, 1],[2, 4],[1, 4],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "E", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, 0],[4, -1],[4, 0],[3, -3],[3, -1],[2, -3],[1, -3],[1, -2],[1, 0],[0, -3],[0, 0]],
          CAGEDassigments: { major: "C", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[4, -1],[4, 0],[4, 2],[3, -1],[3, 2],[2, 1],[2, 2],[1, 0],[1, 2],[0, 0]],
          CAGEDassigments: { major: "A", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 4],[4, 0],[4, 2],[4, 4],[3, 2],[2, 1],[2, 2],[1, 0],[1, 2],[0, 0],[0, 4]],
          CAGEDassigments: { major: "A", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, 0],[4, 4],[3, 0],[3, 2],[3, 4],[2, 2],[1, 2],[1, 3],[0, 0],[0, 2]],
          CAGEDassigments: { major: "D", minor: "" },
        },
      },
    },
  },
  _6: {
    label: "6",
    type: "Arpeggio",
    intervals: [_1, _M3, _5, _M6],
    semitoneOffsetFromMajorTonicRoot: {
      Tonic: [_1],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 0],[4, -1],[3, -3],[3, -1],[2, -3],[1, -3],[1, 0],[0, -3],[0, 0]],
          CAGEDassigments: { major: "G", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 0],[4, -1],[4, 2],[3, -1],[3, 2],[2, 1],[1, 0],[1, 2],[0, 0]],
          CAGEDassigments: { major: "E", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 4],[4, 2],[4, 4],[3, 2],[2, 1],[2, 4],[1, 2],[0, 0],[0, 4]],
          CAGEDassigments: { major: "E", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, 0],[4, -3],[4, 0],[3, -1],[2, -3],[2, -1],[1, -2],[0, -3],[0, 0]],
          CAGEDassigments: { major: "C", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, 0],[3, -1],[3, 2],[2, -1],[2, 2],[1, 2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "A", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, 0],[4, 4],[3, 2],[3, 4],[2, 2],[1, 2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "A", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 2],[4, 0],[4, 2],[3, 0],[3, 4],[2, 2],[1, 0],[1, 3],[0, 2]],
          CAGEDassigments: { major: "D", minor: "" },
        },
      },
    },
  },
  m7: {
    label: "m7",
    type: "Arpeggio",
    intervals: [_1, _m3, _5, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      Tonic: [_M3, _M6],
      tonic: [_M6],
      Subdomi: [_M6, _M2],
      subdomi: [_M2],
      mediant: [_M3],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -2],[3, -3],[3, 0],[2, -3],[2, 0],[1, 0],[0, -2],[0, 0]],
          CAGEDassigments: { major: "D", minor: "G" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -2],[4, 2],[3, 0],[3, 2],[2, 0],[1, 0],[0, -2],[0, 0]],
          CAGEDassigments: { major: "D", minor: "E" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 2],[3, 0],[3, 2],[2, 0],[1, 0],[1, 3],[0, 0],[0, 3]],
          CAGEDassigments: { major: "C", minor: "E" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -4],[5, 0],[4, -2],[4, 0],[3, -2],[2, -3],[2, 0],[1, -2],[0, -4],[0, 0]],
          CAGEDassigments: { major: "A", minor: "C" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[4, -2],[4, 0],[3, -2],[3, 2],[2, 0],[2, 2],[1, 1],[0, 0]],
          CAGEDassigments: { major: "G", minor: "A" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 0],[4, 3],[3, 2],[2, 0],[2, 2],[1, 1],[0, 0],[0, 3]],
          CAGEDassigments: { major: "E", minor: "A" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 1],[4, 0],[4, 3],[3, 0],[3, 3],[2, 2],[1, 1],[1, 3],[0, 1]],
          CAGEDassigments: { major: "A", minor: "D" },
        },
      },
    },
  },
  m_add9: {
    label: "m(add9)",
    type: "Arpeggio",
    intervals: [_1, _m3, _5, _M9],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: [_M6],
      subdomi: [_M2],
      Subdomi: [_M6],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[4, -3],[4, -2],[3, -3],[2, -3],[2, -1],[2, 0],[1, 0],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, -2],[4, 2],[3, 2],[2, -1],[2, 0],[1, 0],[0, 0],[0,2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 2],[3, 2],[3, 4],[2, 0],[1, 0],[0, 0],[0, 2],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -4],[5, 0],[4, 0],[3, -3],[3, -2],[2, -3],[1, -2],[1, 0],[0, -4],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[4, 0],[4, 2],[3, -2],[3, 2],[2, 2],[1, 0],[1, 1],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[4, 0],[4, 2],[4, 3],[3, 2],[2, 2],[1, 0],[1, 1],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[4, 0],[3, 0],[3, 2],[3, 3],[2, 2],[1, 3],[0, 0],[0, 1]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  m9: {
    label: "m9",
    type: "Arpeggio",
    intervals: [_1, _m3, _5, _m7, _M9],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: [_M6],
      subdomi: [_M2],
      Subdomi: [_M6],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -3],[4, -2],[3, -3],[3, 0],[2, -3],[2, -1],[2, 0],[1, 0],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -2],[4, 2],[3, 0],[3, 2],[2, -1],[2, 0],[1, 0],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 2],[3, 0],[3, 2],[3, 4],[2, 0],[1, 0],[1, 3],[0, 0],[0, 2],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -4],[5, 0],[4, -2],[4, 0],[3, -3],[3, -2],[2, -3],[2, 0],[1, -2],[1, 0],[0, -4],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[4, -2],[4, 0],[4, 2],[3, -2],[3, 2],[2, 0],[1, -2],[1, 0],[1, 1],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 0],[4, 2],[4, 3],[3, 2],[2, 0],[2, 2],[1, 0],[1, 1],[0, 0],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[4, 0],[4, 3],[3, 0],[3, 2],[3, 3],[2, 2],[1, 1],[1, 3],[0, 0],[0, 1]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  dominant: {
    label: "7",
    type: "Arpeggio",
    intervals: [_1, _M3, _5, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      Domi: [_5, _m2],
      DomiPh: [_M3],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -1],[3, -3],[3, 0],[2, -3],[1, -3],[1, 0],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -1],[3, -3],[3, 0],[2, -3],[2, 1],[1, 0],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -1],[4, 2],[3, 0],[3, 2],[2, 1],[1, 0],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -1],[4, 2],[3, 0],[3, 2],[2, 1],[1, 0],[1, 3],[0, 0],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 4],[4, 2],[3, 0],[3, 2],[2, 1],[1, 0],[1, 3],[0, 0],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v6: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 4],[4, 2],[3, 0],[3, 2],[2, 1],[2, 4],[1, 3],[0, 0],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, 0],[4, -2],[4, 0],[3, -1],[2, -3],[2, 0],[1, -2],[0, -3],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[4, -2],[4, 0],[3, -1],[3, 2],[2, 0],[2, 2],[1, 2],[0, 0],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 0],[4, 4],[3, 2],[2, 0],[2, 2],[1, 2],[0, 0],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v4: {
          // prettier-ignore
          coordinates: [[5, 2],[4, 0],[4, 3],[3, 0],[2, -1],[2, 2],[1, 1],[1, 3],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 2],[4, 0],[4, 3],[3, 0],[3, 4],[2, 2],[1, 1],[1, 3],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  "7b9": {
    label: "7b9",
    type: "Arpeggio",
    intervals: [_1, _M3, _5, _m7, _m9],
    semitoneOffsetFromMajorTonicRoot: {
      Domi: [_5, _m2],
      DomiPh: [_M3],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -4],[4, -1],[3, -3],[3, 0],[2, -3],[2, -2],[1, -3],[1, 0],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 1],[4, -1],[3, -3],[3, 0],[2, -3],[2, -2],[1, -3],[1, 0],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 1],[4, -1],[4, 2],[3, 0],[3, 2],[2, -2],[2, 1],[1, 0],[0, -2],[0, 0],[0, 1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[5, 4],[4, 2],[3, 0],[3, 2],[3, 3],[2, 1],[1, 0],[1, 3],[0, 0],[0, 1],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, 0],[4, -2],[4, 0],[3, -4],[3, -1],[2, -3],[2, 0],[1, -2],[1, -1],[0, -3],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -3],[5, 0],[4, -2],[4, 0],[4, 1],[3, -1],[2, -3],[2, 0],[1, -2],[1, -1],[0, -3],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[4, -2],[4, 0],[4, 1],[3, -1],[3, 2],[2, 0],[2, 2],[1, -1],[1, 2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 0],[4, 1],[4, 4],[3, 2],[2, 0],[2, 2],[2, 3],[1, 2],[0, 0],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 2],[4, 0],[4, 3],[3, 0],[3, 1],[2, -1],[2, 2],[1, 1],[1, 3],[0, -1],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 2],[4, 0],[4, 3],[3, 0],[3, 1],[3, 4],[2, 2],[1, 1],[1, 3],[1, 4],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  m7b5: {
    label: "m7b5",
    type: "Arpeggio",
    intervals: [_1, _m3, _T, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      Domi: [_M7],
      subdomi: [_M7],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -2],[3, -4],[3, 0],[2, -3],[1, -4],[1, -1],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -2],[4, 1],[3, 0],[2, -3],[2, 0],[1, -1],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 1],[3, 0],[3, 2],[2, 0],[2, 3],[1, 3],[0, 0],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 1],[4, 5],[3, 2],[3, 5],[2, 3],[1, 3],[1, 5],[0, 3],[0, 6]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -4],[5, -1],[4, -2],[4, 0],[3, -2],[2, -4],[2, 0],[1, -2],[0, -4],[0, -1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -1],[4, -2],[4, 0],[3, -2],[3, 1],[2, 0],[1, -2],[1, 1],[0, -1],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 3],[4, 0],[4, 3],[3, 1],[2, 0],[2, 2],[1, 1],[0, -1],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 3],[4, 0],[4, 3],[3, 1],[2, 0],[2, 2],[1, 1],[1, 4],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 3],[4, 0],[4, 3],[3, 1],[3, 5],[2, 2],[2, 5],[1, 4],[0, 3],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 1],[4, -1],[3, -2],[3, 0],[2, -2],[1, -3],[1, 1],[0, -2],[0, 1]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  dim7: {
    label: "dim7",
    type: "Arpeggio",
    intervals: [_1, _m3, _T, _M6],
    semitoneOffsetFromMajorTonicRoot: {
      Domi: [_M7],
      DomiPh: [_M7],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[4, -2],[3, -4],[3, -1],[2, -3],[1, -4],[1, -1],[0, -3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[4, -2],[4, 1],[3, -1],[2, -3],[2, 0],[1, -1],[0, -3],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[4, -2],[4, 1],[3, -1],[3, 2],[2, 0],[1, -1],[1, 2],[0, 0],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 1],[3, -1],[3, 2],[2, 0],[1, -1],[1, 2],[0, 0],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 1],[3, -1],[3, 2],[2, 0],[2, 3],[1, 2],[0, 0],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v6: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 1],[4, 4],[3, 2],[2, 0],[2, 3],[1, 2],[0, 0],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v7: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 1],[4, 4],[3, 2],[3, 5],[2, 3],[2, 6],[1, 5],[0, 3],[0, 6]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v8: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 1],[4, 4],[3, 2],[3, 5],[2, 3],[2, 6],[1, 5],[1, 8],[0, 6],[0, 9]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[4, 0],[3, -2],[2, -4],[2, -1],[1, -2],[0, -4],[0, -1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[4, 0],[3, -2],[3, 1],[2, -1],[1, -2],[1, 1],[0, -1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[4, 0],[4, 3],[3, 1],[3, 4],[2, 2],[1, 1],[1, 4],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[4, 0],[4, 3],[3, 1],[3, 4],[2, 2],[2, 5],[1, 4],[1, 7],[0, 5],[0, 8]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[3, 0],[2, -2],[1, -3],[1, 0],[0, -2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[3, 0],[2, -2],[2, 1],[1, 0],[0, -2],[0, 1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[3, 0],[3, 3],[2, 1],[2, 4],[1, 3],[0, 1],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[3, 0],[3, 3],[2, 1],[2, 4],[1, 3],[1, 6],[0, 4],[0, 7]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  alt: {
    label: "alt",
    type: "Scale",
    intervals: [_1, _m2, _m3, _M3, _T, _m6, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      Domi: [_5],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -4],[4, -2],[4, -1],[3, -4],[3, -2],[3, 0],[2, -3],[2, -2],[2, 0],[1, -3],[1, -1],[0, -4],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -4],[4, -2],[4, -1],[3, -4],[3, -2],[3, 0],[2, -3],[2, -2],[2, 0],[1, -3],[1, -1],[1, 1],[0, -2],[0, 0],[0, 1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 1],[4, -2],[4, -1],[4, 1],[3, -2],[3, 0],[3, 2],[2, -2],[2, 0],[2, 1],[1, -1],[1, 1],[0, -2],[0, 0],[0, 1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[5, 3],[4, -1],[4, 1],[4, 3],[3, 0],[3, 2],[3, 3],[2, 0],[2, 1],[2, 3],[1, 1],[1, 3],[0, 0],[0, 1],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[5, 3],[4, -1],[4, 1],[4, 3],[3, 0],[3, 2],[3, 3],[2, 0],[2, 1],[2, 3],[1, 1],[1, 3],[1, 4],[0, 1],[0, 3],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -4],[5, -3],[5, -1],[4, -4],[4, -2],[4, 0],[3, -4],[3, -2],[3, -1],[2, -4],[2, -2],[1, -4],[1, -2],[1, -1],[0, -4],[0, -3],[0, -1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -4],[5, -3],[5, -1],[4, -4],[4, -2],[4, 0],[3, -4],[3, -2],[3, -1],[2, -4],[2, -2],[2, 0],[1, -2],[1, -1],[1, 1],[0, -3],[0, -1],[0, 1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -3],[5, -1],[5, 1],[4, -2],[4, 0],[4, 1],[3, -2],[3, -1],[3, 1],[2, -2],[2, 0],[2, 2],[1, -1],[1, 1],[1, 2],[0, -1],[0, 1],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 1],[5, 3],[4, 0],[4, 1],[4, 3],[3, -1],[3, 1],[3, 3],[2, 0],[2, 2],[2, 3],[1, 1],[1, 2],[1, 4],[0, 1],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 1],[5, 2],[4, -1],[4, 1],[4, 3],[3, 0],[3, 1],[3, 3],[2, -1],[2, 1],[1, -1],[1, 1],[1, 3],[0, -1],[0, 1],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 1],[5, 2],[4, -1],[4, 1],[4, 3],[3, 0],[3, 1],[3, 3],[2, -1],[2, 1],[2, 3],[1, 1],[1, 3],[1, 4],[0, 1],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 1],[5, 2],[5, 4],[4, 1],[4, 3],[3, 0],[3, 1],[3, 3],[2, -1],[2, 1],[2, 3],[1, 1],[1, 3],[1, 4],[0, 1],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  minor_pent: {
    label: "Minor Pentatonic",
    type: "Scale",
    intervals: [_1, _m3, _4, _5, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      Tonic: [_M6],
      tonic: [_M6],
      subdomi: [_M2],
      Domi: [_5, _M3],
      mediant: [_M3],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -2],[4, 0],[3, -3],[3, 0],[2, -3],[2, 0],[1, -2],[1, 0],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -2],[4, 0],[4, 2],[3, 0],[3, 2],[2, 0],[2, 2],[1, 0],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 0],[4, 2],[3, 0],[3, 2],[2, 0],[2, 2],[1, 0],[1, 3],[0, 0],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -2],[4, 0],[3, -2],[3, 0],[2, -3],[2, 0],[1, -2],[1, 1],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[4, -2],[4, 0],[3, -2],[3, 0],[3, 2],[2, 0],[2, 2],[1, 1],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 3],[4, 0],[4, 3],[3, 0],[3, 2],[2, 0],[2, 2],[1, 1],[1, 3],[0, 0],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 1],[5, 3],[4, 0],[4, 3],[3, 0],[3, 3],[2, 0],[2, 2],[1, 1],[1, 3],[0, 1],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  major_pent: {
    label: "Major Pentatonic",
    type: "Scale",
    intervals: [_1, _M2, _M3, _5, _M6],
    semitoneOffsetFromMajorTonicRoot: {
      Tonic: [_1],
      tonic: [_1],
      Subdomi: [_4],
      subdomi: [_4],
      Domi: [_5],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, 0],[4, -3],[4, -1],[3, -3],[3, -1],[2, -3],[2, -1],[1, -3],[1, 0],[0, -3],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, -1],[4, 2],[3, -1],[3, 2],[2, -1],[2, 1],[1, 0],[1, 2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 2],[4, 4],[3, 2],[3, 4],[2, 1],[2, 4],[1, 2],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, 0],[4, -3],[4, 0],[3, -3],[3, -1],[2, -3],[2, -1],[1, -2],[1, 0],[0, -3],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, 0],[4, 2],[3, -1],[3, 2],[2, -1],[2, 2],[1, 0],[1, 2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, 0],[4, 2],[4, 4],[3, 2],[3, 4],[2, 2],[2, 4],[1, 2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, 0],[4, 2],[3, 0],[3, 2],[2, -1],[2, 2],[1, 0],[1, 3],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  no_avoid_notes_t_s_major: {
    label: 'No "avoid notes"',
    type: "Set",
    intervals: [_1, _M2, _M3, _5, _M6, _M7],
    semitoneOffsetFromMajorTonicRoot: {
      Tonic: [_1],
      tonic: [_1],
      Subdomi: [_4],
      subdomi: [_4],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, -1],[5, 0],[4, -3],[4, -1],[3, -3],[3, -1],[3, 1],[2, -3],[2, -1],[1, -3],[1, 0],[0, -3],[0, -1],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 0],[5, 2],[4, -1],[4, 2],[3, -1],[3, 1],[3, 2],[2, -1],[2, 1],[1, 0],[1, 2],[0, -1],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 4],[1, 2],[1, 4],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, 0],[4, -3],[4, -1],[4, 0],[3, -3],[3, -1],[2, -3],[2, -1],[1, -3],[1, -2],[1, 0],[0, -3],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, -1],[4, 0],[4, 2],[3, -1],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  ionian: {
    label: "Ionian",
    type: "Scale",
    intervals: [_1, _M2, _M3, _4, _5, _M6, _M7],
    semitoneOffsetFromMajorTonicRoot: {
      Tonic: [_1],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, -1],[5, 0],[4, -3],[4, -1],[4, 0],[3, -3],[3, -1],[3, 1],[2, -3],[2, -1],[1, -3],[1, -2],[1, 0],[0, -3],[0, -1],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 0],[5, 2],[4, -1],[4, 0],[4, 2],[3, -1],[3, 1],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[0, -1],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 2],[1, 0],[1, 2],[1, 4],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 4],[1, 5],[0, 2],[0, 4],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, -2],[5, 0],[4, -3],[4, -1],[4, 0],[3, -3],[3, -1],[3, 0],[2, -3],[2, -1],[1, -3],[1, -2],[1, 0],[0, -3],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -1],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 1],[1, -2],[1, 0],[1, 2],[0, -2],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -1],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 3],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 4],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  aeolian: {
    label: "Aeolian",
    type: "Scale",
    intervals: [_1, _M2, _m3, _4, _5, _m6, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: [_M6],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -4],[5, -2],[5, 0],[4, -3],[4, -2],[4, 0],[3, -3],[3, -2],[3, 0],[2, -3],[2, -1],[1, -4],[1, -2],[1, 0],[0, -4],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -4],[5, -2],[5, 0],[4, -3],[4, -2],[4, 0],[3, -3],[3, -2],[3, 0],[2, -3],[2, -1],[2, 0],[1, -2],[1, 0],[0, -4],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -1],[2, 0],[1, -2],[1, 0],[1, 1],[0, -2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 2],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 2],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v6: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 2],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -4],[5, -2],[5, 0],[4, -4],[4, -2],[4, 0],[3, -3],[3, -2],[3, 0],[2, -3],[2, -2],[1, -4],[1, -2],[1, 0],[0, -4],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -4],[5, -2],[5, 0],[4, -4],[4, -2],[4, 0],[3, -3],[3, -2],[3, 0],[2, -3],[2, -2],[2, 0],[1, -2],[1, 0],[0, -4],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 1],[4, -2],[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -2],[2, 0],[1, -2],[1, 0],[1, 1],[0, -2],[0, 0],[0, 1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 1],[4, -2],[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -2],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 1],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[5, 3],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 3],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 1],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[5, 3],[4, 0],[4, 1],[4, 3],[3, 0],[3, 2],[3, 3],[2, 0],[2, 2],[2, 3],[1, 1],[1, 3],[1, 5],[0, 1],[0, 3],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  dorian: {
    label: "Dorian",
    type: "Scale",
    intervals: [_1, _M2, _m3, _4, _5, _M6, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      tonic: [_M6],
      Subdomi: [_M2],
      subdomi: [_M2],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, -2],[5, 0],[4, -3],[4, -2],[4, 0],[3, -3],[3, -1],[3, 0],[2, -3],[2, -1],[2, 0],[1, -2],[1, 0],[0, -3],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 0],[1, -2],[1, 0],[1, 2],[0, -2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 2],[0, -2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -4],[5, -2],[5, 0],[4, -3],[4, -2],[4, 0],[3, -3],[3, -2],[3, 0],[2, -3],[2, -1],[2, 0],[1, -2],[1, 0],[0, -4],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -1],[2, 0],[1, -2],[1, 0],[1, 1],[0, -2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 1],[0, -2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 2],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[5, 3],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 3],[2, 0],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 1],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[5, 3],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 3],[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 1],[0, 3],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  lydian: {
    label: "Lydian",
    type: "Scale",
    intervals: [_1, _M2, _M3, _T, _5, _M6, _M7],
    semitoneOffsetFromMajorTonicRoot: {
      Tonic: [_1],
      Subdomi: [_4],
      subdomi: [_4],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, -1],[5, 0],[4, -3],[4, -1],[4, 1],[3, -3],[3, -1],[3, 1],[2, -3],[2, -1],[1, -3],[1, -1],[1, 0],[0, -3],[0, -1],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 0],[5, 2],[4, -1],[4, 1],[4, 2],[3, -1],[3, 1],[3, 2],[2, -1],[2, 1],[1, -1],[1, 0],[1, 2],[0, -1],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 1],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 3],[1, 0],[1, 2],[1, 4],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 1],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 3],[2, 4],[1, 2],[1, 4],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 1],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 3],[2, 4],[1, 2],[1, 4],[1, 5],[0, 2],[0, 4],[0, 6]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, -1],[5, 0],[4, -3],[4, -1],[4, 0],[3, -3],[3, -1],[3, 1],[2, -3],[2, -1],[1, -3],[1, -2],[1, 0],[0, -3],[0, -1],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -3],[5, -1],[5, 0],[4, -3],[4, -1],[4, 0],[3, -3],[3, -1],[3, 1],[2, -3],[2, -1],[2, 1],[1, -2],[1, 0],[0, -3],[0, -1],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -1],[5, 0],[5, 2],[4, -1],[4, 0],[4, 2],[3, -1],[3, 1],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[0, -1],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 1],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 4],[1, 5],[0, 2],[0, 4],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 4],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  mixolydian: {
    label: "Mixolydian",
    type: "Scale",
    intervals: [_1, _M2, _M3, _4, _5, _M6, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      Domi: [_5],
      DomiPh: [_M3],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, -2],[5, 0],[4, -3],[4, -1],[4, 0],[3, -3],[3, -1],[3, 0],[2, -3],[2, -1],[1, -3],[1, -2],[1, 0],[0, -3],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -1],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 1],[1, -2],[1, 0],[1, 2],[0, -2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -1],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[0, -2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -1],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 1],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 1],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v6: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 4],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 1],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 4],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, -2],[5, 0],[4, -3],[4, -2],[4, 0],[3, -3],[3, -1],[3, 0],[2, -3],[2, -1],[2, 0],[1, -2],[1, 0],[0, -3],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 0],[1, -2],[1, 0],[1, 2],[0, -2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 2],[0, -2],[0, 0],[0, 2]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 2],[4, -2],[4, 0],[4, 2],[3, -1],[3, 0],[3, 2],[2, -1],[2, 0],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v5: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[1, 0],[1, 2],[1, 3],[0, 0],[0, 2],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v6: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 2],[1, 3],[0, 0],[0, 2],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v7: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 4],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 2],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 2],[5, 3],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 4],[2, 0],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 2],[0, 3],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
  phrygian_dominant: {
    label: "Phrygian Dominant",
    type: "Scale",
    intervals: [_1, _m2, _M3, _4, _5, _m6, _m7],
    semitoneOffsetFromMajorTonicRoot: {
      DomiPh: [_M3],
    },
    shapeVariants: {
      strE: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -4],[5, -2],[5, 0],[4, -4],[4, -1],[4, 0],[3, -3],[3, -2],[2, -3],[2, -2],[1, -3],[1, -2],[1, 0],[0, -4],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 1],[4, -1],[4, 0],[4, 2],[3, -2],[3, 0],[3, 2],[2, -2],[2, 1],[1, -2],[1, 0],[1, 1],[0, -2],[0, 0],[0, 1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[5, 4],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 3],[2, 1],[2, 2],[1, 0],[1, 1],[1, 3],[0, 0],[0, 1],[0, 4]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[5, 4],[4, 0],[4, 2],[4, 3],[3, 0],[3, 2],[3, 3],[2, 1],[2, 2],[2, 4],[1, 1],[1, 3],[1, 5],[0, 1],[0, 4],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strA: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -3],[5, -2],[5, 0],[4, -4],[4, -2],[4, 0],[3, -4],[3, -1],[3, 0],[2, -3],[2, -2],[1, -4],[1, -2],[1, -1],[0, -3],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v2: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 1],[4, -2],[4, 0],[4, 1],[3, -1],[3, 0],[2, -3],[2, -2],[2, 0],[1, -2],[1, -1],[0, -3],[0, -2],[0, 0]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v3: {
          // prettier-ignore
          coordinates: [[5, -2],[5, 0],[5, 1],[4, -2],[4, 0],[4, 1],[3, -1],[3, 0],[3, 2],[2, -2],[2, 0],[2, 2],[1, -1],[1, 2],[0, -2],[0, 0],[0, 1]],
          CAGEDassigments: { major: "", minor: "" },
        },
        v4: {
          // prettier-ignore
          coordinates: [[5, 0],[5, 1],[5, 3],[4, 0],[4, 1],[4, 4],[3, 0],[3, 2],[3, 3],[2, 0],[2, 2],[2, 3],[1, 2],[1, 3],[0, 0],[0, 1],[0, 3]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
      strD: {
        v1: {
          // prettier-ignore
          coordinates: [[5, -4],[5, -1],[5, 0],[4, -3],[4, -2],[3, 0],[3, 1],[3, 4],[2, 0],[2, 2],[2, 3],[1, 1],[1, 3],[1, 4],[0, 2],[0, 3],[0, 5]],
          CAGEDassigments: { major: "", minor: "" },
        },
      },
    },
  },
};
