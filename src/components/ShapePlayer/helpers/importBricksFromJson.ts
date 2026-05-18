import type { ShapePlayerBrick } from "@/store";

interface ImportParams {
  file: File;
  onSuccess: (bricks: ShapePlayerBrick[], title: string | null) => void;
  onError: (error: string) => void;
}

export const importBricksFromJson = ({
  file,
  onSuccess,
  onError,
}: ImportParams) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const jsonContent = event.target?.result as string;
      const parsedData = JSON.parse(jsonContent);

      let bricks: ShapePlayerBrick[] = [];
      let title: string | null = null;

      if (
        parsedData &&
        typeof parsedData === "object" &&
        "shapePlayerBricks" in parsedData
      ) {
        bricks = parsedData.shapePlayerBricks;
        title = parsedData.exerciseTitle;
      } else if (Array.isArray(parsedData)) {
        bricks = parsedData;
      }

      if (Array.isArray(bricks) && bricks.length > 0) {
        onSuccess(bricks, title);
      } else {
        onError("Invalid file structure: Expected shapePlayerBricks.");
      }
    } catch (e) {
      onError("Failed to parse JSON file." + e);
    }
  };

  reader.onerror = () => onError("Error reading file.");
  reader.readAsText(file);
};
