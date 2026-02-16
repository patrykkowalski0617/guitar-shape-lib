export type MusicModeId = "major" | "minor";

export interface MusicModeData {
  label: string;
}

export const musicMode: Record<MusicModeId, MusicModeData> = {
  major: { label: "Major" },
  minor: { label: "minor" },
};
