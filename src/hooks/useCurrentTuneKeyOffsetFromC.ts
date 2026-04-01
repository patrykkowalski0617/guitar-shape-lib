import { UNIFIED_MUSIC_KEYS } from "@/data";
import { useControlsStore } from "@/store";

export const useCurrentTuneKeyOffsetFromC = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const offsetFromC = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;

  return { offsetFromC };
};
