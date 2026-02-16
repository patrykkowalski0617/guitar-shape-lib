export type RoleId = "tonic" | "subdominant" | "dominant";

export interface RoleData {
  label: "Tonic" | "Subdominant" | "Dominant";
}

export const roles: Record<RoleId, RoleData> = {
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
