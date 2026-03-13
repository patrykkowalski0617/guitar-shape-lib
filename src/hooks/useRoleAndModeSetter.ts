import type { RoleId } from "@/data";
import { useControlsStore, useMusicStore } from "@/store";
import { isGlobalRole } from "@/utils";

export const useRoleAndModeSetter = () => {
  const setRoleId = useControlsStore((state) => state.setRoleId);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);

  const roleId = useControlsStore((state) => state.roleId);

  const isRoleSelected = !!(roleId && !isGlobalRole(roleId));

  interface RoleAndModeValue {
    role: RoleId;
    isMajorMode: boolean;
  }

  const roleAndModeValuesMap: RoleAndModeValue[] = [
    {
      role: "tonic",
      isMajorMode: true,
    },
    {
      role: "subdominant",
      isMajorMode: false,
    },
    {
      role: "dominant",
      isMajorMode: false,
    },
    {
      role: "subdominant",
      isMajorMode: true,
    },
    {
      role: "dominant",
      isMajorMode: true,
    },
    {
      role: "tonic",
      isMajorMode: false,
    },
  ];

  const setRoleAndMode = (roleAndModeValuesMapIndex: number) => {
    setActiveNoteId(null);
    if (isRoleSelected || roleAndModeValuesMapIndex === -1) {
      setRoleId("all-matching-key");
      setIsMajorMode(true);
      setShapeVariantLocationData(null);
      setShapeVariantLocationData_locked(shapeVariantLocationData);
    } else {
      setRoleId(roleAndModeValuesMap[roleAndModeValuesMapIndex].role);
      setIsMajorMode(
        roleAndModeValuesMap[roleAndModeValuesMapIndex].isMajorMode,
      );
    }
  };

  return setRoleAndMode;
};
