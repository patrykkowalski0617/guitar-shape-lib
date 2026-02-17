export type HighlightRole = "tonic" | "subdominant" | "dominant" | "all";

export const roleColors: Record<HighlightRole, string> = {
  tonic: "var(--secondary)",
  subdominant: "var(--primary)",
  dominant: "var(--tension)",
  all: "var(--border)",
};
