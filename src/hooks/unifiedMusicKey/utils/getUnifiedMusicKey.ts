import { UNIFIED_MUSIC_KEYS, type UnifiedMusicKeysDataKey } from "@/data";

export const getUnifiedMusicKey = (
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey,
) => {
  return UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey];
};
