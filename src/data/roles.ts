export type FunctionalRoleId = "tonic" | "subdominant" | "dominant";
export type GlobalRoleId = "all-one-instance" | "all-matching-key";
export type RoleId = FunctionalRoleId | GlobalRoleId;

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
