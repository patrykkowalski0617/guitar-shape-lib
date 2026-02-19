import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS } from "@/data";

export const useFretCell = () => {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);

  return {
    states: {
      currentRoleId,
      isFlatTune: UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune,
    },
    actions: {
      setActiveNoteId,
    },
  };
};
