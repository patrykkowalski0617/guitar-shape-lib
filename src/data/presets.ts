import type { Brick } from "@/store";

export interface Preset {
  name: string;
  bricks: Brick[];
}

export const presets: Preset[] = [
  {
    name: "Key C: 8 CM7 | 4 FM7 | 4 G7",
    bricks: [
      {
        id: 1,
        width: 8,
        snapshot: {
          keyId: "C",
          isMajorMode: true,
          currentRoleId: "tonic",
          currentShapeVariantLocationData: {
            shapeId: "M7",
            stringId: "strE",
            fretIndex: 8,
            variantId: "v3",
          },
          rootNote: "C",
          shapeLabel: "M7",
          currentShapeSemitoneOffsetFromC: 0,
          currentShapeId: "M7",
        },
      },
      {
        id: 2,
        width: 4,
        snapshot: {
          keyId: "C",
          isMajorMode: true,
          currentRoleId: "subdominant",
          currentShapeVariantLocationData: {
            shapeId: "M7",
            stringId: "strA",
            fretIndex: 8,
            variantId: "v2",
            // id: "M7-strA-v2",
            // isLearned: false,
          },
          rootNote: "F",
          shapeLabel: "M7",
          currentShapeSemitoneOffsetFromC: 5,
          currentShapeId: "M7",
        },
      },
      {
        id: 3,
        width: 4,
        snapshot: {
          keyId: "C",
          isMajorMode: true,
          currentRoleId: "dominant",
          currentShapeVariantLocationData: {
            shapeId: "dominant",
            stringId: "strA",
            fretIndex: 10,
            variantId: "v1",
            // id: "dominant-strA-v1",
            // isLearned: false,
          },
          rootNote: "G",
          shapeLabel: "7",
          currentShapeSemitoneOffsetFromC: 7,
          currentShapeId: "dominant",
        },
      },
    ],
  },
  {
    name: "Key C: 4 Am(add9) | 4 E7b9",
    bricks: [
      {
        id: 1,
        width: 4,
        snapshot: {
          keyId: "C",
          isMajorMode: false,
          currentRoleId: "tonic",
          currentShapeVariantLocationData: {
            shapeId: "m_add9",
            stringId: "strE",
            fretIndex: 5,
            variantId: "v2",
            // id: "m_add9-strE-v2",
            // isLearned: true,
          },
          rootNote: "A",
          shapeLabel: "m(add9)",
          currentShapeSemitoneOffsetFromC: 9,
          currentShapeId: "m_add9",
        },
      },
      {
        id: 2,
        width: 4,
        snapshot: {
          keyId: "C",
          isMajorMode: false,
          currentRoleId: "dominant",
          currentShapeVariantLocationData: {
            shapeId: "7b9",
            stringId: "strA",
            fretIndex: 7,
            variantId: "v1",
            // id: "7b9-strA-v1",
            // isLearned: false,
          },
          rootNote: "E",
          shapeLabel: "7b9",
          currentShapeSemitoneOffsetFromC: 4,
          currentShapeId: "7b9",
        },
      },
    ],
  },
];
