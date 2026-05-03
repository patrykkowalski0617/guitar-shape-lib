import { useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS, type TuneKeyId } from "@/data";

export const useRandomizeKey = () => {
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);

  const setRandomKey = () => {
    const keyIds = Object.keys(UNIFIED_MUSIC_KEYS) as TuneKeyId[];
    const randomKey = keyIds[Math.floor(Math.random() * keyIds.length)];
    setTuneKeyId(randomKey);

    return randomKey;
  };

  return { setRandomKey };
};
