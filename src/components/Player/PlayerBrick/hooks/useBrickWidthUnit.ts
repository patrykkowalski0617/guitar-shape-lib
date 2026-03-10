import { useEffect, useState } from "react";

export function useBrickWidthUnit() {
  const getValue = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) return 30;
    if (window.matchMedia("(min-width: 768px)").matches) return 20;
    return 15;
  };

  const [unit, setUnit] = useState(getValue);

  useEffect(() => {
    const handler = () => setUnit(getValue());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return unit;
}
