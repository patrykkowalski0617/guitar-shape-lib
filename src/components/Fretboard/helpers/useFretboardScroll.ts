import { useMusicStore } from "@/store/useMusicStore";
import { useEffect, type RefObject } from "react";
import { useShapeNotes } from "../FretCell/helpers";
import { getTheLowestFret } from "./getTheLowestFret";

export const useFretboardScroll = (containerRef: RefObject<HTMLDivElement | null>) => {
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);

  const notes = useShapeNotes(currentShapeVariantLocationData);
  const theLowestFret = getTheLowestFret(notes);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !currentShapeVariantLocationData || theLowestFret === 0) return;

    const timer = setTimeout(() => {
      const targetCell = container.querySelector(`[data-fret="${theLowestFret}"]`) as HTMLElement;

      if (targetCell) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = targetCell.getBoundingClientRect();

        const targetScrollLeft = container.scrollLeft + (elementRect.left - containerRect.left) - 35;

        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [containerRef, currentShapeVariantLocationData, theLowestFret]);
};
