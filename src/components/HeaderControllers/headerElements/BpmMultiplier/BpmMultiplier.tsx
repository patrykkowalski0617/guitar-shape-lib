import { useState } from "react";
import { useMetronomeStore } from "@/store";
import { Button } from "@/components/ui";

export const BpmMultiplier = () => {
  const setBpmMultiplier = useMetronomeStore((state) => state.setBpmMultiplier);
  const bpmMultiplier = useMetronomeStore((state) => state.bpmMultiplier);
  const [count, setCount] = useState(bpmMultiplier);

  const handleClick = () => {
    const nextCount = count >= 5 ? 1 : count + 1;
    setCount(nextCount);
    setBpmMultiplier(nextCount);
  };

  return <Button onClick={handleClick}>/{count}</Button>;
};
