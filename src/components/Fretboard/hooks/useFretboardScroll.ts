import { useMusicStore } from "@/store";
import { useEffect, type RefObject } from "react";
import { useShapeNotes } from "../FretboardCell/hooks";
import { getTheLowestFret } from "../helpers/getTheLowestFret";

export const useFretboardScroll = (containerRef: RefObject<HTMLDivElement | null>) => {
  const shapeVariantLocationData_ghost = useMusicStore((state) => state.shapeVariantLocationData_ghost);

  const notes = useShapeNotes(shapeVariantLocationData_ghost);
  const rawLowestFret = getTheLowestFret(notes);
  const theLowestFret = rawLowestFret === -1 ? 0 : rawLowestFret;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !shapeVariantLocationData_ghost) return;

    const timer = setTimeout(() => {
      if (theLowestFret === 0) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const targetCell = container.querySelector(`[data-fret="${theLowestFret}"]`) as HTMLElement;

      if (targetCell) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = targetCell.getBoundingClientRect();

        const targetScrollLeft = container.scrollLeft + (elementRect.left - containerRect.left) - 60;

        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [containerRef, shapeVariantLocationData_ghost, theLowestFret]);
};
