import { BASE_CHORDS_MAP, shapes, UNIFIED_MUSIC_KEYS } from "@/data";
import { baseChordsShapes } from "@/data/baseChordsShapes";
import { useControlsStore, useMusicStore } from "@/store";

export const useBaseChordShapeCoordinates = () => {
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const tuneKeyOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;

  const currentBaseChordData = baseChordId
    ? BASE_CHORDS_MAP[baseChordId]
    : null;
  if (!currentBaseChordData || !shapeVariantLocationData) return {};

  const semitoneOffsetFromMajorScaleRoot =
    currentBaseChordData?.semitoneOffsetFromMajorScaleRoot ?? 0;

  const mode = currentBaseChordData?.isMajorMode ? "major" : "minor";

  const baseChordShapesVariants = Object.fromEntries(
    Object.entries(baseChordsShapes[mode]).map(([key, value]) => {
      const fretIndexAdjustment =
        value.baseFretIndex + tuneKeyOffset + semitoneOffsetFromMajorScaleRoot;
      const adjustedCoordinates = value.coordinates.map(
        (coordinates: number[]) =>
          [coordinates[0], coordinates[1] + fretIndexAdjustment] as [
            number,
            number,
          ],
      );
      return [key, adjustedCoordinates];
    }),
  );

  const shapeId = shapeVariantLocationData.shapeId;
  const variantId = shapeVariantLocationData.variantId;
  const stringId = shapeVariantLocationData.stringId;

  const CAGEDassigments =
    shapes[shapeId].shapeVariants[stringId][variantId].CAGEDassigments[mode];
  const baseChordShapeCoordinates = baseChordShapesVariants[CAGEDassigments];

  return { baseChordShapeCoordinates, variantId, stringId, CAGEDassigments };
};
