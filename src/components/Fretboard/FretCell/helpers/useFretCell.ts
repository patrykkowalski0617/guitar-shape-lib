import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { UNIFIED_MUSIC_KEYS } from "@/utils";
import { useShapeVariantIterator } from "./useShapeVariantIterator";
import type { HighlightRole } from "@/utils/roleColors";

export const useFretCell = () => {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const lockedRoleId = useMusicStore((state) => state.lockedRoleId);

  const { setNextShapeVariantLocationData } = useShapeVariantIterator();

  const activeRole: HighlightRole = (currentRoleId as HighlightRole) || "none";

  return {
    states: {
      lockedRoleId,
      currentRoleId,
      isFlatTune: UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune,
      areAnimationsOn,
      activeRole,
    },
    actions: {
      setActiveNoteId,
      setNextShapeVariantLocationData,
    },
  };
};
