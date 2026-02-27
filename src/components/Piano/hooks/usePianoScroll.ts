import { useControlsStore } from "@/store";
import { useEffect, useRef, type RefObject } from "react";
import { CollapsibleSectionTransitionTime } from "@/parts";

export const usePianoScroll = (containerRef: RefObject<HTMLDivElement | null>) => {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const roleId = useControlsStore((state) => state.roleId);
  const isPianoVisible = useControlsStore((state) => state.isPianoVisible);

  const isFirstRender = useRef(true);
  const prevVisible = useRef(isPianoVisible);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isPianoVisible) {
      prevVisible.current = isPianoVisible;
      return;
    }

    const isOpening = isPianoVisible && !prevVisible.current;
    const waitTime = isOpening ? CollapsibleSectionTransitionTime + 100 : 50;

    const timer = setTimeout(() => {
      const firstHighlighted = container.querySelector('[data-piano-scroll-target="true"]') as HTMLElement;
      if (firstHighlighted) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = firstHighlighted.getBoundingClientRect();
        const targetScrollLeft = container.scrollLeft + (elementRect.left - containerRect.left) - 35;
        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }

      if (!isFirstRender.current && isOpening) {
        container.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      isFirstRender.current = false;
      prevVisible.current = isPianoVisible;
    }, waitTime);

    return () => clearTimeout(timer);
  }, [containerRef, isMajorMode, tuneKeyId, roleId, isPianoVisible]);
};
