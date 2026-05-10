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
  options?: { id: string | number }[];
  effectiveMax?: number;
  highlightedId?: string | number | null;
  onHighlightEnd?: () => void;
}

export function MultiStepSlider({
  value,
  onValueChange,
  max,
  min = 0,
  thumbSize = 28,
  orientation = "horizontal",
  disabled = false,
  options,
  effectiveMax,
  highlightedId = null,
  onHighlightEnd,
}: MultiStepSliderProps) {
  const isVertical = orientation === "vertical";
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [isOpacityAnimationLocked, setIsOpacityLocked] = React.useState(false);
  const opacityAnimationDuration = 500;

  React.useEffect(() => {
    if (disabled) return;
    const timer = setTimeout(
      () => setIsOpacityLocked(true),
      opacityAnimationDuration,
    );
    return () => clearTimeout(timer);
  }, [disabled]);

  const calculateValueFromPos = (clientX: number, clientY: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const trackSize = isVertical ? rect.height : rect.width;
    const pos = isVertical ? rect.bottom - clientY : clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, pos / trackSize));
    return Math.round(percentage * (max - min) + min);
  };

  const handleTrackMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    const clickedVal = calculateValueFromPos(e.clientX, e.clientY);
    const currentMin = Math.min(...value);
    const currentMax = Math.max(...value);

    if (clickedVal < currentMin || clickedVal > currentMax) {
      const nextValue = [...value];
      if (clickedVal < currentMin) {
        for (let i = clickedVal; i < currentMin; i++) {
          if (!nextValue.includes(i)) nextValue.push(i);
        }
      } else {
        for (let i = currentMax + 1; i <= clickedVal; i++) {
          if (!nextValue.includes(i)) nextValue.push(i);
        }
      }
      onValueChange(nextValue.sort((a, b) => a - b));
    }
  };

  const startDrag = (e: React.MouseEvent, index: number) => {
    if (disabled) return;
    e.stopPropagation();

    const initialValue = value[index];
    const initialMousePos = isVertical ? e.clientY : e.clientX;

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

      const shift = initialValue + diffVal - value[index];
      if (shift === 0) return;

      const shiftedValues = value.map((v) => v + shift);
      const minGroup = Math.min(...shiftedValues);
      const maxGroup = Math.max(...shiftedValues);

      if (minGroup >= min && maxGroup <= max) {
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

  const removeValuesAbove = (clickedVal: number) => {
    onValueChange(value.filter((v) => v <= clickedVal).sort((a, b) => a - b));
  };

  const removeValuesBelow = (clickedVal: number) => {
    onValueChange(value.filter((v) => v >= clickedVal).sort((a, b) => a - b));
  };

  const sortedValues = [...value].sort((a, b) => a - b);
  const firstVal = sortedValues[0];
  const lastVal = sortedValues[sortedValues.length - 1];
  const range = max - min;

  const tickIndexes = Array.from(
    { length: (effectiveMax ?? max) + 1 },
    (_, i) => i,
  );

  return (
    <S.SliderRoot $isVertical={isVertical} onMouseDown={handleTrackMouseDown}>
      <S.SliderTrack
        ref={trackRef}
        $isVertical={isVertical}
        $thumbSize={thumbSize}
      >
        {tickIndexes.map((stepNumber) => {
          const currentOption = options?.[stepNumber - 1];
          const isTickVisible =
            highlightedId !== null && currentOption?.id === highlightedId;
          const tickPos = (stepNumber / (effectiveMax ?? max)) * 100;

          const tickStyle: React.CSSProperties = isVertical
            ? {
                bottom: `${tickPos}%`,
                left: "50%",
                transform: "translate(-50%, 50%)",
              }
            : {
                left: `${tickPos}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
              };

          return (
            <S.Tick
              key={stepNumber}
              $isOpacityAnimationLocked={isOpacityAnimationLocked}
              $opacityAnimationDuration={opacityAnimationDuration}
              onAnimationEnd={isTickVisible ? onHighlightEnd : undefined}
              style={tickStyle}
            />
          );
        })}

        {value.map((val, index) => {
          const isFirst = val === firstVal;
          const positionPercent = ((val - min) / range) * 100;
          const widthPercent = ((lastVal - firstVal) / range) * 100;

          const style: React.CSSProperties = isVertical
            ? {
                height: isFirst
                  ? `calc(${widthPercent}% + ${thumbSize}px)`
                  : `${thumbSize}px`,
                bottom: `calc(${positionPercent}% - ${thumbSize / 2}px)`,
                left: "50%",
                zIndex: 10 + index,
              }
            : {
                width: isFirst
                  ? `calc(${widthPercent}% + ${thumbSize}px)`
                  : `${thumbSize}px`,
                left: `calc(${positionPercent}% - ${thumbSize / 2}px)`,
                top: "50%",
                zIndex: 10 + index,
              };

          return (
            <S.SliderThumb
              key={`thumb-${index}`}
              style={style}
              $thumbSize={thumbSize}
              $isVertical={isVertical}
              $isFirst={isFirst}
              onMouseDown={(e) => startDrag(e, index)}
            >
              <S.ThumbVisual $thumbSize={thumbSize} $isVisible={isFirst} />
              {!disabled && (
                <S.ControlsWrapper
                  $isVertical={isVertical}
                  $thumbSize={thumbSize}
                >
                  <S.CutButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeValuesBelow(val);
                    }}
                  >
                    {isVertical ? "▼" : "◀"}
                  </S.CutButton>
                  <S.CutButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeValuesAbove(val);
                    }}
                  >
                    {isVertical ? "▲" : "▶"}
                  </S.CutButton>
                </S.ControlsWrapper>
              )}
            </S.SliderThumb>
          );
        })}
      </S.SliderTrack>
    </S.SliderRoot>
  );
}
