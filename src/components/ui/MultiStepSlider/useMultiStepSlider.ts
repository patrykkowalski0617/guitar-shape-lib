import * as React from "react";

interface UseMultiStepSliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  max: number;
  min: number;
  isVertical: boolean;
}

export function useMultiStepSlider({
  value,
  onValueChange,
  max,
  min,
  isVertical,
}: UseMultiStepSliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const sortedValues = React.useMemo(
    () => [...value].sort((a, b) => a - b),
    [value],
  );

  const firstVal = sortedValues[0];
  const lastVal = sortedValues[sortedValues.length - 1];
  const range = max - min;

  const calculateValueFromPos = (clientX: number, clientY: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const trackSize = isVertical ? rect.height : rect.width;
    const pos = isVertical ? rect.bottom - clientY : clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, pos / trackSize));
    return Math.round(percentage * (max - min) + min);
  };

  const getCutStartValues = (val: number) =>
    value.filter((v) => v >= val).sort((a, b) => a - b);
  const getCutEndValues = (val: number) =>
    value.filter((v) => v <= val).sort((a, b) => a - b);

  const handleTrackMouseDown = (disabled: boolean) => (e: React.MouseEvent) => {
    if (disabled) return;
    const clickedVal = calculateValueFromPos(e.clientX, e.clientY);
    const isBelowRange = clickedVal < firstVal;
    const isAboveRange = clickedVal > lastVal;

    if (isBelowRange || isAboveRange) {
      const nextValue = [...value];
      if (isBelowRange) {
        for (let i = clickedVal; i < firstVal; i++) {
          if (!nextValue.includes(i)) nextValue.push(i);
        }
      } else {
        for (let i = lastVal + 1; i <= clickedVal; i++) {
          if (!nextValue.includes(i)) nextValue.push(i);
        }
      }
      onValueChange(nextValue.sort((a, b) => a - b));
    }
  };

  const startDrag = (disabled: boolean) => (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    setIsDragging(true);
    const initialMousePos = isVertical ? e.clientY : e.clientX;
    const initialValues = [...value];

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!trackRef.current) return;
      const currentMousePos = isVertical
        ? moveEvent.clientY
        : moveEvent.clientX;
      const rect = trackRef.current.getBoundingClientRect();
      const trackSize = isVertical ? rect.height : rect.width;
      const diffPx = isVertical
        ? initialMousePos - currentMousePos
        : currentMousePos - initialMousePos;
      const diffVal = Math.round((diffPx / trackSize) * (max - min));

      if (diffVal === 0) return;

      const shiftedValues = initialValues.map((v) => v + diffVal);
      const isWithinBounds =
        Math.min(...shiftedValues) >= min && Math.max(...shiftedValues) <= max;

      if (isWithinBounds) {
        onValueChange(shiftedValues);
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return {
    trackRef,
    sortedValues,
    firstVal,
    lastVal,
    range,
    isDragging,
    handleTrackMouseDown,
    startDrag,
    getCutStartValues,
    getCutEndValues,
    calculateValueFromPos,
  };
}
