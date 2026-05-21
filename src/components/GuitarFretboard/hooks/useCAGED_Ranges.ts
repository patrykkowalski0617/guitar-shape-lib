import { useBaseChord } from "@/hooks/baseChord/useBaseChord";
import { resolveAbsoluteFrets } from "../helpers/resolveAbsoluteFrets";
import type { CAGEDChordsShapesOptions } from "./useCAGED_ChordsShapes";
import { useUnifiedMusicKey } from "@/hooks/unifiedMusicKey/useUnifiedMusicKey";
import { CAGED_RANGES, type FretboardCoordinate } from "@/data";

export const useCAGED_Ranges = (options?: CAGEDChordsShapesOptions) => {
  const baseChord = useBaseChord(options?.baseChordDataKey);
  const unifiedMusicKey = useUnifiedMusicKey(options?.unifiedMusicKeysDataKey);

  const getCAGED_Ranges = () => {
    if (!baseChord || !unifiedMusicKey) return [];

    const absoluteOffset =
      unifiedMusicKey.semitonOffsetFromC +
      (baseChord.semitoneOffsetFromMajorRoot ?? 0);

    return resolveAbsoluteFrets(
      CAGED_RANGES,
      (r) => r.range,
      (r, coords) => ({
        ...r,
        range: coords as [FretboardCoordinate, FretboardCoordinate],
      }),
      (r) => r.baseFretIndex,
      absoluteOffset,
      [-24, -12, 0, 12, 24],
      0,
      24,
    );
  };

  return getCAGED_Ranges;
};
