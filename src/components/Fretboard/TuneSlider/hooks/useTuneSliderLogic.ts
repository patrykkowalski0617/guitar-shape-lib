import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/data";
import { useControlsStore } from "@/store";

export const useTuneSliderLogic = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);

  const keyEntries = Object.entries(UNIFIED_MUSIC_KEYS);

  const options = keyEntries.map(([, data]) => {
    const label = isMajorMode ? data.majorName : data.relativeMinorName;
    return label;
  });

  const matchingIndex = keyEntries.findIndex(([id]) => id === tuneKeyId);
  const currentIndex = matchingIndex !== -1 ? matchingIndex : 0;
  const sliderValue = [currentIndex];

  const handleValueChange = (values: number[]) => {
    const selectedIndex = values[0];
    const selectedEntry = keyEntries[selectedIndex];

    if (selectedEntry) {
      const [newKeyId] = selectedEntry;
      setTuneKeyId(newKeyId as MusicKeyId);
    }
  };

  return {
    options,
    sliderValue,
    handleValueChange,
  };
};
