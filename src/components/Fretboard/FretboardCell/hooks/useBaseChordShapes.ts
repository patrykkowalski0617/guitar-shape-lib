import { BASE_CHORDS, UNIFIED_MUSIC_KEYS, CAGED_CHORDS_SHAPES } from "@/data";
import { useControlsStore } from "@/store";

export const useBaseChordShapes = () => {
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const tuneKeyOffset = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].offsetFromC;
  const currentBaseChordData = baseChordDataKey
    ? BASE_CHORDS[baseChordDataKey]
    : null;

  if (!currentBaseChordData) return { baseChordCoordinates: [] };

  const semitoneOffsetFromMajorTonicRoot =
    currentBaseChordData.semitoneOffsetFromMajorTonicRoot ?? 0;
  // @ts-expect-error: Unreachable code error
  const baseChordCoordinates = CAGED_CHORDS_SHAPES[
    currentBaseChordData.CAGEDchordShape
    // @ts-expect-error: Unreachable code error
  ].flatMap((shape) => {
    const fretIndexAdjustment =
      shape.baseFretIndex + tuneKeyOffset + semitoneOffsetFromMajorTonicRoot;

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
          coordinates: adjustedCoordinates,
        };
      })
      .filter(
        (
          s, // @ts-expect-error: Unreachable code error
        ) => s.coordinates.every(([, fret]) => fret >= 0 && fret <= 24),
      );
  });

  return { baseChordCoordinates };
};
