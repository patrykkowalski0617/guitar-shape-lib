import { BASE_CHORDS_MAP, UNIFIED_MUSIC_KEYS } from "@/data";
import { baseChordsShapes } from "@/data/baseChordsShapes";
import { useControlsStore } from "@/store";

export const useBaseChordShapeCoordinates = () => {
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const tuneKeyOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;

  const currentBaseChordData = baseChordId
    ? BASE_CHORDS_MAP[baseChordId]
    : null;
  if (!currentBaseChordData) return null;

  const semitoneOffsetFromMajorScaleRoot =
    currentBaseChordData?.semitoneOffsetFromMajorScaleRoot ?? 0;

  const mode = currentBaseChordData?.isMajorMode ? "major" : "minor";

  const baseChordShapesCoordinates = Object.fromEntries(
    Object.entries(baseChordsShapes[mode]).map(([key, value]) => {
      const fretIndexAdjustment =
        value.baseFretIndex + tuneKeyOffset + semitoneOffsetFromMajorScaleRoot;
      const adjustedCoordinates = value.coordinates.map(
        (coordinates: [number, number]) =>
          [coordinates[0], coordinates[1] + fretIndexAdjustment] as [
            number,
            number,
          ],
      );
      return [key, adjustedCoordinates];
    }),
  );

  return Object.values(baseChordShapesCoordinates);
};
