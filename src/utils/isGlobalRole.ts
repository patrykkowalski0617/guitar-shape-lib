import type { GlobalRoleId, RoleId } from "@/data";

export const isGlobalRole = (roleId: RoleId): roleId is GlobalRoleId =>
  roleId === "all-matching-key";
