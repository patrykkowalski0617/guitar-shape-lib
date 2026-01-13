import { type MusicFunctionId } from "@/utils";

export type HighlightMusicFuntion = "tonic" | "subdominant" | "dominant" | "none";

export const getHighlightMusicFuntion = (
  index: number,
  isMajorMode: boolean,
  currentFunction: MusicFunctionId | null
): HighlightMusicFuntion => {
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

export const musicFunctionColors = {
  tonic: "var(--secondary)",
  subdominant: "var(--primary)",
  dominant: "#f59e0b",
  none: "var(--accent)",
};
