import type { RoleId } from "./roles";

export type BaseChorId =
  | "Tonic"
  | "subdomi"
  | "mediant"
  | "DomiPh"
  | "Subdomi"
  | "Domi"
  | "tonic";
export interface BaseChordValue {
  id: BaseChorId;
  role: RoleId;
  isMajorMode: boolean;
  semitoneOffsetFromC: number;
}

export const BASE_CHORDS_MAP: BaseChordValue[] = [
  {
    id: "Tonic",
    role: "tonic",
    isMajorMode: true,
    semitoneOffsetFromC: 0,
  },
  {
    id: "subdomi",
    role: "subdominant",
    isMajorMode: false,
    semitoneOffsetFromC: 2,
  },
  {
    id: "DomiPh",
    role: "dominant",
    isMajorMode: true,
    semitoneOffsetFromC: 4,
  },
  {
    id: "mediant",
    role: "mediant",
    isMajorMode: false,
    semitoneOffsetFromC: 4,
  },
  {
    id: "Subdomi",
    role: "subdominant",
    isMajorMode: true,
    semitoneOffsetFromC: 5,
  },
  {
    id: "Domi",
    role: "dominant",
    isMajorMode: true,
    semitoneOffsetFromC: 7,
  },
  {
    id: "tonic",
    role: "tonic",
    isMajorMode: false,
    semitoneOffsetFromC: 9,
  },
];
