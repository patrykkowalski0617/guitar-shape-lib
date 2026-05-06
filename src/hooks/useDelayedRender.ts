import { useState, useEffect } from "react";

export function useDelayedRender(activeCondition: boolean, delay: number) {
  const [shouldRender, setShouldRender] = useState(activeCondition);

  if (activeCondition && !shouldRender) {
    setShouldRender(true);
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!activeCondition && shouldRender) {
      timer = setTimeout(() => {
        setShouldRender(false);
      }, delay);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [activeCondition, shouldRender, delay]);

  return shouldRender;
}
