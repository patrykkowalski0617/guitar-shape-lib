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

export type RoleId = "tonic" | "subdominant" | "dominant";

export interface Shape {
  id: string;
  semitoneOffsetFromMajorTonicRoot: number;
  chordShapeId: string;
}

export interface RoleData {
  label: string;
  descriptiveLabel: string;
  shapes?: Shape[];
}

export const roles: Record<RoleId, RoleData> = {
  tonic: {
    label: "Tonic",
    descriptiveLabel: "Release",
    shapes: [
      {
        id: "tonics-root_1-shape_M7",
        semitoneOffsetFromMajorTonicRoot: _1,
        chordShapeId: "M7",
      },
      {
        id: "tonics-root_M3-shape_m7",
        semitoneOffsetFromMajorTonicRoot: _M3,
        chordShapeId: "m7",
      },
      {
        id: "tonics-root_M6-shape_m7",
        semitoneOffsetFromMajorTonicRoot: _M6,
        chordShapeId: "m7",
      },
      {
        id: "tonics-root_1-shape_M_add9",
        semitoneOffsetFromMajorTonicRoot: _1,
        chordShapeId: "M_add9",
      },
      {
        id: "tonics-root_1-shape_M9",
        semitoneOffsetFromMajorTonicRoot: _1,
        chordShapeId: "M9",
      },
      {
        id: "tonics-root_1-shape_m_add9",
        semitoneOffsetFromMajorTonicRoot: _M6,
        chordShapeId: "m_add9",
      },
      {
        id: "tonics-root_1-shape_major_pent",
        semitoneOffsetFromMajorTonicRoot: _1,
        chordShapeId: "major_pent",
      },
      {
        id: "tonics-root_M6-shape_minor_pent",
        semitoneOffsetFromMajorTonicRoot: _M6,
        chordShapeId: "minor_pent",
      },
      {
        id: "tonics-root_M3-shape_minor_pent",
        semitoneOffsetFromMajorTonicRoot: _M3,
        chordShapeId: "minor_pent",
      },
      {
        id: "tonics-root_1-shape_no_avoid_notes_t_s_major",
        semitoneOffsetFromMajorTonicRoot: _1,
        chordShapeId: "no_avoid_notes_t_s_major",
      },
      {
        id: "tonics-root_1-shape_ionian",
        semitoneOffsetFromMajorTonicRoot: _1,
        chordShapeId: "ionian",
      },
      {
        id: "tonics-root_M6-shape_aeolian",
        semitoneOffsetFromMajorTonicRoot: _M6,
        chordShapeId: "aeolian",
      },
      {
        id: "tonics-root_M6-shape_dorian",
        semitoneOffsetFromMajorTonicRoot: _M6,
        chordShapeId: "dorian",
      },
    ],
  },
  subdominant: { label: "Subdominant", descriptiveLabel: "Motion" },
  dominant: { label: "Dominant", descriptiveLabel: "Tension" },
};
