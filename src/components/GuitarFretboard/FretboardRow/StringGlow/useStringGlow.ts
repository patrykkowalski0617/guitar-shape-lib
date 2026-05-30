import { useEffect, useRef, type RefObject } from "react";

export function useStringGlow(
  isVisibleString: boolean,
  rowRef: RefObject<HTMLDivElement | null>,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isGlowEnabled = true;

  useEffect(() => {
    if (!isGlowEnabled || !isVisibleString) return;

    const row = rowRef.current;
    const container = containerRef.current;
    if (!row || !container) return;

    const handleMouseEnter = (event: MouseEvent) => {
      const rect = row.getBoundingClientRect();
      const currentX = event.clientX;

      const entryX = currentX - rect.left;
      const entryXPercentage = (entryX / rect.width) * 100;

      const glow = document.createElement("div");
      glow.className = "glow-particle";
      glow.style.left = `${entryXPercentage}%`;

      const handleAnimationEnd = () => {
        glow.remove();
      };

      glow.addEventListener("animationend", handleAnimationEnd);

      container.appendChild(glow);
    };

    row.addEventListener("mouseenter", handleMouseEnter);

    const handleCleanup = () => {
      row.removeEventListener("mouseenter", handleMouseEnter);
    };

    return handleCleanup;
  }, [isVisibleString, isGlowEnabled, rowRef]);

  return containerRef;
}
