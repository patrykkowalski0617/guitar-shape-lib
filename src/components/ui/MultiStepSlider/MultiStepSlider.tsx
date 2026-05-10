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
    handleTrackMouseDown,
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

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    setPreviewValue(null);
    startDrag(disabled)(e);

    const stopDragging = () => {
      setIsDragging(false);
      window.removeEventListener("mouseup", stopDragging);
    };
    window.addEventListener("mouseup", stopDragging);
  };

  const handleRootMouseMove = (e: React.MouseEvent) => {
    if (disabled || isDragging) return;

    const hoverVal = calculateValueFromPos(e.clientX, e.clientY);
    const isBelow = hoverVal < firstVal;
    const isAbove = hoverVal > lastVal;

    if (isBelow) {
      const nextPreview = [...sortedValues];
      for (let i = hoverVal; i < firstVal; i++) {
        if (!nextPreview.includes(i)) nextPreview.push(i);
      }
      setPreviewValue(nextPreview);
    } else if (isAbove) {
      const nextPreview = [...sortedValues];
      for (let i = lastVal + 1; i <= hoverVal; i++) {
        if (!nextPreview.includes(i)) nextPreview.push(i);
      }
      setPreviewValue(nextPreview);
    } else {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-cut-button="true"]')) {
        setPreviewValue(null);
      }
    }
  };

  return (
    <S.SliderRoot
      $isVertical={isVertical}
      onMouseDown={handleTrackMouseDown(disabled || isDragging)}
      onMouseMove={handleRootMouseMove}
      onMouseLeave={() => setPreviewValue(null)}
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
          onMouseDown={handleThumbMouseDown}
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
              const positionPercent =
                totalSteps > 1 ? (index / (totalSteps - 1)) * 100 : 50;

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
                      disabled={val === lastVal || totalSteps === 1}
                      onMouseDown={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        const nextPreview = sortedValues.filter(
                          (v) => v <= val,
                        );
                        setPreviewValue(nextPreview);
                      }}
                      onMouseLeave={() => setPreviewValue(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewValue(null);
                        handleCutEnd(val);
                      }}
                    >
                      {isVertical ? (
                        "▼"
                      ) : (
                        <span style={{ transform: "rotate(90deg)" }}>▼</span>
                      )}
                    </S.CutButton>
                    <S.CutButton
                      data-cut-button="true"
                      disabled={val === firstVal || totalSteps === 1}
                      onMouseDown={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        const nextPreview = sortedValues.filter(
                          (v) => v >= val,
                        );
                        setPreviewValue(nextPreview);
                      }}
                      onMouseLeave={() => setPreviewValue(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewValue(null);
                        handleCutStart(val);
                      }}
                    >
                      {isVertical ? (
                        "▲"
                      ) : (
                        <span style={{ transform: "rotate(90deg)" }}> ▲</span>
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
