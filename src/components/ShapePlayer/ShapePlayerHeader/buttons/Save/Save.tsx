import { FileDown } from "lucide-react";
import { useMetronomeStore, useShapePlayerStore } from "@/store";
import { Button } from "../../../ui/parts";
import { exportBricksToJson } from "@/components/ShapePlayer/helpers/exportBricksToJson";

export function Save() {
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const shapePlayerBricks = useShapePlayerStore(
    (state) => state.shapePlayerBricks,
  );

  const handleExport = () => {
    exportBricksToJson(shapePlayerBricks);
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isPlaying || shapePlayerBricks.length === 0}
    >
      <FileDown />
    </Button>
  );
}
