import {
  SHAPES,
  type NoteName,
  type ShapeDataKey,
  type ShapeVariantDataKeys,
} from "@/data";
import { getValidVariants, getNotes } from "@/utils";
import {
  numberOfFrets,
  stringIndexes,
  STRINGS_CONFIG,
} from "@/components/Fretboard/constants";
import { BASS_STRING_ID_MAP } from "@/components/Fretboard/constants";

export const getOrderedShapeLocations = (
  shapeDataKey: ShapeDataKey | null,
  rootNoteName: string | null,
): ShapeVariantDataKeys[] => {
  if (!shapeDataKey || !rootNoteName) return [];

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
              variantDataKey: variantDataKey,
            });
          });
        }
      }
    }
  }

  return locations;
};
