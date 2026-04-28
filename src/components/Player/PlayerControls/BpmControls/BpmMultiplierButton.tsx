import { useState } from "react";
import * as S from "./parts";
import { usePlayerStore } from "@/store";
import { PlayerElementWrapper } from "../../parts";

export const BpmMultiplierButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const [count, setCount] = useState(1);
  const setBpmMultiplier = usePlayerStore((state) => state.setBpmMultiplier);

  const handleClick = () => {
    const nextCount = count >= 3 ? 1 : count + 1;
    setCount(nextCount);
    setBpmMultiplier(nextCount);
  };

  return (
    <PlayerElementWrapper>
      <S.BpmButton disabled={isPlaying} onClick={handleClick}>
        {count} x
      </S.BpmButton>
    </PlayerElementWrapper>
  );
};
