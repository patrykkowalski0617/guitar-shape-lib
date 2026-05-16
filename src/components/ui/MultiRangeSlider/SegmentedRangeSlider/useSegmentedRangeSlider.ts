import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type TouchEvent as ReactTouchEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

export interface SliderRange {
  start: number;
  end: number;
}

export interface DragState {
  type: "move" | "left" | "right";
  startIdx: number;
  initialRange: SliderRange;
}

interface UseSliderParams {
  values: (string | number)[];
  range: SliderRange;
  onChange: (range: SliderRange) => void;
}

export const useSegmentedRangeSlider = ({
  values,
  range,
  onChange,
}: UseSliderParams) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const totalSegments = values.length;

  const getIndex = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const position = (clientX - rect.left) / rect.width;
      return Math.max(
        0,
        Math.min(Math.floor(position * totalSegments), totalSegments - 1),
      );
    },
    [totalSegments],
  );

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (!dragState) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

      const currentIndex = getIndex(clientX);
      const diff = currentIndex - dragState.startIdx;

      if (dragState.type === "move") {
        const newStart = dragState.initialRange.start + diff;
        const newEnd = dragState.initialRange.end + diff;
        const isWithinBoundaries = newStart >= 0 && newEnd < totalSegments;
        if (isWithinBoundaries) {
          onChange({ start: newStart, end: newEnd });
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
      window.addEventListener("touchmove", handleGlobalMove, {
        passive: true,
      });
      window.addEventListener("touchend", handleGlobalUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchmove", handleGlobalMove);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [dragState, range, totalSegments, getIndex, onChange]);

  const onStart = (
    type: "move" | "left" | "right",
    e: ReactMouseEvent | ReactTouchEvent,
  ) => {
    e.preventDefault();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as ReactMouseEvent).clientX;
    setDragState({
      type,
      startIdx: getIndex(clientX),
      initialRange: { ...range },
    });
  };

  const segmentWidth = 100 / totalSegments;

  return {
    trackRef,
    onStart,
    segmentWidth,
  };
};
