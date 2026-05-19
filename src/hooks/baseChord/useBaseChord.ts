import { BASE_CHORDS, type BaseChordDataKey } from "@/data";
import { useDataKeyStore } from "@/store";

export const useBaseChord = (providedKey?: BaseChordDataKey | null) => {
  const storeKey = useDataKeyStore((s) => s.baseChordDataKey);
  const key = providedKey ?? storeKey;
  if (!key) return undefined;
  return BASE_CHORDS[key];
};
