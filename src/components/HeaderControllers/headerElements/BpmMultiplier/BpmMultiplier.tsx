import { useState } from "react";
import { useMetronomeStore } from "@/store";
import { Button } from "@/components/ui";

export const BpmMultiplier = () => {
  const setBpmMultiplier = useMetronomeStore((s) => s.setBpmMultiplier);
  const bpmMultiplier = useMetronomeStore((s) => s.bpmMultiplier);
  const [count, setCount] = useState(bpmMultiplier);

  const handleClick = () => {
    const nextCount = count >= 5 ? 1 : count + 1;
    setCount(nextCount);
    setBpmMultiplier(nextCount);
  };

  return <Button onClick={handleClick}>/{count}</Button>;
};
