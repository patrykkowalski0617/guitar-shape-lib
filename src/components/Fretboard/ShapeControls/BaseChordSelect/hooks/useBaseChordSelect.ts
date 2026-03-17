import { useMusicStore, useControlsStore } from "@/store";
import { type RoleId, roles, roleAndModeValuesMap } from "@/data";
import { isGlobalRole } from "@/utils";
import { useRoleAndModeSetter } from "@/hooks";

export function useBaseChordSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const roleId = useControlsStore((state) => state.roleId);
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setRoleAndMode = useRoleAndModeSetter();

  const effectiveRoleId = roleId ?? "all-one-instance";
  const isCurrentRoleGlobal = isGlobalRole(effectiveRoleId);

  const foundIndex = roleAndModeValuesMap.findIndex(
    (item) => item.role === effectiveRoleId && item.isMajorMode === isMajorMode,
  );

  const mappedIndexValue = foundIndex !== -1 ? String(foundIndex) : "";
  const currentValue = isCurrentRoleGlobal ? effectiveRoleId : mappedIndexValue;

  const handleValueChange = (value: string) => {
    setShapeVariantLocationData(null);

    const isGlobal = isGlobalRole(value as RoleId);

    if (isGlobal) {
      setRoleAndMode(-1);
    }

    setRoleAndMode(Number(value));
  };

  return {
    currentValue,
    handleValueChange,
    globalRoles: {
      matchingKey: roles["all-matching-key"],
    },
  };
}
