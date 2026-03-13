import { useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS } from "@/data";
import { ROLE_AND_MODE_BASE_POINTS } from "../constants/constants";

export const useRoleAndModeCoords = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const tuneKeyOffsetFromC = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;

  const roleAndModeCellsCoords = ROLE_AND_MODE_BASE_POINTS.map(
    ([stringIdx, fretIdx]) => [stringIdx, fretIdx + tuneKeyOffsetFromC],
  );

  return roleAndModeCellsCoords;
};
