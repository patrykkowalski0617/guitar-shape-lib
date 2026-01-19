import { type RoleId } from "@/utils";

export type HighlightRole = "tonic" | "subdominant" | "dominant" | "none";

export const getHighlightRole = (
  index: number,
  isMajorMode: boolean,
  currentFunction: RoleId | null
): HighlightRole => {
  if (!currentFunction) return "none";

  const logicalIndex = isMajorMode ? index - 2 : index;
  if (logicalIndex < 0) return "none";

  const isEveryOtherFrom = (start: number) =>
    logicalIndex >= start && (logicalIndex - start) % 2 === 0;

  switch (currentFunction) {
    case "tonic":
      return isEveryOtherFrom(0) ? "tonic" : "none";
    case "subdominant":
      return isEveryOtherFrom(3) ? "subdominant" : "none";
    case "dominant":
      return isEveryOtherFrom(4) ? "dominant" : "none";
    default:
      return "none";
  }
};

export const roleColors = {
  tonic: "var(--secondary)",
  subdominant: "var(--primary)",
  dominant: "var(--tension)",
  none: "var(--accent)",
};
