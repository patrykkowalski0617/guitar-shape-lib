import { useState } from "react";
import * as S from "./parts";

export const BpmButton = () => {
  const [count, setCount] = useState(1);

  const handleClick = () => {
    setCount((prev) => (prev >= 5 ? 1 : prev + 1));
  };

  return <S.BpmButton onClick={handleClick}>{count} x</S.BpmButton>;
};
