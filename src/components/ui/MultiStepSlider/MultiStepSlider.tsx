import * as React from "react";
import * as S from "./parts";

interface MultiStepSliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  max: number;
  min?: number;
  thumbSize?: number;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  children?: React.ReactNode;
}

export function MultiStepSlider({
  value,
  onValueChange,
  max,
  min = 0,
  thumbSize = 28,
  orientation = "horizontal",
  disabled = false,
  children,
}: MultiStepSliderProps) {
  const isVertical = orientation === "vertical";

  const handleValueChange = (newValues: number[]) => {
    if (disabled) return;

    const changedIndex = newValues.findIndex((val, i) => val !== value[i]);
    if (changedIndex === -1) return;

    const diff = newValues[changedIndex] - value[changedIndex];
    const shiftedValues = value.map((v) => v + diff);

    const minGroup = Math.min(...shiftedValues);
    const maxGroup = Math.max(...shiftedValues);

    let finalValues = shiftedValues;
    if (minGroup < min) {
      const correction = min - minGroup;
      finalValues = shiftedValues.map((v) => v + correction);
    } else if (maxGroup > max) {
      const correction = maxGroup - max;
      finalValues = shiftedValues.map((v) => v - correction);
    }

    onValueChange(finalValues);
  };

  const handleCapturePointerDown = (event: React.PointerEvent) => {
    if (disabled) return;
    const target = event.target as HTMLElement;

    if (target.closest("button") || target.closest('[role="slider"]')) return;

    const track = event.currentTarget.getBoundingClientRect();
    const clickPos = isVertical ? event.clientY : event.clientX;
    const trackStart = isVertical ? track.bottom : track.left;
    const trackSize = isVertical ? track.height : track.width;

    const percentage = Math.abs((clickPos - trackStart) / trackSize);
    const clickedTick = Math.round(percentage * max);

    const currentMin = Math.min(...value);
    const currentMax = Math.max(...value);

    if (clickedTick < currentMin || clickedTick > currentMax) {
      event.preventDefault();
      event.stopPropagation();

      const nextValue = [...value];
      if (clickedTick < currentMin) {
        for (let i = clickedTick; i < currentMin; i++) {
          if (!nextValue.includes(i)) nextValue.push(i);
        }
      } else {
        for (let i = currentMax + 1; i <= clickedTick; i++) {
          if (!nextValue.includes(i)) nextValue.push(i);
        }
      }
      onValueChange(nextValue.sort((a, b) => a - b));
    }
  };

  const removeValuesAbove = (clickedVal: number) => {
    const nextValue = value.filter((v) => v <= clickedVal);
    onValueChange(nextValue.sort((a, b) => a - b));
  };

  const removeValuesBelow = (clickedVal: number) => {
    const nextValue = value.filter((v) => v >= clickedVal);
    onValueChange(nextValue.sort((a, b) => a - b));
  };

  return (
    <S.SliderRoot
      orientation={orientation}
      $isVertical={isVertical}
      value={value}
      onValueChange={handleValueChange}
      max={max}
      min={min}
      step={1}
      disabled={disabled}
      onPointerDownCapture={handleCapturePointerDown}
    >
      <S.SliderTrack $isVertical={isVertical} $thumbSize={thumbSize}>
        {children}
      </S.SliderTrack>
      {value.map((val, index) => (
        <S.SliderThumb
          key={`thumb-${index}`}
          $thumbSize={thumbSize}
          disabled={disabled}
        >
          {!disabled && (
            <S.ControlsWrapper $isVertical={isVertical} $thumbSize={thumbSize}>
              <S.CutButton
                onClick={(e) => {
                  e.stopPropagation();
                  removeValuesBelow(val);
                }}
                title="Odtnij wszystko poniżej"
              >
                {isVertical ? "▼" : "◀"}
              </S.CutButton>
              <S.CutButton
                onClick={(e) => {
                  e.stopPropagation();
                  removeValuesAbove(val);
                }}
                title="Odtnij wszystko powyżej"
              >
                {isVertical ? "▲" : "▶"}
              </S.CutButton>
            </S.ControlsWrapper>
          )}
        </S.SliderThumb>
      ))}
    </S.SliderRoot>
  );
}
