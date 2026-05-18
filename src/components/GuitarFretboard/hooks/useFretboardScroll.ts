import { useMusicStore, useMetronomeStore } from "@/store";
import { useEffect, type RefObject } from "react";
import { getShapeFretRange } from "../helpers/getShapeFretRange";
import { useShapeCoordinates } from "./useShapeCoordinates";

export const useFretboardScroll = (
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const shapeVariantDataKeys_locked = useMusicStore(
    (state) => state.shapeVariantDataKeys_locked,
  );
  const shapeVariantDataKeys_regular = useMusicStore(
    (state) => state.shapeVariantDataKeys,
  );

  const shapeVariantDataKeys = isPlaying
    ? shapeVariantDataKeys_locked
    : shapeVariantDataKeys_regular;

  const getShapeCoordinates = useShapeCoordinates();
  const { min, max } = getShapeFretRange(
    getShapeCoordinates(shapeVariantDataKeys),
  );

  const theLowestFret = min === -1 ? 0 : min;
  const theHighestFret = max === -1 ? 0 : max;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !shapeVariantDataKeys) return;

    const timer = setTimeout(() => {
      if (theLowestFret === 0) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const lowestCell = container.querySelector(
        `[data-fret="${theLowestFret}"]`,
      ) as HTMLElement;
      const highestCell = container.querySelector(
        `[data-fret="${theHighestFret}"]`,
      ) as HTMLElement;

      if (lowestCell && highestCell) {
        const containerRect = container.getBoundingClientRect();
        const lowestRect = lowestCell.getBoundingClientRect();
        const highestRect = highestCell.getBoundingClientRect();

        const isLowestVisible = lowestRect.left >= containerRect.left;
        const isHighestVisible = highestRect.right <= containerRect.right;

        if (isLowestVisible && isHighestVisible) return;

        let targetScrollLeft = container.scrollLeft;
        const scrollMargin = 60;

        if (!isLowestVisible) {
          targetScrollLeft =
            container.scrollLeft +
            (lowestRect.left - containerRect.left) -
            scrollMargin;
        } else if (!isHighestVisible) {
          targetScrollLeft =
            container.scrollLeft +
            (highestRect.right - containerRect.right) +
            scrollMargin;
        }

        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [containerRef, shapeVariantDataKeys, theLowestFret, theHighestFret]);
};
