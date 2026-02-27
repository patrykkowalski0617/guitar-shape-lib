import { useMusicStore, usePlayerStore } from "@/store";
import { useEffect, type RefObject } from "react";
import { useShapeNotes } from "../FretboardCell/hooks";
import { getShapeFretRange } from "../helpers/getShapeFretRange";

export const useFretboardScroll = (containerRef: RefObject<HTMLDivElement | null>) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const shapeVariantLocationData_ghost = useMusicStore((state) => state.shapeVariantLocationData_ghost);
  const shapeVariantLocationData_regular = useMusicStore((state) => state.shapeVariantLocationData);

  const shapeVariantLocationData = isPlaying ? shapeVariantLocationData_ghost : shapeVariantLocationData_regular;

  const notes = useShapeNotes(shapeVariantLocationData);
  const { min, max } = getShapeFretRange(notes);

  const theLowestFret = min === -1 ? 0 : min;
  const theHighestFret = max === -1 ? 0 : max;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !shapeVariantLocationData) return;

    const timer = setTimeout(() => {
      if (theLowestFret === 0) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const lowestCell = container.querySelector(`[data-fret="${theLowestFret}"]`) as HTMLElement;
      const highestCell = container.querySelector(`[data-fret="${theHighestFret}"]`) as HTMLElement;

      if (lowestCell && highestCell) {
        const containerRect = container.getBoundingClientRect();
        const lowestRect = lowestCell.getBoundingClientRect();
        const highestRect = highestCell.getBoundingClientRect();

        const isLowestVisible = lowestRect.left >= containerRect.left;
        const isHighestVisible = highestRect.right <= containerRect.right;

        if (isLowestVisible && isHighestVisible) return;

        const targetScrollLeft = container.scrollLeft + (lowestRect.left - containerRect.left) - 60;
        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [containerRef, shapeVariantLocationData, theLowestFret, theHighestFret]);
};
