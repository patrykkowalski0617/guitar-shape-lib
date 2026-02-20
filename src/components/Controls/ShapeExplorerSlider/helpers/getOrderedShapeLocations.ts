import { shapes, type FretboardStringId, type Note, type VariantId } from "@/data";
import { getValidVariants, type VariantsRecord, getNotes } from "@/utils";
import { numberOfFrets, STRINGS_CONFIG } from "@/components/Fretboard/FretboardRow/helpers/constants";
import { STRING_ID_MAP } from "@/components/Fretboard/helpers/constants";

export interface ShapeLocation {
  shapeId: string;
  stringId: FretboardStringId;
  fretIndex: number;
  variantId: VariantId;
  id: string;
  isLearned: boolean;
}

export const getOrderedShapeLocations = (
  shapeId: string | null,
  rootNoteName: string | null,
  learnedIds: string[],
): ShapeLocation[] => {
  if (!shapeId || !rootNoteName) return [];

  const locations: ShapeLocation[] = [];
  const shapeData = shapes[shapeId as keyof typeof shapes];
  const stringIndices = [5, 4, 3, 2, 1, 0];

  for (let fIdx = 0; fIdx < numberOfFrets; fIdx++) {
    for (const sIdx of stringIndices) {
      const stringConfig = STRINGS_CONFIG[sIdx];
      const stringId = STRING_ID_MAP[sIdx];

      const noteAtFret = getNotes({
        firstNote: stringConfig.firstNoteInRow as Note,
        length: fIdx + 1,
      })[fIdx];

      if (noteAtFret.sharpNoteName === rootNoteName) {
        const variants =
          shapeData.fretboardCoordinatesVariants?.[stringId as keyof typeof shapeData.fretboardCoordinatesVariants];

        if (variants) {
          const validEntries = getValidVariants(fIdx, variants as VariantsRecord);

          validEntries.forEach(([variantId]) => {
            const id = `${shapeId}-${stringId}-${variantId}`;
            locations.push({
              shapeId,
              stringId,
              fretIndex: fIdx,
              variantId: variantId,
              id,
              isLearned: learnedIds.includes(id),
            });
          });
        }
      }
    }
  }

  return locations;
};
