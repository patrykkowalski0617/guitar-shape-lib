import * as React from "react";
import * as S from "./parts";
import { useMultiStepSlider } from "./hooks/useMultiStepSlider";

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
  thumbSize = 32,
  orientation = "horizontal",
  disabled = false,
  effectiveMax,
}: MultiStepSliderProps) {
  const isVertical = orientation === "vertical";
  const [isDragging, setIsDragging] = React.useState(false);
  const [previewValue, setPreviewValue] = React.useState<number[] | null>(null);

  const {
    trackRef,
    sortedValues,
    firstVal,
    lastVal,
    range,
    handleTrackPointerDown,
    startDrag,
    handleCutStart,
    handleCutEnd,
    calculateValueFromPos,
  } = useMultiStepSlider({ value, onValueChange, max, min, isVertical });

  const limitValue = effectiveMax ?? max;
  const startPosPercent = ((firstVal - min) / range) * 100;
  const totalWidthPercent = ((lastVal - firstVal) / range) * 100;

  const previewFirstVal = previewValue ? Math.min(...previewValue) : null;
  const previewLastVal = previewValue ? Math.max(...previewValue) : null;

  const previewStartPos =
    previewFirstVal !== null ? ((previewFirstVal - min) / range) * 100 : 0;
  const previewWidth =
    previewFirstVal !== null && previewLastVal !== null
      ? ((previewLastVal - previewFirstVal) / range) * 100
      : 0;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    setIsDragging(true);
    setPreviewValue(null);
    startDrag(disabled)(e);

    const onEnd = () => {
      setIsDragging(false);
      window.removeEventListener("pointerup", onEnd);
    };
    window.addEventListener("pointerup", onEnd);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const isTouch = e.pointerType === "touch";
    if (disabled || isDragging || isTouch) return;

    const hoverVal = calculateValueFromPos(e.clientX, e.clientY);
    const isBelowRange = hoverVal < firstVal;
    const isAboveRange = hoverVal > lastVal;

    if (isBelowRange) {
      const nextPreview = [...sortedValues];
      for (let i = hoverVal; i < firstVal; i++) {
        if (!nextPreview.includes(i)) nextPreview.push(i);
      }
      setPreviewValue(nextPreview);
    } else if (isAboveRange) {
      const nextPreview = [...sortedValues];
      for (let i = lastVal + 1; i <= hoverVal; i++) {
        if (!nextPreview.includes(i)) nextPreview.push(i);
      }
      setPreviewValue(nextPreview);
    } else {
      const target = e.target as HTMLElement;
      const isOverButton = target.closest('[data-cut-button="true"]');
      if (!isOverButton) setPreviewValue(null);
    }
  };

  return (
    <S.SliderRoot
      $isVertical={isVertical}
      onPointerDown={handleTrackPointerDown(disabled || isDragging)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPreviewValue(null)}
      style={{ touchAction: "none" }}
    >
      <S.SliderTrack
        ref={trackRef}
        $isVertical={isVertical}
        $thumbSize={thumbSize}
      >
        {Array.from({ length: limitValue + 1 }, (_, i) => (
          <S.Tick
            key={i}
            $tickPos={(i / limitValue) * 100}
            $isVertical={isVertical}
          />
        ))}

        {previewValue && !isDragging && (
          <S.SliderThumb
            $isVertical={isVertical}
            $startPos={previewStartPos}
            $totalWidth={previewWidth}
            $thumbSize={thumbSize}
            $isPreview={true}
          />
        )}

        <S.SliderThumb
          onPointerDown={handlePointerDown}
          $isVertical={isVertical}
          $startPos={startPosPercent}
          $totalWidth={totalWidthPercent}
          $thumbSize={thumbSize}
          $isDragging={isDragging}
        >
          <S.InteractionContainer
            $isVertical={isVertical}
            $thumbSize={thumbSize}
            $isDragging={isDragging}
          >
            {sortedValues.map((val, index) => {
              const totalSteps = sortedValues.length;
              const hasMultipleSteps = totalSteps > 1;
              const positionPercent = hasMultipleSteps
                ? (index / (totalSteps - 1)) * 100
                : 50;

              return (
                <S.InteractionZone
                  key={val}
                  $isVertical={isVertical}
                  $thumbSize={thumbSize}
                  $positionPercent={positionPercent}
                >
                  <S.ControlsWrapper
                    $isVertical={isVertical}
                    $isDragging={isDragging}
                    $thumbSize={thumbSize}
                  >
                    <S.CutButton
                      data-cut-button="true"
                      disabled={val === lastVal || !hasMultipleSteps}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewValue(null);
                        handleCutEnd(val);
                      }}
                    >
                      {isVertical ? (
                        "▼"
                      ) : (
                        <span
                          style={{
                            display: "block",
                            transform: "rotate(90deg)",
                          }}
                        >
                          ▼
                        </span>
                      )}
                    </S.CutButton>
                    <S.CutButton
                      data-cut-button="true"
                      disabled={val === firstVal || !hasMultipleSteps}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewValue(null);
                        handleCutStart(val);
                      }}
                    >
                      {isVertical ? (
                        "▲"
                      ) : (
                        <span
                          style={{
                            display: "block",
                            transform: "rotate(90deg)",
                          }}
                        >
                          ▲
                        </span>
                      )}
                    </S.CutButton>
                  </S.ControlsWrapper>
                </S.InteractionZone>
              );
            })}
          </S.InteractionContainer>
        </S.SliderThumb>
      </S.SliderTrack>
    </S.SliderRoot>
  );
}
