import { UNIFIED_MUSIC_KEYS, type TuneKeyId } from "@/data";
import { type Brick } from "@/store";

export const transposeBricks = (
  bricks: Brick[],
  semitones: number,
): Brick[] => {
  const keysArray = Object.keys(UNIFIED_MUSIC_KEYS) as TuneKeyId[];
  const keysCount = keysArray.length;

  return bricks.map((brick) => {
    if (!brick.snapshot) return brick;

    const { snapshot } = brick;

    const currentKeyIndex = keysArray.indexOf(snapshot.tuneKeyId as TuneKeyId);
    const nextKeyIndex = (currentKeyIndex + semitones + keysCount) % keysCount;
    const newTuneKeyId = keysArray[nextKeyIndex];

    const FRET_LIMIT = 24;
    let newLocationData = null;

    if (snapshot.shapeVariantLocationData) {
      const currentFret = snapshot.shapeVariantLocationData.fretIndex;
      const nextFret =
        (currentFret + semitones + (FRET_LIMIT + 1)) % (FRET_LIMIT + 1);

      newLocationData = {
        ...snapshot.shapeVariantLocationData,
        fretIndex: nextFret,
      };
    }

    return {
      ...brick,
      snapshot: {
        ...snapshot,
        tuneKeyId: newTuneKeyId,
        shapeVariantLocationData: newLocationData,
      },
    };
  });
};
