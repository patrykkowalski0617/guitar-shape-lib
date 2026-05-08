import type { Brick } from "@/store";

interface ImportParams {
  file: File;
  onSuccess: (bricks: Brick[]) => void;
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
      const importedData = JSON.parse(jsonContent) as Brick[];

      const hasValidStructure =
        Array.isArray(importedData) && importedData.length > 0;

      if (hasValidStructure) {
        onSuccess(importedData);
      } else {
        onError("Invalid file structure: Expected an array of bricks.");
      }
    } catch (e) {
      onError("Failed to parse JSON file." + e);
    }
  };

  reader.onerror = () => onError("Error reading file.");
  reader.readAsText(file);
};
