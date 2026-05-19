import { useState } from "react";
import * as S from "./parts";
import { useMetronomeStore } from "@/store";

export const BpmMultiplier = () => {
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const [count, setCount] = useState(1);
  const setBpmMultiplier = useMetronomeStore((state) => state.setBpmMultiplier);

  const handleClick = () => {
    const nextCount = count >= 4 ? 1 : count + 1;
    setCount(nextCount);
    setBpmMultiplier(nextCount);
  };

  return (
    <S.Button disabled={isPlaying} onClick={handleClick}>
      /{count}
    </S.Button>
  );
};
