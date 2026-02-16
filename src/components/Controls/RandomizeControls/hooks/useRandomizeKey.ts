import { useControlsStore } from "@/store/useControlsStore";
import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/data";

export const useRandomizeKey = () => {
  const setCurrentKey = useControlsStore((state) => state.setCurrentKey);

  const setRandomKey = () => {
    const keyIds = Object.keys(UNIFIED_MUSIC_KEYS) as MusicKeyId[];
    const randomKey = keyIds[Math.floor(Math.random() * keyIds.length)];
    setCurrentKey(randomKey);

    return randomKey;
  };

  return setRandomKey;
};
