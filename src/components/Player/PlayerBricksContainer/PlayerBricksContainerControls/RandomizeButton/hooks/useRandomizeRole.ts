import { useControlsStore } from "@/store";
import { roles, type RoleId, isGlobalRole } from "@/data";

export const useRandomizeRole = () => {
  const setRoleId = useControlsStore((state) => state.setRoleId);

  const setRandomRole = () => {
    const functionalRoles = (Object.keys(roles) as RoleId[]).filter((id) => !isGlobalRole(id));

    const randomRole = functionalRoles[Math.floor(Math.random() * functionalRoles.length)];
    setRoleId(randomRole);
    return randomRole;
  };

  return setRandomRole;
};
