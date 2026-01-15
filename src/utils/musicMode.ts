export type MusicModeId = "major" | "minor";

export interface MusicModeData {
  label: string;
  descriptiveLabel: string;
}

export const musicMode: Record<MusicModeId, MusicModeData> = {
  major: { label: "Major", descriptiveLabel: "Bright" },
  minor: { label: "minor", descriptiveLabel: "Dark" },
};
