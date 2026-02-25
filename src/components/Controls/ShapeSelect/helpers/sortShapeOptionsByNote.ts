import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/data";
import { type ShapeOption } from "./getFilteredShapeOptions";

export const sortShapeOptionsByNote = (options: ShapeOption[], currentKeyId: MusicKeyId): ShapeOption[] => {
  const musicKey = UNIFIED_MUSIC_KEYS[currentKeyId];
  if (!musicKey) return options;

  const sorted = [...options].sort((a, b) => {
    const intervalA = ((a.offset % 12) + 12) % 12;
    const intervalB = ((b.offset % 12) + 12) % 12;

    if (intervalA !== intervalB) {
      return intervalA - intervalB;
    }

    return String(a.shapeId).localeCompare(String(b.shapeId));
  });

  return sorted;
};
