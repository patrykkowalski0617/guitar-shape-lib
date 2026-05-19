import { type BaseChordDataKey, type UnifiedMusicKeysDataKey } from "@/data";
import { useDataKeyStore } from "@/store";
import { getBaseChordName } from "./utils/getBaseChordName";

interface UseBaseChordNameProps {
  baseChordDataKey?: BaseChordDataKey;
  unifiedMusicKeysDataKey?: UnifiedMusicKeysDataKey;
  isExtendedName?: boolean;
}

export const useBaseChordName = ({
  baseChordDataKey: providedBaseChordKey,
  unifiedMusicKeysDataKey: providedMusicKey,
  isExtendedName = true,
}: UseBaseChordNameProps = {}) => {
  const storeBaseChordKey = useDataKeyStore((s) => s.baseChordDataKey);
  const storeMusicKey = useDataKeyStore((s) => s.unifiedMusicKeysDataKey);

  const baseChordDataKey = providedBaseChordKey ?? storeBaseChordKey;
  const unifiedMusicKeysDataKey = providedMusicKey ?? storeMusicKey;

  if (!baseChordDataKey || !unifiedMusicKeysDataKey) return "";

  return getBaseChordName({
    baseChordDataKey,
    unifiedMusicKeysDataKey,
    isExtendedName,
  });
};
