import { FileDown } from "lucide-react";
import { useMetronomeStore, useShapePlayerStore } from "@/store";
import { Button } from "../../../ui/parts";
import { exportBricksToJson } from "@/components/ShapePlayer/helpers/exportBricksToJson";

export function Save() {
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );
  const exerciseTitle = useShapePlayerStore((state) => state.exerciseTitle);

  const handleExport = () => {
    exportBricksToJson(guitarShapePlayerBricks, exerciseTitle);
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isPlaying || guitarShapePlayerBricks.length === 0}
    >
      <FileDown />
    </Button>
  );
}
