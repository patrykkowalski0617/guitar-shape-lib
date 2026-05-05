import { useState } from "react";

export function usePersistentUnlock(isDisabled: boolean) {
  const [wasUnlocked, setWasUnlocked] = useState(false);

  if (!isDisabled && !wasUnlocked) {
    setWasUnlocked(true);
  }
  const persistentDisabled = wasUnlocked ? false : isDisabled;

  return persistentDisabled;
}

export function usePersistentLock(condition: boolean) {
  const [isLocked, setIsLocked] = useState(false);

  if (condition && !isLocked) {
    setIsLocked(true);
  }

  return isLocked;
}
