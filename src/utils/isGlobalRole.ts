import type { GlobalRoleId, RoleId } from "@/data";

export const isGlobalRole = (roleId: RoleId | null): roleId is GlobalRoleId =>
  roleId === "all-matching-key";
