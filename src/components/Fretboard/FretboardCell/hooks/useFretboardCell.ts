import { useMusicStore, useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS } from "@/data";

export const useFretboardCell = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const roleId = useControlsStore((state) => state.roleId);
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);

  return {
    states: {
      roleId,
      isFlatTune: UNIFIED_MUSIC_KEYS[tuneKeyId].isFlatTune,
    },
    actions: {
      setActiveNoteId,
    },
  };
};
