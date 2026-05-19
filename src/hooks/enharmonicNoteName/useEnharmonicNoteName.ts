import { useDataKeyStore } from "@/store";
import { type UnifiedMusicKeysDataKey } from "@/data";
import type { NoteObject } from "@/utils";
import { getEnharmonicNoteName } from "./utils/getEnharmonicNoteName";

export const useEnharmonicNoteName = (
  providedKey?: UnifiedMusicKeysDataKey,
) => {
  const storeKey = useDataKeyStore((s) => s.unifiedMusicKeysDataKey);
  const key = providedKey ?? storeKey;

  return (noteObject: NoteObject) => {
    if (!key) return null;
    return getEnharmonicNoteName(noteObject, key);
  };
};
