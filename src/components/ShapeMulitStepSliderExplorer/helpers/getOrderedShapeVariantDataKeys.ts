import {
  SHAPES,
  type NoteName,
  type ShapeDataKey,
  type ShapeVariantDataKeys,
  type UnifiedMusicKeysDataKey,
} from "@/data";
import { getValidVariants, getNotes } from "@/utils";
import {
  numberOfFrets,
  stringIndexes,
  STRINGS_CONFIG,
  BASS_STRING_ID_MAP,
} from "@/components/Fretboard/constants";

interface GetOrderedShapeVariantDataKeysParams {
  shapeDataKey: ShapeDataKey;
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  semitoneOffsetFromMajorRoot: number;
}

export const getOrderedShapeVariantDataKeys = ({
  shapeDataKey,
  unifiedMusicKeysDataKey,
  semitoneOffsetFromMajorRoot,
}: GetOrderedShapeVariantDataKeysParams) => {
  if (!shapeDataKey) return [];

  const notes = getNotes({ firstNote: unifiedMusicKeysDataKey });
  const rootNoteIndex =
    semitoneOffsetFromMajorRoot !== null
      ? semitoneOffsetFromMajorRoot % 12
      : null;
  const rootNoteName =
    rootNoteIndex !== null ? notes[rootNoteIndex].sharpNoteName : null;

  const locations: ShapeVariantDataKeys[] = [];
  const shapeData = SHAPES[shapeDataKey as keyof typeof SHAPES];

  for (let fIdx = 0; fIdx < numberOfFrets; fIdx++) {
    for (const sIdx of stringIndexes) {
      const stringConfig = STRINGS_CONFIG[sIdx];
      const stringId = BASS_STRING_ID_MAP[sIdx];

      const noteAtFret = getNotes({
        firstNote: stringConfig.firstNoteInRow as NoteName,
        length: fIdx + 1,
      })[fIdx];

      if (noteAtFret.sharpNoteName === rootNoteName) {
        const variants =
          shapeData.shapeVariants?.[
            stringId as keyof typeof shapeData.shapeVariants
          ];

        if (variants) {
          const validEntries = getValidVariants(fIdx, variants);

          validEntries.forEach(([variantDataKey]) => {
            locations.push({
              shapeDataKey,
              stringId,
              fretIndex: fIdx,
              variantDataKey,
            });
          });
        }
      }
    }
  }

  return locations;
};
