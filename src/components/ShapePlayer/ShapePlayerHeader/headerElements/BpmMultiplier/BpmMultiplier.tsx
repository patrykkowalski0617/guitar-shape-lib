import { useState } from "react";
import * as S from "./parts";
import { useMetronomeStore } from "@/store";

export const BpmMultiplier = () => {
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const setBpmMultiplier = useMetronomeStore((state) => state.setBpmMultiplier);
  const bpmMultiplier = useMetronomeStore((state) => state.bpmMultiplier);
  const [count, setCount] = useState(bpmMultiplier);

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
