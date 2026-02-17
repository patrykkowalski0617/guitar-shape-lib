export type RoleId = "tonic" | "subdominant" | "dominant" | "all";

export interface RoleData {
  label: "All" | "Tonic" | "Subdominant" | "Dominant";
}

export const roles: Record<RoleId, RoleData> = {
  all: {
    label: "All",
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
