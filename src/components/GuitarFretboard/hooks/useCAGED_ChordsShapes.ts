import { BASE_CHORDS, UNIFIED_MUSIC_KEYS, CAGED_CHORDS_SHAPES } from "@/data";
import { useDataKeyStore } from "@/store";

export const useCAGED_ChordsShapes = () => {
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const getCAGED_ChordsShapes = () => {
    if (!unifiedMusicKeysDataKey) return [];

    const musicKeyOffset =
      UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].semitonOffsetFromC;

    const currentBaseChordData = baseChordDataKey
      ? BASE_CHORDS[baseChordDataKey]
      : null;

    if (!currentBaseChordData) return [];

    const semitoneOffsetFromMajorRoot =
      currentBaseChordData.semitoneOffsetFromMajorRoot ?? 0;

    return CAGED_CHORDS_SHAPES[
      currentBaseChordData.CAGEDchordShape as keyof typeof CAGED_CHORDS_SHAPES
    ].flatMap((guitarShape) => {
      const fretIndexAdjustment =
        guitarShape.baseFretIndex +
        musicKeyOffset +
        semitoneOffsetFromMajorRoot;

      const octaveOffsets = [-24, -12, 0, 12, 24];

      return octaveOffsets
        .map((octaveOffset) => {
          const adjustedCoordinates = guitarShape.coordinates.map(
            (coords: number[]) => {
              const finalFret = coords[1] + fretIndexAdjustment + octaveOffset;
              return [coords[0], finalFret] as [number, number];
            },
          );

          return {
            ...guitarShape,
            coordinates: adjustedCoordinates,
          };
        })
        .filter((s) =>
          s.coordinates.every(([, fret]) => fret >= 0 && fret <= 24),
        );
    });
  };

  return getCAGED_ChordsShapes;
};
