export type MusicFunctionId = "tonic" | "subdominant" | "dominant";

export interface MusicFunctionData {
  label: string;
  description: string;
}

export const musicFunctions: Record<MusicFunctionId, MusicFunctionData> = {
  tonic: { label: "Tonic", description: "Release" },
  subdominant: { label: "Subdominant", description: "Motion" },
  dominant: { label: "Dominant", description: "Tension" },
};
