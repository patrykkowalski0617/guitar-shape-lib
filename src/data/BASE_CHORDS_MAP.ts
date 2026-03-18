import type { RoleId } from "./roles";

export interface BaseChordValue {
  id: string;
  role: RoleId;
  isMajorMode: boolean;
  semitoneOffsetFromC: number;
}

export const BASE_CHORDS_MAP: BaseChordValue[] = [
  {
    id: "0",
    role: "tonic",
    isMajorMode: true,
    semitoneOffsetFromC: 0,
  },
  {
    id: "1",
    role: "subdominant",
    isMajorMode: false,
    semitoneOffsetFromC: 2,
  },
  {
    id: "2",
    role: "dominant",
    isMajorMode: true,
    semitoneOffsetFromC: 4,
  },
  {
    id: "3",
    role: "mediant",
    isMajorMode: false,
    semitoneOffsetFromC: 4,
  },
  {
    id: "4",
    role: "subdominant",
    isMajorMode: true,
    semitoneOffsetFromC: 5,
  },
  {
    id: "5",
    role: "dominant",
    isMajorMode: true,
    semitoneOffsetFromC: 7,
  },
  {
    id: "6",
    role: "tonic",
    isMajorMode: false,
    semitoneOffsetFromC: 9,
  },
];
