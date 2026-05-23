import { useState } from "react";

export function usePersistentBoolean(condition: boolean) {
  const [initialValue] = useState(condition);
  const [hasChanged, setHasChanged] = useState(false);

  if (!hasChanged && condition !== initialValue) {
    setHasChanged(true);
  }

  if (hasChanged) {
    return !initialValue;
  }

  return condition;
}
