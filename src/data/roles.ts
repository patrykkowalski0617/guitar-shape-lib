export type FunctionalRoleId = "tonic" | "subdominant" | "dominant" | "mediant";
export type GlobalRoleId = "all-matching-key";
export type RoleId = FunctionalRoleId | GlobalRoleId;

interface RoleData {
  label: string;
}

export const roles: Record<RoleId, RoleData> = {
  "all-matching-key": {
    label: "Base chord",
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
  mediant: {
    label: "Mediant",
  },
};
