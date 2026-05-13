import { UNIFIED_MUSIC_KEYS, type UnifiedMusicKeysDataKey } from "@/data";
import { useDataKeyStore } from "@/store";

interface UseMusicKeyNameProps {
  unifiedMusicKeysDataKey?: UnifiedMusicKeysDataKey;
}

export const useUnifiedMusicKey = ({
  unifiedMusicKeysDataKey: provided_unifiedMusicKeysDataKey,
}: UseMusicKeyNameProps = {}) => {
  const store_unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const unifiedMusicKeysDataKey = provided_unifiedMusicKeysDataKey
    ? provided_unifiedMusicKeysDataKey
    : store_unifiedMusicKeysDataKey;

  const unifiedMusicKey = unifiedMusicKeysDataKey
    ? UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey]
    : null;

  return unifiedMusicKey;
};
