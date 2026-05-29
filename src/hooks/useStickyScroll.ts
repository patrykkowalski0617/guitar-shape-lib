import { color } from "@/components/ui";
import { useEffect, useRef } from "react";

export const useStickyScroll = (top: number = 0) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    let initialOffsetTop: number;
    let initialOffsetLeft: number;

    const placeholder = document.createElement("span");
    placeholder.style.display = "inline-block";
    placeholder.style.visibility = "hidden";

    const recalculate = () => {
      if (!ref.current) return;
      // zdejmij fixed żeby getBoundingClientRect dał prawdziwą pozycję
      ref.current.style.position = "static";
      ref.current.style.top = "";
      ref.current.style.left = "";
      placeholder.parentNode?.removeChild(placeholder);

      const rect = ref.current.getBoundingClientRect();
      initialOffsetTop = rect.top + window.scrollY;
      initialOffsetLeft = rect.left;
      placeholder.style.width = `${rect.width}px`;
      placeholder.style.height = `${rect.height}px`;

      // od razu przelicz aktualny stan scrolla
      handleScroll();
    };

    const handleScroll = () => {
      if (!ref.current) return;
      const scrollTop = window.scrollY;

      if (scrollTop + top >= initialOffsetTop) {
        if (ref.current.previousSibling !== placeholder) {
          ref.current.parentNode?.insertBefore(placeholder, ref.current);
        }
        ref.current.style.position = "fixed";
        ref.current.style.top = `${top}px`;
        ref.current.style.left = `${initialOffsetLeft}px`;
        ref.current.style.background = color.bg;
      } else {
        placeholder.parentNode?.removeChild(placeholder);
        ref.current.style.position = "static";
        ref.current.style.top = "";
        ref.current.style.left = "";
      }
    };

    const resizeObserver = new ResizeObserver(recalculate);
    resizeObserver.observe(document.body);

    recalculate();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      placeholder.parentNode?.removeChild(placeholder);
    };
  }, [top]);

  return ref;
};
