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
  const valueRef = React.useRef(value);

  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const sortedValues = React.useMemo(
    () => [...value].sort((a, b) => a - b),
    [value],
  );

  const firstVal = sortedValues[0];
  const lastVal = sortedValues[sortedValues.length - 1];
  const range = max - min;

  const calculateValueFromPos = (clientX: number, clientY: number) => {
    const track = trackRef.current;
    if (!track) return 0;

    const rect = track.getBoundingClientRect();
    const trackSize = isVertical ? rect.height : rect.width;
    const pos = isVertical ? rect.bottom - clientY : clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, pos / trackSize));
    return Math.round(percentage * range + min);
  };

  const handleTrackMouseDown = (disabled: boolean) => (e: React.MouseEvent) => {
    if (disabled) return;
    if (e.button !== 0) return;

    const clickedVal = calculateValueFromPos(e.clientX, e.clientY);
    const isOutsideRange = clickedVal < firstVal || clickedVal > lastVal;

    if (isOutsideRange) {
      const nextValue = [...valueRef.current];
      if (clickedVal < firstVal) {
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
    if (disabled || e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();

    const startValue = calculateValueFromPos(e.clientX, e.clientY);
    const initialValues = [...valueRef.current];

    const onMouseMove = (moveEvent: MouseEvent) => {
      const currentValue = calculateValueFromPos(
        moveEvent.clientX,
        moveEvent.clientY,
      );
      const diff = currentValue - startValue;

      if (diff === 0) return;

      const shiftedValues = initialValues.map((v) => v + diff);
      const newMin = Math.min(...shiftedValues);
      const newMax = Math.max(...shiftedValues);

      if (newMin >= min && newMax <= max) {
        onValueChange(shiftedValues);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleCutStart = (val: number) => {
    const nextValue = valueRef.current
      .filter((v) => v >= val)
      .sort((a, b) => a - b);
    onValueChange(nextValue);
  };

  const handleCutEnd = (val: number) => {
    const nextValue = valueRef.current
      .filter((v) => v <= val)
      .sort((a, b) => a - b);
    onValueChange(nextValue);
  };

  return {
    trackRef,
    sortedValues,
    firstVal,
    lastVal,
    range,
    handleTrackMouseDown,
    startDrag,
    handleCutStart,
    handleCutEnd,
  };
}
