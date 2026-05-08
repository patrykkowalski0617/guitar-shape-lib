import { useCallback, useRef, useEffect } from "react";

interface UseKnobProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
}

export const useKnob = ({ value, min, max, step, onChange }: UseKnobProps) => {
  const isDragging = useRef(false);
  const lastY = useRef(0);

  const valueRef = useRef(value);
  const mouseMoveRef = useRef<(e: MouseEvent) => void>(() => {});
  const mouseUpRef = useRef<() => void>(() => {});

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaY = lastY.current - e.clientY;
      lastY.current = e.clientY;

      const range = max - min;
      const sensitivity = 0.05;
      const change = deltaY * range * sensitivity;

      const nextValue = Math.min(max, Math.max(min, valueRef.current + change));
      const steppedValue = Math.round(nextValue / step) * step;

      if (steppedValue !== valueRef.current) {
        onChange(steppedValue);
      }
    },
    [min, max, step, onChange],
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.removeEventListener("mousemove", mouseMoveRef.current);
    document.removeEventListener("mouseup", mouseUpRef.current);
    document.documentElement.style.cursor = "";
  }, []);

  useEffect(() => {
    valueRef.current = value;
    mouseMoveRef.current = handleMouseMove;
    mouseUpRef.current = handleMouseUp;
  }, [value, handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastY.current = e.clientY;

    document.addEventListener("mousemove", mouseMoveRef.current);
    document.addEventListener("mouseup", mouseUpRef.current);
    document.documentElement.style.cursor = "ns-resize";
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", mouseMoveRef.current);
      document.removeEventListener("mouseup", mouseUpRef.current);
      document.documentElement.style.cursor = "";
    };
  }, []);

  const rotation = ((value - min) / (max - min)) * 270 - 135;
  const percentage = Math.round(((value - min) / (max - min)) * 100);

  return {
    rotation,
    percentage,
    handleMouseDown,
  };
};
