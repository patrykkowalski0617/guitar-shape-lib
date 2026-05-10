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
  thumbSize = 28,
  orientation = "horizontal",
  disabled = false,
  effectiveMax,
}: MultiStepSliderProps) {
  const isVertical = orientation === "vertical";
  const [hoverPreview, setHoverPreview] = React.useState<{
    min: number;
    max: number;
  } | null>(null);

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

  const startPosPercent = ((firstVal - min) / range) * 100;
  const totalWidthPercent = ((lastVal - firstVal) / range) * 100;
  const limitValue = effectiveMax ?? max;

  const previewStartPos = hoverPreview
    ? ((hoverPreview.min - min) / range) * 100
    : startPosPercent;
  const previewWidth = hoverPreview
    ? ((hoverPreview.max - hoverPreview.min) / range) * 100
    : totalWidthPercent;

  const handleRootMouseMove = (e: React.MouseEvent) => {
    if (disabled) return;

    const hoverVal = calculateValueFromPos(e.clientX, e.clientY);
    const isExpandingBelow = hoverVal < firstVal;
    const isExpandingAbove = hoverVal > lastVal;

    if (isExpandingBelow) {
      setHoverPreview({ min: hoverVal, max: lastVal });
    } else if (isExpandingAbove) {
      setHoverPreview({ min: firstVal, max: hoverVal });
    } else {
      setHoverPreview(null);
    }
  };

  const tickIndexes = Array.from({ length: limitValue + 1 }, (_, i) => i);

  return (
    <S.SliderRoot
      $isVertical={isVertical}
      onMouseDown={handleTrackMouseDown(disabled)}
      onMouseMove={handleRootMouseMove}
      onMouseLeave={() => setHoverPreview(null)}
    >
      <S.SliderTrack
        ref={trackRef}
        $isVertical={isVertical}
        $thumbSize={thumbSize}
      >
        {tickIndexes.map((stepNumber) => {
          const tickPos = (stepNumber / limitValue) * 100;
          return (
            <S.Tick
              key={`tick-${stepNumber}`}
              $tickPos={tickPos}
              $isVertical={isVertical}
            />
          );
        })}

        <S.SliderThumb
          onMouseDown={startDrag(disabled)}
          $isVertical={isVertical}
          $startPos={startPosPercent}
          $totalWidth={totalWidthPercent}
          $thumbSize={thumbSize}
        >
          <S.ThumbVisual />
          <S.InteractionContainer
            $isVertical={isVertical}
            $thumbSize={thumbSize}
            onMouseMove={(e) => e.stopPropagation()}
          >
            {sortedValues.map((val, index) => {
              const totalSteps = sortedValues.length;
              const positionPercent =
                totalSteps > 1 ? (index / (totalSteps - 1)) * 100 : 50;
              const isFirst = val === firstVal;
              const isLast = val === lastVal;
              const isOnlyOne = totalSteps === 1;

              return (
                <S.InteractionZone
                  key={val}
                  $isVertical={isVertical}
                  $thumbSize={thumbSize}
                  $positionPercent={positionPercent}
                >
                  {!disabled && (
                    <S.ControlsWrapper
                      $isVertical={isVertical}
                      $thumbSize={thumbSize}
                    >
                      <S.CutButton
                        disabled={isLast || isOnlyOne}
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          setHoverPreview({ min: firstVal, max: val });
                        }}
                        onMouseLeave={() => setHoverPreview(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCutEnd(val);
                        }}
                      >
                        {isVertical ? "▼" : "◀"}
                      </S.CutButton>
                      <S.CutButton
                        disabled={isFirst || isOnlyOne}
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          setHoverPreview({ min: val, max: lastVal });
                        }}
                        onMouseLeave={() => setHoverPreview(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCutStart(val);
                        }}
                      >
                        {isVertical ? "▲" : "▶"}
                      </S.CutButton>
                    </S.ControlsWrapper>
                  )}
                </S.InteractionZone>
              );
            })}
          </S.InteractionContainer>
        </S.SliderThumb>

        {hoverPreview && (
          <S.SliderThumb
            $isPreview
            $isVertical={isVertical}
            $startPos={previewStartPos}
            $totalWidth={previewWidth}
            $thumbSize={thumbSize}
            style={{ pointerEvents: "none", zIndex: 10 }}
          >
            <S.ThumbVisual />
          </S.SliderThumb>
        )}
      </S.SliderTrack>
    </S.SliderRoot>
  );
}
