export type MusicFunctionId = "tonic" | "subdominant" | "dominant";

export interface MusicFunctionData {
  label: string;
  descriptiveLabel: string;
}

export const musicFunctions: Record<MusicFunctionId, MusicFunctionData> = {
  tonic: { label: "Tonic", descriptiveLabel: "Release" },
  subdominant: { label: "Subdominant", descriptiveLabel: "Motion" },
  dominant: { label: "Dominant", descriptiveLabel: "Tension" },
};
