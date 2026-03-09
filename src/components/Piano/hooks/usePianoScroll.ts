import { useControlsStore } from "@/store";
import { useEffect, type RefObject } from "react";

export const usePianoScroll = (
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const roleId = useControlsStore((state) => state.roleId);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const waitTime = 50;

    const timer = setTimeout(() => {
      const targetSelector = '[data-piano-scroll-target="true"]';
      const firstHighlighted = container.querySelector(
        targetSelector,
      ) as HTMLElement;

      if (firstHighlighted) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = firstHighlighted.getBoundingClientRect();

        const scrollOffset = 35;
        const relativeElementLeft = elementRect.left - containerRect.left;
        const targetScrollLeft =
          container.scrollLeft + relativeElementLeft - scrollOffset;

        container.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });
      }
    }, waitTime);

    return () => clearTimeout(timer);
  }, [containerRef, isMajorMode, tuneKeyId, roleId]);
};
