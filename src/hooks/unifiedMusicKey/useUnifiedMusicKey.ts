import { UNIFIED_MUSIC_KEYS, type UnifiedMusicKeysDataKey } from "@/data";
import { useDataKeyStore } from "@/store";

export const useUnifiedMusicKey = (
  providedKey?: UnifiedMusicKeysDataKey | null,
) => {
  const storeKey = useDataKeyStore((s) => s.unifiedMusicKeysDataKey);
  const key = providedKey ?? storeKey;
  if (!key) return null;
  return UNIFIED_MUSIC_KEYS[key];
};
