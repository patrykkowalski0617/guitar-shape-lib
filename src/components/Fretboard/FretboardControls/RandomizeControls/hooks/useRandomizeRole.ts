import { useControlsStore } from "@/store";
import { roles, type RoleId, isGlobalRole } from "@/data";

export const useRandomizeRole = () => {
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);

  const setRandomRole = () => {
    const functionalRoles = (Object.keys(roles) as RoleId[]).filter((id) => !isGlobalRole(id));

    const randomRole = functionalRoles[Math.floor(Math.random() * functionalRoles.length)];
    setCurrentRoleId(randomRole);
    return randomRole;
  };

  return setRandomRole;
};
