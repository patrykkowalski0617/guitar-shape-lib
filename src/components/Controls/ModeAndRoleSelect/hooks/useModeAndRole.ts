import { useMusicStore, useControlsStore } from "@/store";
import { type RoleId, roles } from "@/data";
import { isGlobalRole } from "@/utils";

export function useModeAndRole() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const roleId = useControlsStore((state) => state.roleId);
  const setRoleId = useControlsStore((state) => state.setRoleId);
  const setShape = useControlsStore((state) => state.setShape);
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );

  const effectiveRoleId = roleId ?? "all-one-instance";
  const modePrefix = isMajorMode ? "major" : "minor";

  const currentValue = isGlobalRole(effectiveRoleId)
    ? effectiveRoleId
    : `${modePrefix}-${effectiveRoleId}`;

  const functionalRoles = (
    Object.entries(roles) as [RoleId, { label: string }][]
  ).filter(([id]) => !isGlobalRole(id));

  const applyGlobalRole = (value: RoleId) => {
    setRoleId(value);
    setShape(null, null);
    setIsMajorMode(true);
  };

  const applyFunctionalRole = (value: string) => {
    const [mode, role] = value.split("-") as ["major" | "minor", RoleId];
    setIsMajorMode(mode === "major");
    setRoleId(role);
  };

  const handleValueChange = (value: string) => {
    setShapeVariantLocationData(null);

    if (isGlobalRole(value as RoleId)) {
      applyGlobalRole(value as RoleId);
      return;
    }

    applyFunctionalRole(value);
  };

  return {
    currentValue,
    handleValueChange,
    functionalRoles,
    globalRoles: {
      oneInstance: roles["all-one-instance"],
      matchingKey: roles["all-matching-key"],
    },
  };
}
