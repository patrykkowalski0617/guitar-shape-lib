import { type GuitarShapeDataKey, type UnifiedMusicKeysDataKey } from "@/data";
import { useDataKeyStore } from "@/store";
import { getGuitarShapeName } from ".";

interface UseShapeNameProps {
  guitarShapeDataKey?: GuitarShapeDataKey | null;
  unifiedMusicKeysDataKey?: UnifiedMusicKeysDataKey | null;
  semitoneOffsetFromMajorRoot: number;
}

export const useGuitarShapeName = ({
  guitarShapeDataKey: providedShapeKey,
  unifiedMusicKeysDataKey: providedMusicKey,
  semitoneOffsetFromMajorRoot,
}: UseShapeNameProps) => {
  const storeShapeKey = useDataKeyStore((s) => s.guitarShapeDataKey);
  const storeMusicKey = useDataKeyStore((s) => s.unifiedMusicKeysDataKey);

  const guitarShapeDataKey = providedShapeKey ?? storeShapeKey;
  const unifiedMusicKeysDataKey = providedMusicKey ?? storeMusicKey;

  if (!guitarShapeDataKey || !unifiedMusicKeysDataKey) return {};

  return getGuitarShapeName({
    guitarShapeDataKey,
    unifiedMusicKeysDataKey,
    semitoneOffsetFromMajorRoot,
  });
};
