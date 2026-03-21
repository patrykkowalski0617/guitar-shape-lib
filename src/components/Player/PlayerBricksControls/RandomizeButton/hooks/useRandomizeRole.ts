import { roles, type RoleId } from "@/data";
import { isGlobalRole } from "@/utils";

export const useRandomizeRole = () => {
  const setRandomRole = () => {
    const functionalRoles = (Object.keys(roles) as RoleId[]).filter(
      (id) => !isGlobalRole(id),
    );

    const randomRole =
      functionalRoles[Math.floor(Math.random() * functionalRoles.length)];

    return randomRole;
  };

  return { setRandomRole };
};
