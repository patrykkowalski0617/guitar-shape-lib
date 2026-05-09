import { Plus, Minus } from "lucide-react";
import { usePlayerStore } from "@/store";
import * as S from "./parts";
import { transposeBricks } from "./helpers/transposeBricks";

export function Transpose() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bricks = usePlayerStore((state) => state.bricks);
  const setBricks = usePlayerStore((state) => state.setBricks);

  const handleTranspose = (semitones: number) => {
    if (bricks.length === 0) return;

    const updatedBricks = transposeBricks(bricks, semitones);
    setBricks(updatedBricks);
  };

  const handleDecrement = () => {
    handleTranspose(-1);
  };

  const handleIncrement = () => {
    handleTranspose(1);
  };

  return (
    <S.Button variant={"playerOutline"} disabled={isPlaying || !bricks.length}>
      <S.MinusArea onClick={handleDecrement}>
        <Minus size={18} strokeWidth={3} />
      </S.MinusArea>
      <S.PlusArea onClick={handleIncrement}>
        <Plus size={18} strokeWidth={3} />
      </S.PlusArea>
    </S.Button>
  );
}
