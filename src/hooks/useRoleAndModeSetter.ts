import { roleAndModeValuesMap } from "@/data";
import { useControlsStore, useMusicStore } from "@/store";

export const useRoleAndModeSetter = () => {
  const setRoleId = useControlsStore((state) => state.setRoleId);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);

  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);

  const setRoleAndMode = (roleAndModeValuesMapIndex: number) => {
    setActiveNoteId(null);
    if (roleAndModeValuesMapIndex === -1) {
      setRoleId("all-matching-key");
      setIsMajorMode(true);
      setShapeVariantLocationData(null);
    } else {
      setRoleId(roleAndModeValuesMap[roleAndModeValuesMapIndex].role);
      setIsMajorMode(
        roleAndModeValuesMap[roleAndModeValuesMapIndex].isMajorMode,
      );
    }
  };

  return setRoleAndMode;
};
