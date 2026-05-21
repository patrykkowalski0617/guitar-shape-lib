import {
  CAGED_BASE_CHORDS_SHAPES,
  type BaseChordDataKey,
  type UnifiedMusicKeysDataKey,
} from "@/data";
import { useBaseChord, useUnifiedMusicKey } from "@/hooks";
import { resolveAbsoluteFrets } from "../helpers/resolveAbsoluteFrets";

export interface CAGEDChordsShapesOptions {
  baseChordDataKey?: BaseChordDataKey | null;
  unifiedMusicKeysDataKey?: UnifiedMusicKeysDataKey | null;
}

export const useCAGED_ChordsShapes = (options?: CAGEDChordsShapesOptions) => {
  const baseChord = useBaseChord(options?.baseChordDataKey);
  const unifiedMusicKey = useUnifiedMusicKey(options?.unifiedMusicKeysDataKey);

  const getCAGED_ChordsShapes = () => {
    if (!baseChord || !unifiedMusicKey) return [];

    const absoluteOffset =
      unifiedMusicKey.semitonOffsetFromC +
      (baseChord.semitoneOffsetFromMajorRoot ?? 0);

    const shapes =
      CAGED_BASE_CHORDS_SHAPES[
        baseChord.CAGEDchordShape as keyof typeof CAGED_BASE_CHORDS_SHAPES
      ];

    return resolveAbsoluteFrets(
      shapes,
      (s) => s.coordinates,
      (s, coords) => ({ ...s, coordinates: coords }),
      (s) => s.baseFretIndex,
      absoluteOffset,
      [-24, -12, 0, 12, 24],
      0,
      24,
    );
  };

  return getCAGED_ChordsShapes;
};
