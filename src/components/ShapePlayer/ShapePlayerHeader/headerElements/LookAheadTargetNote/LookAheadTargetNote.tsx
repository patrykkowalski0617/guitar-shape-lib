import { useState } from "react";
import * as S from "./parts";
import { useControllersStore } from "@/store";

export const LookAheadTargetNote = () => {
  const lookAheadTargetNoteBeatsAmount = useControllersStore(
    (state) => state.lookAheadTargetNoteBeatsAmount,
  );
  const setLookAheadTargetNoteBeatsAmount = useControllersStore(
    (state) => state.setLookAheadTargetNoteBeatsAmount,
  );
  const [count, setCount] = useState(lookAheadTargetNoteBeatsAmount);

  const handleClick = () => {
    const nextCount = count >= 4 ? 1 : count + 1;
    setCount(nextCount);
    setLookAheadTargetNoteBeatsAmount(nextCount);
  };

  return <S.Button onClick={handleClick}>Target {count}</S.Button>;
};
