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

export interface RoleData {
  label: string;
  descriptiveLabel: string;
}

export const roles: Record<RoleId, RoleData> = {
  tonic: {
    label: "Tonic",
    descriptiveLabel: "Release",
  },
  subdominant: {
    label: "Subdominant",
    descriptiveLabel: "Motion",
  },
  dominant: {
    label: "Dominant",
    descriptiveLabel: "Tension",
  },
};
