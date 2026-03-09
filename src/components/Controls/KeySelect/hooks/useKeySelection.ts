import { useMusicStore, useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/data";

export function useKeySelection() {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );

  const keyOptions = Object.entries(UNIFIED_MUSIC_KEYS).map(([id, data]) => {
    const label = isMajorMode ? data.majorName : data.relativeMinorName;

    return {
      value: id,
      label,
      ...data,
    };
  });

  const handleValueChange = (value: string) => {
    const newKeyId = value as MusicKeyId;
    setTuneKeyId(newKeyId);
    setShapeVariantLocationData(null);
  };

  return {
    tuneKeyId,
    isMajorMode,
    keyOptions,
    handleValueChange,
  };
}
