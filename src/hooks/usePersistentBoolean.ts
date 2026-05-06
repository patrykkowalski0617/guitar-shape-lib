import { useState } from "react";

export function usePersistentBoolean(condition: boolean) {
  const [hasBeenMet, setHasBeenMet] = useState(condition);

  if (!hasBeenMet && condition) {
    setHasBeenMet(true);
  }

  return hasBeenMet;
}
