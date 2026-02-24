export type RoleId = "tonic" | "subdominant" | "dominant" | "all-one-instacne" | "all-maching-key";

export interface RoleData {
  label: string;
}

export const roles: Record<RoleId, RoleData> = {
  "all-maching-key": {
    label: "All maching current Key",
  },
  "all-one-instacne": {
    label: "One instance of each arp/scale",
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
