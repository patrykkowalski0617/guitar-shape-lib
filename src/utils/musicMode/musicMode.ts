export type MusicModeId = "major" | "minor";

export interface MusicModeData {
  label: string;
  description: string;
}

export const musicMode: Record<MusicModeId, MusicModeData> = {
  major: { label: "Major", description: "Bright" },
  minor: { label: "minor", description: "Dark" },
};
