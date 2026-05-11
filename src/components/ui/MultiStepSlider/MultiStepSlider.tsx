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
  effectiveMax?: number;
  highlightedId?: string | number | null;
  onHighlightEnd?: () => void;
  onBeforeValueChange?: (nextValue: number[]) => boolean;
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
  onBeforeValueChange,
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

  const handleThumbPointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    setIsDragging(true);
    setPreviewValue(null);
    startDrag(disabled)(e);

    const stopDragging = () => {
      setIsDragging(false);
      window.removeEventListener("pointerup", stopDragging);
    };
    window.addEventListener("pointerup", stopDragging);
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
      const nextPreview =
        type === "start"
          ? sortedValues.filter((v) => v >= val)
          : sortedValues.filter((v) => v <= val);

      if (onBeforeValueChange && !onBeforeValueChange(nextPreview)) {
        setPreviewValue(null);
        return;
      }

      setPreviewValue(nextPreview);
      return;
    }

    const hoverVal = calculateValueFromPos(e.clientX, e.clientY);
    const isBelow = hoverVal < firstVal;
    const isAbove = hoverVal > lastVal;

    if (isBelow || isAbove) {
      const nextPreview = [...sortedValues];
      if (isBelow) {
        for (let i = hoverVal; i < firstVal; i++)
          if (!nextPreview.includes(i)) nextPreview.push(i);
      } else {
        for (let i = lastVal + 1; i <= hoverVal; i++)
          if (!nextPreview.includes(i)) nextPreview.push(i);
      }

      if (onBeforeValueChange && !onBeforeValueChange(nextPreview)) {
        setPreviewValue(null);
        return;
      }
      setPreviewValue(nextPreview.sort((a, b) => a - b));
    } else {
      setPreviewValue(null);
    }
  };

  return (
    <S.SliderRoot
      $isVertical={isVertical}
      onPointerDown={handleTrackPointerDown(disabled || isDragging)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPreviewValue(null)}
      style={{ touchAction: "none", userSelect: "none" }}
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
          onPointerDown={handleThumbPointerDown}
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
              const hasMultiple = totalSteps > 1;
              const positionPercent = hasMultiple
                ? (index / (totalSteps - 1)) * 100
                : 50;

              const potentialCutEnd = sortedValues.filter((v) => v <= val);
              const potentialCutStart = sortedValues.filter((v) => v >= val);

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
                      data-cut-type="end"
                      data-value={val}
                      disabled={
                        val === lastVal ||
                        !hasMultiple ||
                        (onBeforeValueChange
                          ? !onBeforeValueChange(potentialCutEnd)
                          : false)
                      }
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
                      data-cut-type="start"
                      data-value={val}
                      disabled={
                        val === firstVal ||
                        !hasMultiple ||
                        (onBeforeValueChange
                          ? !onBeforeValueChange(potentialCutStart)
                          : false)
                      }
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
