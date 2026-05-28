import { useState } from "react";
import { useMetronomeStore } from "@/store";
import * as S from "./parts";

export const BpmMultiplier = () => {
  const setBpmMultiplier = useMetronomeStore((s) => s.setBpmMultiplier);
  const bpmMultiplier = useMetronomeStore((s) => s.bpmMultiplier);
  const [count, setCount] = useState(bpmMultiplier);

  const handleClick = () => {
    const nextCount = count >= 5 ? 1 : count + 1;
    setCount(nextCount);
    setBpmMultiplier(nextCount);
  };

  // return <S.Button onClick={handleClick}>/{count}</S.Button>;
  return <S.Button onClick={handleClick}>Devide by {count}</S.Button>;
};
