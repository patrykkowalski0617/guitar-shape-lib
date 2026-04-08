import { BASE_CHORDS_MAP, UNIFIED_MUSIC_KEYS } from "@/data";
import { baseChordsShapes } from "@/data/baseChordsShapes";
import { useControlsStore, useMusicStore } from "@/store";

export const useBaseChordCoordinates = (shapeCoordinates) => {
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const tuneKeyOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;

  const currentBaseChordData = baseChordId
    ? BASE_CHORDS_MAP[baseChordId]
    : null;

  const semitoneOffsetFromMajorScaleRoot =
    currentBaseChordData?.semitoneOffsetFromMajorScaleRoot ?? 0;

  const mode = currentBaseChordData?.isMajorMode ? "major" : "minor";

  const calculateAllBaseChordsShapes = () => {};
  console.log(baseChordsShapes[mode]);

  // console.log(shapeCoordinates, currentBaseChordData, baseChordsShapes);
  return { baseChordId: "" };
};
