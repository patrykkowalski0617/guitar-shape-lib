import { BASE_CHORDS, UNIFIED_MUSIC_KEYS, CAGED_CHORDS_SHAPES } from "@/data";
import { useControlsStore } from "@/store";

export const useBaseChordShapes = () => {
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const tuneKeyOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;
  const currentBaseChordData = baseChordId ? BASE_CHORDS[baseChordId] : null;

  if (!currentBaseChordData) return { baseChordCoordinates: [] };

  const semitoneOffsetFromMajorScaleRoot =
    currentBaseChordData.semitoneOffsetFromMajorScaleRoot ?? 0;

  const baseChordCoordinates = CAGED_CHORDS_SHAPES[
    currentBaseChordData.CAGEDchordShape
  ].flatMap((shape) => {
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
