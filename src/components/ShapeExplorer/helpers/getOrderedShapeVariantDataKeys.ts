import {
  BASS_STRING_ID_MAP,
  numberOfFrets,
  stringIndexes,
  STRINGS_CONFIG,
} from "@/components/GuitarFretboard/constants";
import {
  GUITAR_SHAPES,
  type NoteName,
  type GuitarShapeDataKey,
  type ShapeVariantDataKeys,
  type UnifiedMusicKeysDataKey,
} from "@/data";
import { getNotes } from "@/utils";
import { getValidShapeVariants } from "./getValidShapeVariants";

interface GetOrderedShapeVariantDataKeysParams {
  guitarShapeDataKey: GuitarShapeDataKey;
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  semitoneOffsetFromMajorRoot: number;
}

export const getOrderedShapeVariantDataKeys = ({
  guitarShapeDataKey,
  unifiedMusicKeysDataKey,
  semitoneOffsetFromMajorRoot,
}: GetOrderedShapeVariantDataKeysParams) => {
  if (!guitarShapeDataKey) return [];

  const notes = getNotes({ firstNote: unifiedMusicKeysDataKey });
  const rootNoteIndex =
    semitoneOffsetFromMajorRoot !== null
      ? semitoneOffsetFromMajorRoot % 12
      : null;
  const rootNoteName =
    rootNoteIndex !== null ? notes[rootNoteIndex].sharpNoteName : null;

  const locations: ShapeVariantDataKeys[] = [];
  const guitarShapeData =
    GUITAR_SHAPES[guitarShapeDataKey as keyof typeof GUITAR_SHAPES];

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
          guitarShapeData.guitarShapeVariants?.[
            stringId as keyof typeof guitarShapeData.guitarShapeVariants
          ];

        if (variants) {
          const validEntries = getValidShapeVariants(fIdx, variants);

          validEntries.forEach(([variantDataKey]) => {
            locations.push({
              guitarShapeDataKey,
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
