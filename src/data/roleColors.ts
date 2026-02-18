export type HighlightRole = "tonic" | "subdominant" | "dominant" | "all";

export const roleColors: Record<HighlightRole, string> = {
  tonic: "var(--primary)",
  subdominant: "var(--primary)",
  dominant: "var(--primary)",
  all: "var(--accent)",
};
