import { useState } from "react";

export function usePersistentUnlock(isDisabled: boolean) {
  const [wasUnlocked, setWasUnlocked] = useState(false);

  if (!isDisabled && !wasUnlocked) {
    setWasUnlocked(true);
  }
  const persistentDisabled = wasUnlocked ? false : isDisabled;

  return persistentDisabled;
}
