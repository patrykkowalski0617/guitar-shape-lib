import { useEffect, useState } from "react";

export function useBrickWidthUnit() {
  const getValue = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) return 40;
    if (window.matchMedia("(min-width: 768px)").matches) return 35;
    return 20;
  };

  const [unit, setUnit] = useState(getValue);

  useEffect(() => {
    const handler = () => setUnit(getValue());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return unit;
}
