import { UNIFIED_MUSIC_KEYS } from "@/data";
import { useControlsStore } from "@/store";

export const useCurrentTuneKeyOffsetFromC = () => {
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const offsetFromC = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].offsetFromC;

  return { offsetFromC };
};
