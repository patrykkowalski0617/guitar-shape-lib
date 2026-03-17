import type { GlobalRoleId, RoleId } from "@/data";

export const isGlobalRole = (
  roleId: RoleId | "all-one-instance",
): roleId is GlobalRoleId => roleId === "all-matching-key";
