import { useControlsStore } from "@/store/useControlsStore";
import { roles, type RoleId } from "@/data";

export const useRandomizeRole = () => {
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);

  const setRandomRole = () => {
    const functionalRoles = (Object.keys(roles) as RoleId[]).filter((roleId) => roleId !== "all");

    const randomRole = functionalRoles[Math.floor(Math.random() * functionalRoles.length)];

    setCurrentRoleId(randomRole);

    return randomRole;
  };

  return setRandomRole;
};
