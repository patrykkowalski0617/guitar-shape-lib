import type { ShapePlayerBrick } from "@/store";

export const exportBricksToJson = async (bricks: ShapePlayerBrick[]) => {
  if (!bricks || bricks.length === 0) return;

  const now = new Date();
  const datePart = now.toISOString().split("T")[0];
  const timePart =
    now.getHours().toString().padStart(2, "0") +
    "-" +
    now.getMinutes().toString().padStart(2, "0");

  const firstSnapshot = bricks[0];
  const keyInfo = firstSnapshot
    ? `Key-${firstSnapshot.unifiedMusicKeysDataKey}`
    : "Key-unknown";

  const generatedFileName = `${datePart}_${timePart}_${keyInfo}.json`;
  const dataString = JSON.stringify(bricks, null, 2);

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
      console.warn("Eksport przerwany przez użytkownika" + err);
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
