import {
  useState,
  useRef,
  useEffect,
  type MouseEvent,
  type TouchEvent,
} from "react";

export interface Range {
  start: number;
  end: number;
}

export type DragType = "move" | "left" | "right";

interface DragState {
  type: DragType;
  startIdx: number;
  initialRange: Range;
}

export const useMultiRangeSlider = (
  totalSegments: number,
  range: Range,
  onChange: (range: Range) => void,
) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const getIndex = (clientX: number) => {
    const trackElement = trackRef.current;
    if (!trackElement) return 0;

    const rect = trackElement.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const clampedPosition = Math.max(0, Math.min(position, 0.999));
    return Math.floor(clampedPosition * totalSegments);
  };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent | any) => {
      if (!dragState) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const currentIndex = getIndex(clientX);
      const indexDiff = currentIndex - dragState.startIdx;

      if (dragState.type === "move") {
        const nextStart = dragState.initialRange.start + indexDiff;
        const nextEnd = dragState.initialRange.end + indexDiff;
        const isWithinBounds = nextStart >= 0 && nextEnd < totalSegments;

        if (isWithinBounds) {
          onChange({ start: nextStart, end: nextEnd });
        }
      } else if (dragState.type === "left") {
        onChange({ ...range, start: Math.min(currentIndex, range.end) });
      } else if (dragState.type === "right") {
        onChange({ ...range, end: Math.max(currentIndex, range.start) });
      }
    };

    const handleGlobalUp = () => setDragState(null);

    if (dragState) {
      window.addEventListener("mousemove", handleGlobalMove);
      window.addEventListener("mouseup", handleGlobalUp);
      window.addEventListener("touchmove", handleGlobalMove);
      window.addEventListener("touchend", handleGlobalUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchmove", handleGlobalMove);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [dragState, range, totalSegments, onChange]);

  const startDragging = (type: DragType, e: MouseEvent | TouchEvent | any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragState({
      type,
      startIdx: getIndex(clientX),
      initialRange: { ...range },
    });
  };

  return { trackRef, startDragging };
};
