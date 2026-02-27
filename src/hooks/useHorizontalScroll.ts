import { useEffect, type RefObject } from "react";

export const useHorizontalScroll = (ref: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const hasHorizontalScrollbar = el.scrollWidth > el.clientWidth;
      if (!hasHorizontalScrollbar) return;

      if (Math.abs(e.deltaX) > 0 || e.shiftKey) return;

      const isAtLeft = el.scrollLeft <= 0;
      const isAtRight = Math.abs(el.scrollLeft + el.clientWidth - el.scrollWidth) < 1;

      const canScrollFurther = (e.deltaY > 0 && !isAtRight) || (e.deltaY < 0 && !isAtLeft);

      if (canScrollFurther) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [ref]);
};
