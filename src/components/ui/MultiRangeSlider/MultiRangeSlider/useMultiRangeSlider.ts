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
  draggedElement: HTMLElement | null;
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

    const { draggedElement } = dragState;

    document.body.classList.add("range-dragging");

    if (draggedElement) {
      draggedElement.classList.add("is-dragging");
    }

    document.body.style.cursor =
      dragState.type === "move"
        ? "grabbing"
        : orientation === "vertical"
          ? "ns-resize"
          : "ew-resize";

    const handleGlobalUp = () => {
      if (draggedElement) {
        draggedElement.classList.remove("is-dragging");
      }

      document.body.classList.remove("range-dragging");
      document.body.style.cursor = "";
      setDragState(null);
    };

    const isTouchEvent = (e: MouseEvent | TouchEvent): e is TouchEvent =>
      "touches" in e;

    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (e.cancelable) e.preventDefault();

      const clientX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
      const clientY = isTouchEvent(e) ? e.touches[0].clientY : e.clientY;

      const currentFractionalIndex = getFractionalIndex(clientX, clientY);

      const { type, startIdx, initialRange } = dragState;

      const indexDiff = Math.round(currentFractionalIndex - startIdx);
      const lastIndex = totalSegments - 1;
      let nextRange = { ...initialRange };

      if (type === "move") {
        const rangeWidth = initialRange.end - initialRange.start;
        const nextStart = initialRange.start + indexDiff;
        const clampedStart = Math.max(
          0,
          Math.min(nextStart, lastIndex - rangeWidth),
        );
        nextRange = { start: clampedStart, end: clampedStart + rangeWidth };
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

    window.addEventListener("mousemove", handleGlobalMove);
    window.addEventListener("mouseup", handleGlobalUp);
    window.addEventListener("touchmove", handleGlobalMove, { passive: false });
    window.addEventListener("touchend", handleGlobalUp);

    return () => {
      if (draggedElement) draggedElement.classList.remove("is-dragging");
      document.body.classList.remove("range-dragging");
      document.body.style.cursor = "";

      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchmove", handleGlobalMove);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [dragState, totalSegments, getFractionalIndex, range, orientation]);

  const startDragging = (type: DragType, e: any) => {
    if (e.cancelable) e.preventDefault();

    const target = e.currentTarget as HTMLElement;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const currentFractionalIndex = getFractionalIndex(clientX, clientY);

    setDragState({
      type,
      startIdx: currentFractionalIndex,
      initialRange: { ...range },
      draggedElement: target,
    });
  };

  return {
    trackRef,
    startDragging,
  };
};
