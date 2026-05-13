import { BASE_CHORDS, UNIFIED_MUSIC_KEYS, CAGED_CHORDS_SHAPES } from "@/data";
import { useDataKeyStore } from "@/store";

export const useCAGED_ChordsShapes = () => {
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  if (!unifiedMusicKeysDataKey) return { CAGED_ChordsShapes: [] };

  const musicKeyOffset =
    UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].semitonOffsetFromC;
  const currentBaseChordData = baseChordDataKey
    ? BASE_CHORDS[baseChordDataKey]
    : null;

  if (!currentBaseChordData) return { CAGED_ChordsShapes: [] };

  const semitoneOffsetFromMajorRoot =
    currentBaseChordData.semitoneOffsetFromMajorRoot ?? 0;

  const CAGED_ChordsShapes = CAGED_CHORDS_SHAPES[
    currentBaseChordData.CAGEDchordShape as keyof typeof CAGED_CHORDS_SHAPES
  ].flatMap((shape) => {
    const fretIndexAdjustment =
      shape.baseFretIndex + musicKeyOffset + semitoneOffsetFromMajorRoot;

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
      .filter((s) =>
        s.coordinates.every(([, fret]) => fret >= 0 && fret <= 24),
      );
  });

  return { CAGED_ChordsShapes };
};
