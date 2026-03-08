import type { GlobalRoleId, RoleId } from "@/data";

export const isGlobalRole = (roleId: RoleId | null): roleId is GlobalRoleId =>
  roleId === "all-one-instance" || roleId === "all-matching-key";
