import { useBaseChord } from "@/hooks/baseChord/useBaseChord";
import { useUnifiedMusicKey } from "@/hooks/unifiedMusicKey/useUnifiedMusicKey";
import { resolveAbsoluteFrets } from "../helpers/resolveAbsoluteFrets";
import type { CAGEDChordsShapesOptions } from "./useCAGED_ChordsShapes";
import { CAGED_SYSTEM } from "@/data";

export const useCAGED_System = (options?: CAGEDChordsShapesOptions) => {
  const baseChord = useBaseChord(options?.baseChordDataKey);
  const unifiedMusicKey = useUnifiedMusicKey(options?.unifiedMusicKeysDataKey);

  const getCAGED_System = () => {
    if (!baseChord || !unifiedMusicKey) return [];

    const absoluteOffset = unifiedMusicKey.semitonOffsetFromC;

    return resolveAbsoluteFrets(
      CAGED_SYSTEM,
      (s) => s.coordinates,
      (s, coords, octaveOffset) => ({
        ...s,
        coordinates: coords,
        baseFretIndex: s.baseFretIndex + absoluteOffset + octaveOffset,
      }),
      (s) => s.baseFretIndex,
      absoluteOffset,
      [-24, -12, 0, 12, 24],
      0,
      24,
    );
  };

  return getCAGED_System;
};
