export type RoleId = "tonic" | "subdominant" | "dominant";

export interface RoleData {
  label: string;
  descriptiveLabel: string;
}

export const roles: Record<RoleId, RoleData> = {
  tonic: { label: "Tonic", descriptiveLabel: "Release" },
  subdominant: { label: "Subdominant", descriptiveLabel: "Motion" },
  dominant: { label: "Dominant", descriptiveLabel: "Tension" },
};
