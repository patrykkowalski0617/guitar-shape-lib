import { UNIFIED_MUSIC_KEYS, type UnifiedMusicKeysDataKey } from "@/data";

const KEYS = Object.keys(UNIFIED_MUSIC_KEYS) as UnifiedMusicKeysDataKey[];

export function transposeKey(
  key: UnifiedMusicKeysDataKey,
  semitones: 1 | -1,
): UnifiedMusicKeysDataKey {
  const currentIndex = KEYS.indexOf(key);
  const nextIndex = (currentIndex + semitones + KEYS.length) % KEYS.length;
  return KEYS[nextIndex];
}
