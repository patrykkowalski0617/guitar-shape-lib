import { useEffect, type DependencyList, type RefObject } from "react";

export const useKeyboardScroll = (
  containerRef: RefObject<HTMLDivElement | null>,
  dependencies: DependencyList,
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const firstHighlighted = container.querySelector(
        '[data-role-highlight="true"]',
      ) as HTMLElement;

      if (firstHighlighted) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = firstHighlighted.getBoundingClientRect();
        const targetScrollLeft =
          container.scrollLeft + (elementRect.left - containerRect.left) - 25;

        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    }, 50);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, ...dependencies]);
};
