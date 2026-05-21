import {
  CAGED_BASE_CHORDS_SHAPES,
  type BaseChordDataKey,
  type UnifiedMusicKeysDataKey,
} from "@/data";
import { useBaseChord, useUnifiedMusicKey } from "@/hooks";

interface CAGEDChordsShapesOptions {
  baseChordDataKey?: BaseChordDataKey | null;
  unifiedMusicKeysDataKey?: UnifiedMusicKeysDataKey | null;
}

export const useBaseChordsShapes = (options?: CAGEDChordsShapesOptions) => {
  const baseChord = useBaseChord(options?.baseChordDataKey);
  const unifiedMusicKey = useUnifiedMusicKey(options?.unifiedMusicKeysDataKey);

  const getBaseChordsShapes = () => {
    if (!baseChord || !unifiedMusicKey) return [];

    const musicKeyOffset = unifiedMusicKey.semitonOffsetFromC;
    const semitoneOffsetFromMajorRoot =
      baseChord.semitoneOffsetFromMajorRoot ?? 0;

    return CAGED_BASE_CHORDS_SHAPES[
      baseChord.CAGEDchordShape as keyof typeof CAGED_BASE_CHORDS_SHAPES
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

  return getBaseChordsShapes;
};
