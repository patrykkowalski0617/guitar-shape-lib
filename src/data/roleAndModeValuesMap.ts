import type { RoleId } from "./roles";

export interface RoleAndModeValue {
  role: RoleId;
  isMajorMode: boolean;
  semitoneOffsetFromC: number;
}

export const roleAndModeValuesMap: RoleAndModeValue[] = [
  {
    role: "tonic",
    isMajorMode: true,
    semitoneOffsetFromC: 0,
  },
  {
    role: "subdominant",
    isMajorMode: false,
    semitoneOffsetFromC: 2,
  },
  {
    role: "dominant",
    isMajorMode: false,
    semitoneOffsetFromC: 4,
  },
  {
    role: "subdominant",
    isMajorMode: true,
    semitoneOffsetFromC: 5,
  },
  {
    role: "dominant",
    isMajorMode: true,
    semitoneOffsetFromC: 7,
  },
  {
    role: "tonic",
    isMajorMode: false,
    semitoneOffsetFromC: 9,
  },
  {
    role: "mediant",
    isMajorMode: false,
    semitoneOffsetFromC: 4,
  },
];
