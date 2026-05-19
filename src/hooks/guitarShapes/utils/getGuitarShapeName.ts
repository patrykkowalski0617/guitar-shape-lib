import { UNIFIED_MUSIC_KEYS, type UnifiedMusicKeysDataKey } from "@/data";
import { GUITAR_SHAPES, type GuitarShapeDataKey } from "@/data/GUITAR_SHAPES";
import { getNotes } from "@/utils";
import { getEnharmonicNoteName } from "@/hooks/enharmonicNoteName/utils/getEnharmonicNoteName";

interface GetShapeNameProps {
  guitarShapeDataKey: GuitarShapeDataKey;
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  semitoneOffsetFromMajorRoot: number;
}

export const getGuitarShapeName = ({
  guitarShapeDataKey,
  unifiedMusicKeysDataKey,
  semitoneOffsetFromMajorRoot,
}: GetShapeNameProps) => {
  const guitarShape = GUITAR_SHAPES[guitarShapeDataKey];
  const musicKeyOffset =
    UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].semitonOffsetFromC;
  const totalOffset = musicKeyOffset + semitoneOffsetFromMajorRoot;
  const notes = getNotes({ length: 24 });

  const guitarShapeType = guitarShape?.type;
  const guitarShapeLabel = guitarShape?.label;
  const guitarShapeNoteName = getEnharmonicNoteName(
    notes[totalOffset],
    unifiedMusicKeysDataKey,
  );

  return { guitarShapeNoteName, guitarShapeLabel, guitarShapeType };
};
