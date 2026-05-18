import type { ShapePlayerBrick } from "@/store";

export const exportBricksToJson = async (
  shapePlayerBricks: ShapePlayerBrick[],
  exerciseTitle: string | null,
) => {
  if (!shapePlayerBricks || shapePlayerBricks.length === 0) return;

  const now = new Date();
  const datePart = now.toISOString().split("T")[0];
  const timePart =
    now.getHours().toString().padStart(2, "0") +
    "-" +
    now.getMinutes().toString().padStart(2, "0");

  const firstShapePlayerBricks = shapePlayerBricks[0];
  const keyInfo = firstShapePlayerBricks
    ? `Key-${firstShapePlayerBricks.unifiedMusicKeysDataKey}`
    : "Key-unknown";

  const fileNameBase = exerciseTitle
    ? exerciseTitle.replace(/[^a-z0-9\s-]/gi, "").replace(/\s+/g, "_")
    : `${datePart}_${timePart}_${keyInfo}`;

  const generatedFileName = `${fileNameBase}.json`;

  const exportData = {
    exerciseTitle,
    shapePlayerBricks,
  };

  const dataString = JSON.stringify(exportData, null, 2);

  if (typeof (window as any).showSaveFilePicker === "function") {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: generatedFileName,
        types: [
          {
            description: "JSON Preset File",
            accept: { "application/json": [".json"] },
          },
        ],
      });

      const writable = await handle.createWritable();
      await writable.write(dataString);
      await writable.close();
    } catch (err) {
      console.warn("Eksport przerwany: ", err);
    }
  } else {
    const blob = new Blob([dataString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = generatedFileName;
    link.click();
    URL.revokeObjectURL(url);
  }
};
