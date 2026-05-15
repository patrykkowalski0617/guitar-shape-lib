import * as React from "react";
import * as S from "./parts";
import type { RangeChangeZoneProps } from "../constants";

interface RangeChangeContainerProps extends Omit<
  RangeChangeZoneProps,
  "val" | "index" | "total"
> {
  limitValue: number;
  isDragging: boolean;
  disabled: boolean;
  handleTrackPointerDown: (
    disabled: boolean,
  ) => (e: React.PointerEvent) => void;
}

export function RangeChangeZone(props: RangeChangeContainerProps) {
  const {
    limitValue,
    isVertical,
    thumbSize,
    isDragging,
    firstVal,
    lastVal,
    disabled,
    handleTrackPointerDown,
    onBeforeValueChange,
    handleCutStart,
    handleCutEnd,
    setPreviewValue,
  } = props;

  const totalSteps = limitValue + 1;
  const isValueInRange = (val: number) => val >= firstVal && val <= lastVal;
  const trackPointerDownHandler = handleTrackPointerDown(disabled);

  return (
    <S.InteractionContainer
      $isVertical={isVertical}
      $thumbSize={thumbSize}
      $isDragging={isDragging}
      $numberOfTicks={totalSteps}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const positionPercent = (i / (totalSteps - 1)) * 100;
        const isInRange = isValueInRange(i);

        const handleCut = (type: "start" | "end") => (e: React.MouseEvent) => {
          e.stopPropagation();
          setPreviewValue(null);
          if (type === "start") {
            handleCutStart(i);
          } else {
            handleCutEnd(i);
          }
        };

        const isEndDisabled =
          i === lastVal || onBeforeValueChange?.([firstVal, i]) === false;
        const isStartDisabled =
          i === firstVal || onBeforeValueChange?.([i, lastVal]) === false;

        return (
          <S.ControlsWrapper
            key={i}
            $isVertical={isVertical}
            $isDragging={false}
            $thumbSize={thumbSize}
            $positionPercent={positionPercent}
            $numberOfTicks={totalSteps}
          >
            {isInRange ? (
              <>
                <S.CutButton
                  data-cut-button="true"
                  data-cut-type="end"
                  data-value={i}
                  disabled={isEndDisabled}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={handleCut("end")}
                  $isVertical={isVertical}
                />
                <S.CutButton
                  data-cut-button="true"
                  data-cut-type="start"
                  data-value={i}
                  disabled={isStartDisabled}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={handleCut("start")}
                  $isVertical={isVertical}
                />
              </>
            ) : (
              <S.ExpandButton
                data-expand-button="true"
                data-value={i}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  trackPointerDownHandler(e);
                }}
                $isVertical={isVertical}
              />
            )}
          </S.ControlsWrapper>
        );
      })}
    </S.InteractionContainer>
  );
}
