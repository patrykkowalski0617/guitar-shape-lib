import { useState, useEffect, RefObject, useRef } from "react";

export interface SliderRange {
  start: number;
  end: number;
}

export type DragType = "move" | "left" | "right";

interface DragState {
  type: DragType;
  startIdx: number;
  initialRange: SliderRange;
}

export const useSliderLogic = (
  ref: RefObject<HTMLDivElement | null>,
  values: unknown[],
  range: SliderRange,
  onChange: (range: SliderRange) => void,
) => {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const totalSegments = values.length;

  const rangeRef = useRef(range);
  useEffect(() => {
    rangeRef.current = range;
  }, [range]);

  const getIndex = (clientX: number): number => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    return Math.max(
      0,
      Math.min(Math.floor(position * totalSegments), totalSegments - 1),
    );
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragState) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const currentIndex = getIndex(clientX);
      const diff = currentIndex - dragState.startIdx;

      if (dragState.type === "move") {
        const newStart = dragState.initialRange.start + diff;
        const newEnd = dragState.initialRange.end + diff;
        if (newStart >= 0 && newEnd < totalSegments) {
          onChange({ start: newStart, end: newEnd });
        }
      } else if (dragState.type === "left") {
        onChange({
          ...rangeRef.current,
          start: Math.min(currentIndex, rangeRef.current.end),
        });
      } else if (dragState.type === "right") {
        onChange({
          ...rangeRef.current,
          end: Math.max(currentIndex, rangeRef.current.start),
        });
      }
    };

    const handleUp = () => setDragState(null);

    if (dragState) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [dragState, totalSegments, onChange]);

  const startDragging = (
    type: DragType,
    e: React.MouseEvent | React.TouchEvent,
  ) => {
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragState({
      type,
      startIdx: getIndex(clientX),
      initialRange: { ...rangeRef.current },
    });
  };

  return { startDragging };
};
