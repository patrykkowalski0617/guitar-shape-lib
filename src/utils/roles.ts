import { getSemitonesMap } from "./intervals";
import type { MusicModeId } from "./musicMode";

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

export type RoleId = "tonic" | "subdominant" | "dominant";

export interface Shape {
  id: string;
  semitoneOffsetFromMajorTonicRoot: {
    majorMode?: number[];
    minorMode?: number[];
    bothModes?: number[];
  };
  chordShapeId: string;
  excludeMode?: MusicModeId;
}

export interface RoleData {
  label: string;
  descriptiveLabel: string;
  shapes: Shape[];
}

export const roles: Record<RoleId, RoleData> = {
  tonic: {
    label: "Tonic",
    descriptiveLabel: "Release",
    shapes: [
      {
        id: "tonics-root-shape_M7",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_1] },
        chordShapeId: "M7",
      },
      {
        id: "tonics-root-shape_m7",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M3, _M6] },
        chordShapeId: "m7",
      },
      {
        id: "tonics-root-shape_M_add9",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_1] },
        chordShapeId: "M_add9",
      },
      {
        id: "tonics-root-shape_M9",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_1] },
        chordShapeId: "M9",
      },
      {
        id: "tonics-root-shape_m_add9",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M6] },
        chordShapeId: "m_add9",
      },
      {
        id: "tonics-root-shape_major_pent",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_1] },
        chordShapeId: "major_pent",
      },
      {
        id: "tonics-root-shape_minor_pent",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M6, _M3] },
        chordShapeId: "minor_pent",
      },
      {
        id: "tonics-root-shape_no_avoid_notes_t_s_major",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_1] },
        chordShapeId: "no_avoid_notes_t_s_major",
      },
      {
        id: "tonics-root-shape_ionian",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_1] },
        chordShapeId: "ionian",
      },
      {
        id: "tonics-root-shape_aeolian",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M6] },
        chordShapeId: "aeolian",
      },
      {
        id: "tonics-root-shape_dorian",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M6] },
        chordShapeId: "dorian",
      },
    ],
  },
  subdominant: {
    label: "Subdominant",
    descriptiveLabel: "Motion",
    shapes: [
      {
        id: "subdominants-root_4-shape_M7",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_4] },
        chordShapeId: "M7",
      },
      {
        id: "subdominants-root_M6-shape_m7",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M6] },
        chordShapeId: "m7",
      },
      {
        id: "subdominants-root_M2-shape_m7",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M2] },
        chordShapeId: "m7",
      },
      {
        id: "subdominants-root_4-shape_M_add9",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_4] },
        chordShapeId: "M_add9",
      },
      {
        id: "subdominants-root_4-shape_major_pent",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_4] },
        chordShapeId: "major_pent",
      },
      {
        id: "subdominants-root_M2-shape_minor_pent",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M2] },
        chordShapeId: "minor_pent",
      },
      {
        id: "subdominants-root_M6-shape_minor_pent",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M6] },
        chordShapeId: "minor_pent",
      },
      {
        id: "subdominants-root_4-shape_no_avoid_notes_t_s_major",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_4] },
        chordShapeId: "no_avoid_notes_t_s_major",
      },
      {
        id: "subdominants-root_4-shape_lydian",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_4] },
        chordShapeId: "lydian",
      },
      {
        id: "subdominants-root_M2-shape_dorian",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M2] },
        chordShapeId: "dorian",
      },
    ],
  },
  dominant: {
    label: "Dominant",
    descriptiveLabel: "Tension",
    shapes: [
      {
        id: "dominant-root_5-shape-dominant",
        semitoneOffsetFromMajorTonicRoot: { majorMode: [_5], minorMode: [_M3] },
        chordShapeId: "dominant",
      },
      {
        id: "dominant-root_5-shape-m7b5",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M7] },
        chordShapeId: "m7b5",
      },
      {
        id: "dominant-root_5-shape-dim7",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M7] },
        chordShapeId: "dim7",
      },
      {
        id: "dominant-root_5-shape-mixolydian",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_5] },
        chordShapeId: "mixolydian",
      },
      {
        id: "dominant-root_5-shape-major_pent",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_5] },
        chordShapeId: "major_pent",
      },
      {
        id: "dominant-root_5-shape-minor_pent",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_M3] },
        chordShapeId: "minor_pent",
      },
      {
        id: "dominant-root_5-shape-minor_pent-2",
        semitoneOffsetFromMajorTonicRoot: { bothModes: [_5] },
        chordShapeId: "minor_pent",
      },
    ],
  },
};
