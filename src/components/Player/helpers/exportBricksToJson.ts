import type { Brick } from "@/store";

export const exportBricksToJson = async (bricks: Brick[]) => {
  if (!bricks || bricks.length === 0) return;

  const now = new Date();
  const datePart = now.toISOString().split("T")[0];
  const timePart =
    now.getHours().toString().padStart(2, "0") +
    "-" +
    now.getMinutes().toString().padStart(2, "0");

  const firstSnapshot = bricks[0].snapshot;
  const keyInfo = firstSnapshot
    ? `Key-${firstSnapshot.tuneKeyId}`
    : "Key-unknown";

  const bricksInfo = bricks
    .map((b) =>
      b.snapshot
        ? `${b.snapshot.baseChordId}${b.snapshot.rootNote}${b.snapshot.shapeLabel}`
        : "",
    )
    .filter(Boolean)
    .join("_");

  const generatedFileName = `${datePart}_${timePart}_${keyInfo}_${bricksInfo}.json`;
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
