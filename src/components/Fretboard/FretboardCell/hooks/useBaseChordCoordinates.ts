import { BASE_CHORDS_MAP, UNIFIED_MUSIC_KEYS } from "@/data";
import { baseChordsShapes } from "@/data/baseChordsShapes";
import { useControlsStore } from "@/store";

export const useBaseChordCoordinates = () => {
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const tuneKeyOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;
  const currentBaseChordData = baseChordId
    ? BASE_CHORDS_MAP[baseChordId]
    : null;

  if (!currentBaseChordData) return { baseChordCoordinates: [] };

  const semitoneOffsetFromMajorScaleRoot =
    currentBaseChordData.semitoneOffsetFromMajorScaleRoot ?? 0;
  const mode = currentBaseChordData.isMajorMode ? "major" : "minor";

  const baseChordCoordinates = baseChordsShapes[mode].flatMap((shape) => {
    const fretIndexAdjustment =
      shape.baseFretIndex + tuneKeyOffset + semitoneOffsetFromMajorScaleRoot;

    const octaveOffsets = [-24, -12, 0, 12, 24];

    return octaveOffsets
      .map((octaveOffset) => {
        const adjustedCoordinates = shape.coordinates.map(
          (coords: number[]) => {
            const finalFret = coords[1] + fretIndexAdjustment + octaveOffset;
            return [coords[0], finalFret] as [number, number];
          },
        );

        return {
          ...shape,
          CAGEDassigment: `${shape.CAGEDassigment}_${octaveOffset}`,
          coordinates: adjustedCoordinates,
        };
      })
      .filter((s) =>
        s.coordinates.every(([, fret]) => fret >= 0 && fret <= 24),
      );
  });

  return { baseChordCoordinates };
};
