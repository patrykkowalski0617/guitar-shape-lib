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

  const [isDragging, setIsDragging] = React.useState(false);

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
  } = useMultiStepSlider({ value, onValueChange, max, min, isVertical });

  const startPosPercent = ((firstVal - min) / range) * 100;
  const totalWidthPercent = ((lastVal - firstVal) / range) * 100;
  const limitValue = effectiveMax ?? max;

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    startDrag(disabled)(e);

    const stopDragging = () => {
      setIsDragging(false);
      window.removeEventListener("mouseup", stopDragging);
    };
    window.addEventListener("mouseup", stopDragging);
  };

  return (
    <S.SliderRoot
      $isVertical={isVertical}
      onMouseDown={handleTrackMouseDown(disabled || isDragging)}
      onMouseEnter={(e) => {
        console.log("enter");
        // handleTrackMouseDown(disabled || isDragging)(e);
      }}
      onMouseLeave={() => {
        console.log("leave");
      }}
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
              const positionPercent =
                sortedValues.length > 1
                  ? (index / (sortedValues.length - 1)) * 100
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
                      disabled={val === lastVal || sortedValues.length === 1}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("click");
                        handleCutEnd(val);
                      }}
                      onMouseEnter={() => {
                        console.log("enter");
                        // handleCutEnd(val);
                      }}
                      onMouseLeave={() => {
                        console.log("leave");
                      }}
                    >
                      {isVertical ? "▼" : "◀"}
                    </S.CutButton>
                    <S.CutButton
                      disabled={val === firstVal || sortedValues.length === 1}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        console.log("click");
                        e.stopPropagation();
                        handleCutStart(val);
                      }}
                      onMouseEnter={() => {
                        console.log("enter");
                        // handleCutStart(val);
                      }}
                      onMouseLeave={() => {
                        console.log("leave");
                      }}
                    >
                      {isVertical ? "▲" : "▶"}
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
