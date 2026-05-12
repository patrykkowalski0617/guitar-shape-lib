import { UNIFIED_MUSIC_KEYS, type UnifiedMusicKeysDataKey } from "@/data";
import { type Brick } from "@/store";

export const transposeBricks = (
  bricks: Brick[],
  semitones: number,
): Brick[] => {
  const keysArray = Object.keys(
    UNIFIED_MUSIC_KEYS,
  ) as UnifiedMusicKeysDataKey[];
  const keysCount = keysArray.length;

  return bricks.map((brick) => {
    if (!brick.snapshot) return brick;

    const { snapshot } = brick;

    const currentKeyIndex = keysArray.indexOf(
      snapshot.unifiedMusicKeysDataKey as UnifiedMusicKeysDataKey,
    );
    const nextKeyIndex = (currentKeyIndex + semitones + keysCount) % keysCount;
    const newUnifiedMusicKeysDataKey = keysArray[nextKeyIndex];

    const FRET_LIMIT = 24;
    let newLocationData = null;

    if (snapshot.shapeVariantDataKeys) {
      const currentFret = snapshot.shapeVariantDataKeys.fretIndex;
      const nextFret =
        (currentFret + semitones + (FRET_LIMIT + 1)) % (FRET_LIMIT + 1);

      newLocationData = {
        ...snapshot.shapeVariantDataKeys,
        fretIndex: nextFret,
      };
    }

    return {
      ...brick,
      snapshot: {
        ...snapshot,
        unifiedMusicKeysDataKey: newUnifiedMusicKeysDataKey,
        shapeVariantDataKeys: newLocationData,
      },
    };
  });
};
