import * as React from "react";
import { type MultiStepSliderProps } from "../constants";
import { getFullRange, getPotentialRange } from "../utils";
import { useMultiStepSlider } from "./useMultiStepSlider";

export function useMultiStepSliderLogic(props: MultiStepSliderProps) {
  const {
    value,
    onValueChange,
    max,
    min = 0,
    orientation,
    disabled,
    onBeforeValueChange,
  } = props;

  const isVertical = orientation === "vertical";
  const [isDragging, setIsDragging] = React.useState(false);
  const [previewValue, setPreviewValue] = React.useState<number[] | null>(null);

  const lastEmittedValueRef = React.useRef<string>(JSON.stringify(value));

  const fullRangeValue = React.useMemo(() => getFullRange(value), [value]);

  const internalHandlers = useMultiStepSlider({
    value: fullRangeValue,
    onValueChange: (next) => {
      const nextMin = Math.min(...next);
      const nextMax = Math.max(...next);
      const nextRange: [number, number] = [nextMin, nextMax];

      const nextRangeStr = JSON.stringify(nextRange);

      if (nextRangeStr !== lastEmittedValueRef.current) {
        lastEmittedValueRef.current = nextRangeStr;
        onValueChange(nextRange);
      }
    },
    max,
    min,
    isVertical,
  });

  React.useEffect(() => {
    lastEmittedValueRef.current = JSON.stringify(value);
  }, [value]);

  const handleThumbPointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    setIsDragging(true);
    setPreviewValue(null);
    internalHandlers.startDrag(!!disabled)(e);
    const stop = () => {
      setIsDragging(false);
      window.removeEventListener("pointerup", stop);
    };
    window.addEventListener("pointerup", stop);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (disabled || isDragging || e.pointerType === "touch") return;

    const target = e.target as HTMLElement;
    const cutButton = target.closest(
      '[data-cut-button="true"]',
    ) as HTMLElement | null;

    if (cutButton) {
      const type = cutButton.getAttribute("data-cut-type");
      const val = Number(cutButton.getAttribute("data-value"));
      const next =
        type === "start"
          ? internalHandlers.sortedValues.filter((v) => v >= val)
          : internalHandlers.sortedValues.filter((v) => v <= val);

      const shouldUpdate = onBeforeValueChange
        ? onBeforeValueChange([Math.min(...next), Math.max(...next)])
        : true;
      setPreviewValue(shouldUpdate ? next : null);
      return;
    }

    const hoverVal = internalHandlers.calculateValueFromPos(
      e.clientX,
      e.clientY,
    );
    const isOutside =
      hoverVal < internalHandlers.firstVal ||
      hoverVal > internalHandlers.lastVal;

    if (isOutside) {
      const nextRange = getPotentialRange(
        hoverVal,
        hoverVal < internalHandlers.firstVal
          ? internalHandlers.lastVal
          : internalHandlers.firstVal,
      );
      const fullNext = getFullRange(nextRange);
      const shouldUpdate = onBeforeValueChange
        ? onBeforeValueChange(nextRange)
        : true;
      setPreviewValue(shouldUpdate ? fullNext : null);
    } else {
      setPreviewValue(null);
    }
  };

  return {
    ...internalHandlers,
    isVertical,
    isDragging,
    previewValue,
    setPreviewValue,
    handleThumbPointerDown,
    handlePointerMove,
  };
}
