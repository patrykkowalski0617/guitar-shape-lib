import { useControlsStore, useMusicStore, usePlayerStore } from "@/store";
import { useEffect, type RefObject } from "react";
import { getShapeFretRange } from "../helpers/getShapeFretRange";
import { useShapeCoordinates } from "../FretboardCell/hooks";
import { isGlobalRole as isGlobalRoleFn } from "@/utils";
import { UNIFIED_MUSIC_KEYS } from "@/data";

export const useFretboardScroll = (
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const roleId = useControlsStore((state) => state.roleId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const isGlobalRole = isGlobalRoleFn(roleId);
  const tuneKeyOffsetFromC = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;
  const baseFretIndexOfRoleAndModeNote = 10;

  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const shapeVariantLocationData_locked = useMusicStore(
    (state) => state.shapeVariantLocationData_locked,
  );
  const shapeVariantLocationData_regular = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );

  const shapeVariantLocationData = isPlaying
    ? shapeVariantLocationData_locked
    : shapeVariantLocationData_regular;

  const notes = useShapeCoordinates(shapeVariantLocationData);
  const { min, max } = getShapeFretRange(notes);

  const theLowestFret = min === -1 ? 0 : min;
  const theHighestFret = max === -1 ? 0 : max;

  const targetGlobalFret = baseFretIndexOfRoleAndModeNote + tuneKeyOffsetFromC;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      if (isGlobalRole) {
        const targetCell = container.querySelector(
          `[data-fret="${targetGlobalFret}"]`,
        ) as HTMLElement;

        if (targetCell) {
          const containerRect = container.getBoundingClientRect();
          const targetRect = targetCell.getBoundingClientRect();
          const centerOffset = (containerRect.width - targetRect.width) / 2;

          const targetScrollLeft =
            container.scrollLeft +
            (targetRect.left - containerRect.left) -
            centerOffset;

          container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
        }
        return;
      }

      if (!shapeVariantLocationData || theLowestFret === 0) return;

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
        const scrollMargin = 100;

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
  }, [
    containerRef,
    shapeVariantLocationData,
    theLowestFret,
    theHighestFret,
    isGlobalRole,
    targetGlobalFret,
  ]);
};
