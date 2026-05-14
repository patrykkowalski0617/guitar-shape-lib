import {
  SHAPES,
  UNIFIED_MUSIC_KEYS,
  type ShapeDataKey,
  type UnifiedMusicKeysDataKey,
} from "@/data";
import { useDataKeyStore } from "@/store";
import { useEnharmonicNoteName } from "./useEnharmonicNoteName";
import { getNotes } from "@/utils";

interface UseShapeProps {
  shapeDataKey?: ShapeDataKey;
}

interface GetShapeNameProps {
  semitoneOffsetFromMajorRoot: number;
  unifiedMusicKeysDataKey?: UnifiedMusicKeysDataKey;
}

export const useShape = ({
  shapeDataKey: provided_shapeDataKey,
}: UseShapeProps = {}) => {
  const getEnharmonicNoteName = useEnharmonicNoteName();

  const store_shapeDataKey = useDataKeyStore((state) => state.shapeDataKey);
  const store_unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const shapeDataKey = provided_shapeDataKey ?? store_shapeDataKey;
  const shape = shapeDataKey ? SHAPES[shapeDataKey] : null;

  const getShapeName = ({
    semitoneOffsetFromMajorRoot,
    unifiedMusicKeysDataKey: provided_unifiedMusicKeysDataKey,
  }: GetShapeNameProps) => {
    const unifiedMusicKeysDataKey =
      provided_unifiedMusicKeysDataKey ?? store_unifiedMusicKeysDataKey;

    if (!unifiedMusicKeysDataKey) return {};

    const musicKeyOffset =
      UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].semitonOffsetFromC;

    const totalOffset = musicKeyOffset + semitoneOffsetFromMajorRoot;

    const notes = getNotes({ length: 24 });

    const shapeType = shape?.type;
    const shapeLabel = shape?.label;

    const shapeNoteName = getEnharmonicNoteName(notes[totalOffset], {
      unifiedMusicKeysDataKey,
    });
    return { shapeNoteName, shapeLabel, shapeType };
  };

  return {
    shape,
    getShapeName,
  };
};
