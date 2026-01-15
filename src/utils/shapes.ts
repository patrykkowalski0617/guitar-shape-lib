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

const shapes = [
  {
    id: "M7",
    label: "XM7",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _M7],
    shapes: [
      {
        id: "M7_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,-8],[1,7],[2,11],[2,12],[3,16],[4,19],[4,11],[5,24],[5,16]],
      },
      {
        id: "M7_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,-8],[1,7],[2,11],[2,12],[3,16],[4,19],[4,11],[5,24]],
      },
      {
        id: "M7_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,-8],[1,7],[2,11],[2,12],[3,16],[4,19],[4,11],[5,24]],
      },
      {
        id: "M7_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,-8],[1,7],[2,11],[2,12],[3,16],[4,19],[4,11],[5,24]],
      },
      {
        id: "M7_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,-8],[1,7],[2,11],[2,12],[3,16],[4,19],[4,11],[5,24]],
      },
      {
        id: "M7_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,-8],[1,7],[2,11],[2,12],[3,16],[4,19],[4,11],[5,24]],
      },
      {
        id: "M7_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,11],[2,12],[3,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M7_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,11],[2,12],[3,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M7_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,11],[2,12],[3,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M7_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,11],[2,12],[3,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M7_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,11],[3,12],[3,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M7_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,11],[3,12],[4,16],[4,19]],
      },
      {
        id: "M7_14a",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[3,11],[3,12],[4,16],[4,19]],
      },
      {
        id: "M7_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,11],[3,12],[3,16],[4,19],[5,23],[5,24]],
      },

      {
        id: "M7_15a",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[3,11],[3,12]],
      },
      {
        id: "M7_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,11],[3,12],[3,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M7_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,11],[3,12],[3,16],[4,19],[5,23],[5,24]],
      },
    ],
  },
  {
    id: "M_add9",
    label: "XM(add9)",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _M9],
    shapes: [
      {
        id: "M_add9_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[3,7],[5,24],[5,26],[5,16]],
      },

      {
        id: "M_add9_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[3,7],[5,24],[5,26],[5,16]],
      },
      {
        id: "M_add9_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[3,7],[5,24],[5,26],[5,16]],
      },
      {
        id: "M_add9_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[4,19],[5,24],[5,26],[5,16]],
      },
      {
        id: "M_add9_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[4,19],[5,24],[5,26],[5,16]],
      },
      {
        id: "M_add9_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,12],[2,2],[3,16],[4,19],[5,24],[5,26],[5,16]],
      },
      {
        id: "M_add9_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      {
        id: "M_add9_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      {
        id: "M_add9_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      {
        id: "M_add9_15a",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,-10],[1,4],[2,7],[3,12],[3,14],[3,4]],
      },

      {
        id: "M_add9_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      {
        id: "M_add9_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      {
        id: "M_add9_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,12],[3,14],[3,16],[4,19],[5,24],[5,26]],
      },
      {
        id: "M_add9_19",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
      {
        id: "M_add9_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
      {
        id: "M_add9_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
      {
        id: "M_add9_22",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
      {
        id: "M_add9_23",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
      {
        id: "M_add9_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,12],[3,14],[4,16],[4,19],[5,24]],
      },
    ],
  },
  {
    id: "M9",
    label: "XM9",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _M7, _M9],
    shapes: [
      {
        id: "M9_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,11],[2,12],[2,2],[3,16],[4,19],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "M9_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,11],[2,12],[2,2],[3,16],[4,19],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "M9_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,11],[2,12],[2,2],[3,16],[4,19],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "M9_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[2,11],[2,12],[2,2],[3,16],[4,19],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "M9_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      {
        id: "M9_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      {
        id: "M9_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      {
        id: "M9_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      {
        id: "M9_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      {
        id: "M9_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,11],[2,12],[3,14],[3,16],[4,19],[5,23],[5,24],[5,26]],
      },
      {
        id: "M9_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,11],[3,12],[3,14],[3,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M9_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,11],[3,12],[3,14],[3,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M9_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,11],[3,12],[3,14],[3,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M9_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,11],[3,12],[3,14],[3,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M9_19",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,11],[3,12],[3,14],[4,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M9_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,11],[3,12],[3,14],[4,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M9_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,11],[3,12],[3,14],[4,16],[4,19],[5,23],[5,24]],
      },
      {
        id: "M9_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[3,11],[3,12],[3,14],[4,16],[4,19],[5,23],[5,24]],
      },
    ],
  },
  {
    id: "dominant",
    label: "X7",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _m7],
    shapes: [
      {
        id: "dominant_10",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      {
        id: "dominant_11",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      {
        id: "dominant_12",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      {
        id: "dominant_13",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      {
        id: "dominant_14",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      {
        id: "dominant_15",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      {
        id: "dominant_17",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      {
        id: "dominant_18",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      {
        id: "dominant_19",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      {
        id: "dominant_20",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24],[5,28]],
      },
      {
        id: "dominant_22",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[4,22],[5,24]],
      },
      {
        id: "dominant_28",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[5,22],[5,24]],
      },
      {
        id: "dominant_29",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,4],[1,7],[2,10],[2,12],[3,16],[4,19],[5,22],[5,24]],
      },
      {
        id: "dominant_34",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[3,16],[4,19],[5,22],[5,24]],
      },
      {
        id: "dominant_36",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[3,16],[4,19],[5,22],[5,24]],
      },
      {
        id: "dominant_37",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[3,16],[4,19],[5,22],[5,24]],
      },
      {
        id: "dominant_38",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[3,16],[4,19],[5,22],[5,24]],
      },
      {
        id: "dominant_40",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[4,16],[4,19],[5,22],[5,24]],
      },
      {
        id: "dominant_41",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,4],[2,7],[2,10],[3,12],[4,16],[4,19],[5,22],[5,24]],
      },
    ],
  },
  {
    id: "7b9",
    label: "X7b9",
    type: "Arpegio",
    intervals: [_1, _M3, _5, _m7, _m9],
    shapes: [
      {
        id: "7b9_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "7b9_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "7b9_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "7b9_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "7b9_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "7b9_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,7],[2,10],[2,12],[2,13],[3,16],[4,19],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "7b9_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,10],[2,12],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_19",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_22",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_23",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[3,16],[4,19],[5,34],[5,24],[5,25]],
      },
      {
        id: "7b9_25",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      {
        id: "7b9_26",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      {
        id: "7b9_27",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      {
        id: "7b9_28",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      {
        id: "7b9_29",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      {
        id: "7b9_30",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[4,19],[5,34],[5,24]],
      },
      {
        id: "7b9_31",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
      {
        id: "7b9_32",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
      {
        id: "7b9_33",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
      {
        id: "7b9_34",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
      {
        id: "7b9_35",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
      {
        id: "7b9_36",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[2,19],[2,10],[3,24],[3,25],[4,28],[5,31],[5,34]],
      },
    ],
  },
  {
    id: "m7b5",
    label: "Xm7b5",
    type: "Arpegio",
    intervals: [_1, _m3, _T, _m7],
    shapes: [
      {
        id: "m7b5_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[3,18],[4,22],[5,24],[5,27]],
      },
      {
        id: "m7b5_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[4,18],[4,22]],
      },
      {
        id: "m7b5_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[3,18],[4,22],[5,24],[5,27]],
      },
      {
        id: "m7b5_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[3,18],[4,22],[5,24],[5,27]],
      },
      {
        id: "m7b5_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[3,18],[4,22],[5,24],[5,27]],
      },
      {
        id: "m7b5_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[2,10],[2,12],[3,15],[3,18],[4,22],[5,24],[5,27]],
      },
      {
        id: "m7b5_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[3,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_19",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_22",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_23",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
      {
        id: "m7b5_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,10],[3,12],[4,15],[4,18],[5,22],[5,24]],
      },
    ],
  },
  {
    id: "dim7",
    label: "Xdim7",
    type: "Arpegio",
    intervals: [_1, _m3, _T, _M6],
    shapes: [
      {
        id: "dim7_10",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      {
        id: "dim7_11",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      {
        id: "dim7_12",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      {
        id: "dim7_13",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      {
        id: "dim7_14",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      {
        id: "dim7_15",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,6],[1,9],[2,12],[3,15],[3,18],[4,21],[5,24],[5,27]],
      },
      {
        id: "dim7_16",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      {
        id: "dim7_17",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      {
        id: "dim7_18",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      {
        id: "dim7_19",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      {
        id: "dim7_20",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      {
        id: "dim7_22",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      {
        id: "dim7_24",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      {
        id: "dim7_25",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      {
        id: "dim7_26",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[3,15],[4,18],[5,21],[5,24]],
      },
      {
        id: "dim7_28",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[4,15],[4,18],[5,21]],
      },
      {
        id: "dim7_29",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[4,15],[4,18],[5,21]],
      },
      {
        id: "dim7_30",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[4,15],[4,18],[5,21]],
      },
      {
        id: "dim7_31",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,6],[2,9],[3,12],[4,15],[4,18],[5,21]],
      },
    ],
  },
  {
    id: "m7",
    label: "Xm7",
    type: "Arpegio",
    intervals: [_1, _m3, _5, _m7],
    shapes: [
      {
        id: "m7_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "m7_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "m7_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "m7_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "m7_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "m7_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,7],[2,10],[2,12],[3,15],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "m7_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      {
        id: "m7_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      {
        id: "m7_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      {
        id: "m7_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      {
        id: "m7_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      {
        id: "m7_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,7],[2,10],[2,12],[3,15],[4,19],[5,22],[5,24]],
      },
      {
        id: "m7_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
      {
        id: "m7_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
      {
        id: "m7_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
      {
        id: "m7_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
      {
        id: "m7_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
      {
        id: "m7_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,3],[2,7],[2,10],[3,12],[3,15],[4,19],[5,22],[5,24]],
      },
    ],
  },
  {
    id: "m_add9",
    label: "Xm(add9)",
    type: "Arpegio",
    intervals: [_1, _m3, _5, _M9],
    shapes: [
      {
        id: "m_add9_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      {
        id: "m_add9_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      {
        id: "m_add9_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      {
        id: "m_add9_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      {
        id: "m_add9_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      {
        id: "m_add9_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,7],[2,12],[2,14],[3,15],[4,19],[5,24],[5,26],[5,27]],
      },
      {
        id: "m_add9_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      {
        id: "m_add9_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      {
        id: "m_add9_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      {
        id: "m_add9_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      {
        id: "m_add9_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      {
        id: "m_add9_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,7],[2,12],[3,14],[3,15],[4,19],[5,24],[5,26]],
      },
      {
        id: "m_add9_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
      {
        id: "m_add9_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
      {
        id: "m_add9_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
      {
        id: "m_add9_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
      {
        id: "m_add9_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
      {
        id: "m_add9_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[2,7],[3,12],[3,14],[3,15],[4,19],[5,24]],
      },
    ],
  },
  {
    id: "m9",
    label: "Xm9",
    type: "Arpegio",
    intervals: [_1, _m3, _5, _m7, _m9],
    shapes: [],
  },
  {
    id: "minor_pent",
    label: "Minor Pentatonic",
    type: "Scale",
    intervals: [_1, _M3],
    shapes: [
      {
        id: "minor_pent_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "minor_pent_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "minor_pent_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "minor_pent_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "minor_pent_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "minor_pent_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[4,22],[5,24],[5,27]],
      },
      {
        id: "minor_pent_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[5,22],[5,24]],
      },
      {
        id: "minor_pent_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[5,22],[5,24]],
      },
      {
        id: "minor_pent_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[5,22],[5,24]],
      },
      {
        id: "minor_pent_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[5,22],[5,24]],
      },
      {
        id: "minor_pent_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[1,7],[2,10],[2,12],[3,15],[3,17],[4,19],[5,22],[5,24]],
      },
      {
        id: "minor_pent_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
      {
        id: "minor_pent_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
      {
        id: "minor_pent_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
      {
        id: "minor_pent_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
      {
        id: "minor_pent_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
      {
        id: "minor_pent_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,3],[1,5],[2,7],[2,10],[3,12],[3,15],[4,17],[4,19],[5,22],[5,24]],
      },
    ],
  },
  {
    id: "major_pent",
    label: "Major Pentatonic",
    type: "Scale",
    intervals: [_1, _M3],
    shapes: [
      {
        id: "major_pent_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      {
        id: "major_pent_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      {
        id: "major_pent_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      {
        id: "major_pent_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      {
        id: "major_pent_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      {
        id: "major_pent_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,12],[3,16],[3,7],[4,21],[5,24],[5,26],[5,16]],
      },
      {
        id: "major_pent_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      {
        id: "major_pent_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      {
        id: "major_pent_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      {
        id: "major_pent_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      {
        id: "major_pent_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      {
        id: "major_pent_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,12],[3,14],[3,16],[4,19],[4,21],[5,24],[5,26]],
      },
      {
        id: "major_pent_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
      {
        id: "major_pent_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
      {
        id: "major_pent_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
      {
        id: "major_pent_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
      {
        id: "major_pent_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
      {
        id: "major_pent_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,5],[1,7],[2,10],[2,12],[3,14],[3,17],[4,19],[4,22]],
      },
    ],
  },
  {
    id: "no_avoid_notes_t_s_major",
    label: '"No avoid notes"',
    type: "Set",
    intervals: [_1, _M3],
    shapes: [
      {
        id: "no_avoid_notes_t_s_major_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[4,19],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "no_avoid_notes_t_s_major_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "no_avoid_notes_t_s_major_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "no_avoid_notes_t_s_major_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "no_avoid_notes_t_s_major_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "no_avoid_notes_t_s_major_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "no_avoid_notes_t_s_major_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "no_avoid_notes_t_s_major_19",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "no_avoid_notes_t_s_major_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "no_avoid_notes_t_s_major_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "no_avoid_notes_t_s_major_22",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "no_avoid_notes_t_s_major_23",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "no_avoid_notes_t_s_major_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "no_avoid_notes_t_s_major_25",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "no_avoid_notes_t_s_major_26",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "no_avoid_notes_t_s_major_27",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "no_avoid_notes_t_s_major_28",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "no_avoid_notes_t_s_major_29",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "no_avoid_notes_t_s_major_30",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,19],[5,21],[5,23],[5,24]],
      },
    ],
  },
  {
    id: "ionian",
    label: "Ionian",
    type: "Scale",
    intervals: [_1, _M3],
    shapes: [
      {
        id: "ionian_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "ionian_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "ionian_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "ionian_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "ionian_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "ionian_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,-8],[1,5],[1,7],[1,-3],[2,11],[2,12],[2,2],[3,16],[3,17],[3,7],[4,21],[4,11],[5,24],[5,26],[5,16]],
      },
      {
        id: "ionian_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "ionian_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "ionian_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "ionian_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "ionian_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "ionian_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "ionian_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "ionian_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "ionian_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "ionian_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "ionian_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "ionian_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "ionian_19",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "ionian_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "ionian_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "ionian_22",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "ionian_23",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
      {
        id: "ionian_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[3,11],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,23],[5,24]],
      },
    ],
  },
  {
    id: "aeolian",
    label: "Aeolian",
    type: "Scale",
    intervals: [_1, _M3],
    shapes: [
      {
        id: "aeolian_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "aeolian_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,8],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_19",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_22",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_23",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,8],[2,10],[2,12],[3,14],[3,15],[4,17],[4,19],[4,20],[5,22],[5,24],[5,26]],
      },
      {
        id: "aeolian_25",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
      {
        id: "aeolian_26",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
      {
        id: "aeolian_27",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
      {
        id: "aeolian_28",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
      {
        id: "aeolian_29",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
      {
        id: "aeolian_30",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,8],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,20],[5,22],[5,24]],
      },
    ],
  },
  {
    id: "dorian",
    label: "Dorian",
    type: "Scale",
    intervals: [_1, _M3],
    shapes: [
      {
        id: "dorian_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "dorian_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "dorian_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "dorian_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "dorian_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "dorian_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,15],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,27]],
      },
      {
        id: "dorian_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,3],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,15],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "dorian_19",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      {
        id: "dorian_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      {
        id: "dorian_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      {
        id: "dorian_22",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      {
        id: "dorian_23",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      {
        id: "dorian_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,3],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[3,15],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
    ],
  },
  {
    id: "lydian",
    label: "Lydian",
    type: "Scale",
    intervals: [_1, _M3],
    shapes: [
      {
        id: "lydian_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      {
        id: "lydian_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      {
        id: "lydian_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      {
        id: "lydian_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      {
        id: "lydian_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      {
        id: "lydian_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[4,24],[5,26],[5,28],[5,30]],
      },
      {
        id: "lydian_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,6],[1,7],[1,9],[2,11],[2,12],[2,14],[3,16],[3,18],[3,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[3,18],[4,19],[4,21],[4,23],[5,24],[5,26],[5,28]],
      },
      {
        id: "lydian_19",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_22",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_23",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,6],[1,7],[2,9],[2,11],[2,12],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_25",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_26",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_27",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_28",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_29",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_30",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[3,16],[4,18],[4,19],[4,21],[5,23],[5,24],[5,26]],
      },
      {
        id: "lydian_31",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
      {
        id: "lydian_32",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
      {
        id: "lydian_33",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
      {
        id: "lydian_34",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
      {
        id: "lydian_35",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
      {
        id: "lydian_36",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,14],[1,4],[1,6],[2,19],[2,9],[2,11],[3,24],[3,14],[4,28],[4,18],[4,19],[5,33],[5,23],[5,24]],
      },
    ],
  },
  {
    id: "mixolydian",
    label: "Mixolydian",
    type: "Scale",
    intervals: [_1, _M3],
    shapes: [
      {
        id: "mixolydian_1",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      {
        id: "mixolydian_2",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      {
        id: "mixolydian_3",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      {
        id: "mixolydian_4",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      {
        id: "mixolydian_5",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      {
        id: "mixolydian_6",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[3,19],[4,21],[4,22],[4,24],[5,26],[5,28],[5,29]],
      },
      {
        id: "mixolydian_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[0,4],[1,5],[1,7],[1,9],[2,10],[2,12],[2,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_13",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_14",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_15",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_16",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_17",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_18",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[4,22],[5,24],[5,26],[5,28]],
      },
      {
        id: "mixolydian_19-checked",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "mixolydian_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "mixolydian_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "mixolydian_22",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "mixolydian_23",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "mixolydian_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,2],[1,4],[1,5],[1,7],[2,9],[2,10],[2,12],[3,14],[3,16],[3,17],[4,19],[4,21],[5,22],[5,24],[5,26]],
      },
      {
        id: "mixolydian_25",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      {
        id: "mixolydian_26",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      {
        id: "mixolydian_27",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      {
        id: "mixolydian_28",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      {
        id: "mixolydian_29",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
      {
        id: "mixolydian_30",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[1,2],[1,4],[1,5],[2,7],[2,9],[2,10],[3,12],[3,14],[4,16],[4,17],[4,19],[5,21],[5,22],[5,24]],
      },
    ],
  },
  {
    id: "phrygian",
    label: "Phrygian",
    type: "Scale",
    intervals: [_1, _M3],
    shapes: [],
  },
  {
    id: "phrygian_dominant",
    label: "Phrygian Dominant",
    type: "Scale",
    intervals: [_1, _M3],
    shapes: [
      {
        id: "phrygian_dominant_7",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "phrygian_dominant_8",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "phrygian_dominant_9",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "phrygian_dominant_10",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "phrygian_dominant_11",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "phrygian_dominant_12",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,1],[0,4],[1,5],[1,7],[1,8],[2,10],[2,12],[2,13],[3,16],[3,17],[4,19],[4,20],[4,22],[5,24],[5,25],[5,28]],
      },
      {
        id: "M7_19",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
      {
        id: "M7_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
      {
        id: "M7_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
      {
        id: "M7_22",
        targetString: "G4",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
      {
        id: "M7_23",
        targetString: "B5",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
      {
        id: "M7_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0,0],[0,1],[1,16],[1,7],[2,20],[2,10],[2,12],[3,25],[3,16],[4,29],[4,19],[4,20],[5,34],[5,24],[5,25]],
      },
      {
        id: "M7_19",
        targetString: "E1",
        // prettier-ignore
        shape: [[0,0],[1,13],[1,16],[1,5],[2,19],[2,20],[2,10],[3,24],[3,25],[4,28],[4,29],[4,19], [5, 32], [5, 34], [5, 24]],
      },
      {
        id: "M7_20",
        targetString: "A2",
        // prettier-ignore
        shape: [[0, 0], [1, 13], [1, 16], [1, 5], [2, 19], [2, 20], [2, 10], [3, 24], [3, 25], [4, 28], [4, 29], [4, 19], [5, 32], [5, 34], [5, 24]],
      },
      {
        id: "M7_21",
        targetString: "D3",
        // prettier-ignore
        shape: [[0, 0], [1, 13], [1, 16], [1, 5], [2, 19], [2, 20], [2, 10], [3, 24], [3, 25], [4, 28], [4, 29], [4, 19], [5, 32], [5, 34], [5, 24]],
      },
      {
        id: "M7_22",
        targetString: "G4",
        // prettier-ignore
        shape: [[0, 0], [1, 13], [1, 16], [1, 5], [2, 19], [2, 20], [2, 10], [3, 24], [3, 25], [4, 28], [4, 29], [4, 19], [5, 32], [5, 34], [5, 24]],
      },
      {
        id: "M7_23",
        targetString: "B5",
        // prettier-ignore
        shape: [[0, 0], [1, 13], [1, 16], [1, 5], [2, 19], [2, 20], [2, 10], [3, 24], [3, 25], [4, 28], [4, 29], [4, 19], [5, 32], [5, 34], [5, 24]],
      },
      {
        id: "M7_24",
        targetString: "E6",
        // prettier-ignore
        shape: [[0, 0], [1, 13], [1, 16], [1, 5], [2, 19], [2, 20], [2, 10], [3, 24], [3, 25], [4, 28], [4, 29], [4, 19], [5, 32], [5, 34], [5, 24]],
      },
    ],
  },
];

export default shapes;
