import { FileDown } from "lucide-react";
import { usePlayerStore } from "@/store";
import * as S from "./parts";
import { playerIconSize } from "../../constants";

export function SavePreset() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bricks = usePlayerStore((state) => state.bricks);

  const handleExport = () => {};

  return (
    <S.Button
      variant={"playerOutline"}
      onClick={handleExport}
      disabled={isPlaying || bricks.length === 0}
    >
      <FileDown size={playerIconSize} />
    </S.Button>
  );
}
