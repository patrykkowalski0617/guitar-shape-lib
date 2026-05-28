// import { FileDown } from "lucide-react";
import { useMetronomeStore, useShapePlayerStore } from "@/store";
import { Button } from "@/components/ui";
import { exportBricksToJson } from "@/components/ShapePlayer/helpers/exportBricksToJson";

export function Save() {
  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const guitarShapePlayerBricks = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks,
  );
  const exerciseTitle = useShapePlayerStore((s) => s.exerciseTitle);

  const handleExport = () => {
    exportBricksToJson(guitarShapePlayerBricks, exerciseTitle);
  };

  return (
    <Button
      $w={2}
      onClick={handleExport}
      disabled={isPlaying || guitarShapePlayerBricks.length === 0}
    >
      {/* <FileDown /> */}
      Save
    </Button>
  );
}
