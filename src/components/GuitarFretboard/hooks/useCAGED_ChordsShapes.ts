import { CAGED_CHORDS_SHAPES } from "@/data";
import { useBaseChord, useUnifiedMusicKey } from "@/hooks";

export const useCAGED_ChordsShapes = () => {
  const baseChord = useBaseChord();
  const unifiedMusicKey = useUnifiedMusicKey();

  const getCAGED_ChordsShapes = () => {
    if (!baseChord || !unifiedMusicKey) return [];

    const musicKeyOffset = unifiedMusicKey.semitonOffsetFromC;
    const semitoneOffsetFromMajorRoot =
      baseChord.semitoneOffsetFromMajorRoot ?? 0;

    return CAGED_CHORDS_SHAPES[
      baseChord.CAGEDchordShape as keyof typeof CAGED_CHORDS_SHAPES
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

          return { ...guitarShape, coordinates: adjustedCoordinates };
        })
        .filter((s) =>
          s.coordinates.every(([, fret]) => fret >= 0 && fret <= 24),
        );
    });
  };

  return getCAGED_ChordsShapes;
};
