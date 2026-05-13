import { UNIFIED_MUSIC_KEYS } from "@/data";
import { useControlsStore } from "@/store";

export const useCurrentMusicKeyOffsetFromC = () => {
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const semitonOffsetFromC =
    UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].semitonOffsetFromC;

  return { semitonOffsetFromC };
};
