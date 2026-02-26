import { useControlsStore } from "@/store";
import { useEffect, type RefObject } from "react";

export const usePianoScroll = (containerRef: RefObject<HTMLDivElement | null>) => {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const roleId = useControlsStore((state) => state.roleId);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const firstHighlighted = container.querySelector('[data-piano-scroll-target="true"]') as HTMLElement;

      if (firstHighlighted) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = firstHighlighted.getBoundingClientRect();
        const targetScrollLeft = container.scrollLeft + (elementRect.left - containerRect.left) - 35;

        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [containerRef, isMajorMode, tuneKeyId, roleId]);
};
