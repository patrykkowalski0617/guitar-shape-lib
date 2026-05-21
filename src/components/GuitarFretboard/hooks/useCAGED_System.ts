import { useUnifiedMusicKey } from "@/hooks/unifiedMusicKey/useUnifiedMusicKey";
import type { CAGEDChordsShapesOptions } from "./useBaseChordsShapes";
import { CAGED_SYSTEM } from "@/data";

export const useCAGED_System = (options?: CAGEDChordsShapesOptions) => {
  const unifiedMusicKey = useUnifiedMusicKey(options?.unifiedMusicKeysDataKey);

  const getCAGED_System = () => {
    if (!unifiedMusicKey) return [];

    const offset = unifiedMusicKey.semitonOffsetFromC;

    return CAGED_SYSTEM.flatMap((s) =>
      [-24, -12, 0, 12, 24]
        .map((octaveOffset) => ({
          ...s,
          baseFretIndex: s.baseFretIndex + offset + octaveOffset,
        }))
        .filter((s) => s.baseFretIndex >= 0 && s.baseFretIndex <= 24),
    );
  };

  return getCAGED_System;
};
