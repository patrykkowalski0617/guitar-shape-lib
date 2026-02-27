import { useControlsStore } from "@/store";
import { useEffect, useRef, type RefObject } from "react";
import { CollapsibleSectionTransitionTime } from "@/parts";

export const usePianoScroll = (containerRef: RefObject<HTMLDivElement | null>) => {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const roleId = useControlsStore((state) => state.roleId);
  const isPianoVisible = useControlsStore((state) => state.isPianoVisible);
  const scrollRequestCount = useControlsStore((state) => state.scrollRequestCount);

  const lastProcessedScrollRequest = useRef(scrollRequestCount);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isPianoVisible) return;

    const shouldScrollY = scrollRequestCount > lastProcessedScrollRequest.current;
    const waitTime = shouldScrollY ? CollapsibleSectionTransitionTime + 100 : 50;

    const timer = setTimeout(() => {
      const firstHighlighted = container.querySelector('[data-piano-scroll-target="true"]') as HTMLElement;
      if (firstHighlighted) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = firstHighlighted.getBoundingClientRect();
        const targetScrollLeft = container.scrollLeft + (elementRect.left - containerRect.left) - 35;
        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }

      if (shouldScrollY) {
        container.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        lastProcessedScrollRequest.current = scrollRequestCount;
      }
    }, waitTime);

    return () => clearTimeout(timer);
  }, [containerRef, isMajorMode, tuneKeyId, roleId, isPianoVisible, scrollRequestCount]);
};
