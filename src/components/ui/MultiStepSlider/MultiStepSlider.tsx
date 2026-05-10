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

  const handleTrackMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    const clickedVal = calculateValueFromPos(e.clientX, e.clientY);
    const currentMin = firstVal;
    const currentMax = lastVal;

    if (clickedVal < currentMin || clickedVal > currentMax) {
      const nextValue = [...value];
      if (clickedVal < currentMin) {
        for (let i = clickedVal; i < currentMin; i++)
          if (!nextValue.includes(i)) nextValue.push(i);
      } else {
        for (let i = currentMax + 1; i <= clickedVal; i++)
          if (!nextValue.includes(i)) nextValue.push(i);
      }
      onValueChange(nextValue.sort((a, b) => a - b));
    }
  };

  const startDrag = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
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
      if (
        Math.min(...shiftedValues) >= min &&
        Math.max(...shiftedValues) <= max
      ) {
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

  const startPosPercent = ((firstVal - min) / range) * 100;
  const totalWidthPercent = ((lastVal - firstVal) / range) * 100;

  const thumbStyle: React.CSSProperties = isVertical
    ? {
        bottom: `calc(${startPosPercent}% - ${thumbSize / 2}px)`,
        height: `calc(${totalWidthPercent}% + ${thumbSize}px)`,
        width: thumbSize,
        left: "50%",
        transform: "translateX(-50%)",
      }
    : {
        left: `calc(${startPosPercent}% - ${thumbSize / 2}px)`,
        width: `calc(${totalWidthPercent}% + ${thumbSize}px)`,
        height: thumbSize,
        top: "50%",
        transform: "translateY(-50%)",
      };

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
          return (
            <S.Tick
              key={`tick-${stepNumber}`}
              onAnimationEnd={isTickVisible ? onHighlightEnd : undefined}
              style={{
                bottom: isVertical ? `${tickPos}%` : "50%",
                left: isVertical ? "50%" : `${tickPos}%`,
                transform: isVertical
                  ? "translate(-50%, 50%)"
                  : "translate(-50%, -50%)",
                top: isVertical ? "" : "50%",
                opacity: highlightedId !== null ? (isTickVisible ? 1 : 0) : 1,
              }}
            />
          );
        })}

        <S.SliderThumb
          style={thumbStyle}
          onMouseDown={startDrag}
          $isVertical={isVertical}
        >
          <S.ThumbVisual />
          <S.InteractionContainer $isVertical={isVertical}>
            {sortedValues.map((val) => (
              <S.InteractionZone
                key={val}
                $isVertical={isVertical}
                $thumbSize={thumbSize}
              >
                {!disabled && (
                  <S.ControlsWrapper
                    $isVertical={isVertical}
                    $thumbSize={thumbSize}
                  >
                    <S.CutButton
                      disabled={val === firstVal || sortedValues.length === 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        onValueChange(
                          value.filter((v) => v >= val).sort((a, b) => a - b),
                        );
                      }}
                    >
                      {isVertical ? "▼" : "◀"}
                    </S.CutButton>
                    <S.CutButton
                      disabled={val === lastVal || sortedValues.length === 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        onValueChange(
                          value.filter((v) => v <= val).sort((a, b) => a - b),
                        );
                      }}
                    >
                      {isVertical ? "▲" : "▶"}
                    </S.CutButton>
                  </S.ControlsWrapper>
                )}
              </S.InteractionZone>
            ))}
          </S.InteractionContainer>
        </S.SliderThumb>
      </S.SliderTrack>
    </S.SliderRoot>
  );
}
