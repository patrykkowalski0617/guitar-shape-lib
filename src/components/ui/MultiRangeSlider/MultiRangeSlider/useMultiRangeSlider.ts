import { useState, useRef, useEffect, useCallback } from "react";

export interface Range {
  start: number;
  end: number;
}

export type DragType = "move" | "start" | "end";

interface DragState {
  type: DragType;
  startIdx: number;
  initialRange: Range;
}

export const useMultiRangeSlider = (
  totalSegments: number,
  range: Range,
  onChange: (range: Range) => void,
  orientation: "horizontal" | "vertical" = "horizontal",
) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const getFractionalIndex = useCallback(
    (clientX: number, clientY: number) => {
      const trackElement = trackRef.current;
      if (!trackElement) return 0;

      const rect = trackElement.getBoundingClientRect();
      const position =
        orientation === "vertical"
          ? (clientY - rect.top) / rect.height
          : (clientX - rect.left) / rect.width;

      return position * totalSegments;
    },
    [totalSegments, orientation],
  );

  useEffect(() => {
    if (!dragState) return;

    const handleGlobalMove = (e: MouseEvent | TouchEvent | any) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const currentFractionalIndex = getFractionalIndex(clientX, clientY);

      const { type, startIdx, initialRange } = dragState;

      const indexDiff = Math.round(currentFractionalIndex - startIdx);
      const lastIndex = totalSegments - 1;

      let nextRange = { ...initialRange };

      if (type === "move") {
        const rangeWidth = initialRange.end - initialRange.start;
        const nextStart = initialRange.start + indexDiff;
        const maxStart = lastIndex - rangeWidth;

        const clampedStart = Math.max(0, Math.min(nextStart, maxStart));
        nextRange = {
          start: clampedStart,
          end: clampedStart + rangeWidth,
        };
      } else if (type === "start") {
        const nextStart = initialRange.start + indexDiff;
        nextRange.start = Math.max(0, Math.min(nextStart, initialRange.end));
      } else if (type === "end") {
        const nextEnd = initialRange.end + indexDiff;
        nextRange.end = Math.max(
          initialRange.start,
          Math.min(nextEnd, lastIndex),
        );
      }

      if (nextRange.start !== range.start || nextRange.end !== range.end) {
        onChangeRef.current(nextRange);
      }
    };

    const handleGlobalUp = () => setDragState(null);

    window.addEventListener("mousemove", handleGlobalMove);
    window.addEventListener("mouseup", handleGlobalUp);
    window.addEventListener("touchmove", handleGlobalMove, { passive: false });
    window.addEventListener("touchend", handleGlobalUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchmove", handleGlobalMove);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [dragState, totalSegments, getFractionalIndex, range.start, range.end]);

  const startDragging = (type: DragType, e: any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const currentFractionalIndex = getFractionalIndex(clientX, clientY);

    setDragState({
      type,
      startIdx: currentFractionalIndex,
      initialRange: { ...range },
    });
  };

  return { trackRef, startDragging };
};
