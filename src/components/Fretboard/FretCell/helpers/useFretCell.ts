import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS } from "@/utils";
import type { HighlightRole } from "@/utils/roleColors";

export const useFretCell = () => {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const lockedRoleId = useMusicStore((state) => state.lockedRoleId);

  const activeRole: HighlightRole = (currentRoleId as HighlightRole) || "none";

  return {
    states: {
      lockedRoleId,
      currentRoleId,
      isFlatTune: UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune,
      activeRole,
    },
    actions: {
      setActiveNoteId,
    },
  };
};
