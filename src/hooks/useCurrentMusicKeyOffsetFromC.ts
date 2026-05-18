import { UNIFIED_MUSIC_KEYS } from "@/data";
import { useControllersStore } from "@/store";

export const useCurrentMusicKeyOffsetFromC = () => {
  const unifiedMusicKeysDataKey = useControllersStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const semitonOffsetFromC =
    UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].semitonOffsetFromC;

  return { semitonOffsetFromC };
};
