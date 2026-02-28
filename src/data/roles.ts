export type FunctionalRoleId = "tonic" | "subdominant" | "dominant";
export type GlobalRoleId = "all-one-instance" | "all-matching-key";
export type RoleId = FunctionalRoleId | GlobalRoleId;

export const isGlobalRole = (roleId: RoleId | null): roleId is GlobalRoleId =>
  roleId === "all-one-instance" || roleId === "all-matching-key";

export interface RoleData {
  label: string;
}

export const roles: Record<RoleId, RoleData> = {
  "all-matching-key": {
    label: "All - key as context",
  },
  "all-one-instance": {
    label: "All - key as root note",
  },
  tonic: {
    label: "Tonic",
  },
  subdominant: {
    label: "Subdominant",
  },
  dominant: {
    label: "Dominant",
  },
};
