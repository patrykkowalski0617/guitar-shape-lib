import { useState } from "react";
import * as S from "./parts";
import { useControllersStore } from "@/store";

export const LookAhead = () => {
  const lookAheadBeatsAmount = useControllersStore(
    (state) => state.lookAheadBeatsAmount,
  );
  const setLookAheadBeatsAmount = useControllersStore(
    (state) => state.setLookAheadBeatsAmount,
  );
  const [count, setCount] = useState(lookAheadBeatsAmount);

  const handleClick = () => {
    const nextCount = count >= 4 ? 1 : count + 1;
    setCount(nextCount);
    setLookAheadBeatsAmount(nextCount);
  };

  return <S.Button onClick={handleClick}>{count}</S.Button>;
};
