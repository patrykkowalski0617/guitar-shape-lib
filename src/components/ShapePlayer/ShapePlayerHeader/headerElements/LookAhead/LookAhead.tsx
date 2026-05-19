import { useState } from "react";
import * as S from "./parts";
import { useControllersStore } from "@/store";

export const LookAhead = () => {
  const [count, setCount] = useState(1);
  const setLookAheadBeatsAmount = useControllersStore(
    (state) => state.setLookAheadBeatsAmount,
  );

  const handleClick = () => {
    const nextCount = count >= 4 ? 1 : count + 1;
    setCount(nextCount);
    setLookAheadBeatsAmount(nextCount);
  };

  return <S.Button onClick={handleClick}>{count}</S.Button>;
};
