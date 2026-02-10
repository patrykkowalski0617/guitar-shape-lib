import { useControlsStore } from "@/store/useControlsStore";
import { roles, type RoleId } from "@/utils";

export const useRandomizeRole = () => {
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);

  const setRandomRole = () => {
    const roleIds = Object.keys(roles) as RoleId[];
    const randomRole = roleIds[Math.floor(Math.random() * roleIds.length)];
    setCurrentRoleId(randomRole);

    return randomRole;
  };

  return setRandomRole;
};
