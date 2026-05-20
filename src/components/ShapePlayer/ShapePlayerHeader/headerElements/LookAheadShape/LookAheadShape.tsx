import { useState } from "react";
import * as S from "./parts";
import { useControllersStore } from "@/store";

export const LookAheadShape = () => {
  const lookAheadShapeBeatsAmount = useControllersStore(
    (state) => state.lookAheadShapeBeatsAmount,
  );
  const setLookAheadShapeBeatsAmount = useControllersStore(
    (state) => state.setLookAheadShapeBeatsAmount,
  );
  const [count, setCount] = useState(lookAheadShapeBeatsAmount);

  const handleClick = () => {
    const nextCount = count >= 4 ? 1 : count + 1;
    setCount(nextCount);
    setLookAheadShapeBeatsAmount(nextCount);
  };

  return <S.Button onClick={handleClick}>Shape {count}</S.Button>;
};
