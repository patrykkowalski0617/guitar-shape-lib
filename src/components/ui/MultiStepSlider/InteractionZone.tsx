import * as React from "react";
import * as S from "./parts";

interface InteractionZoneProps {
  val: number;
  index: number;
  total: number;
  isVertical: boolean;
  thumbSize: number;
  firstVal: number;
  lastVal: number;
  onBeforeValueChange?: (value: number[]) => boolean;
  handleCutStart: (val: number) => void;
  handleCutEnd: (val: number) => void;
  setPreviewValue: (value: number[] | null) => void;
}

export function InteractionZone({
  val,
  index,
  total,
  isVertical,
  thumbSize,
  firstVal,
  lastVal,
  onBeforeValueChange,
  handleCutStart,
  handleCutEnd,
  setPreviewValue,
}: InteractionZoneProps) {
  const positionPercent = total > 1 ? (index / (total - 1)) * 100 : 50;

  const handleCut = (type: "start" | "end") => (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewValue(null);

    if (type === "start") {
      handleCutStart(val);
    } else {
      handleCutEnd(val);
    }
  };

  const isLastAndDisabled = val === lastVal;
  const isFirstAndDisabled = val === firstVal;
  const hasMultipleSteps = total > 1;

  const isEndDisabled =
    isLastAndDisabled ||
    !hasMultipleSteps ||
    onBeforeValueChange?.([firstVal, val]) === false;

  const isStartDisabled =
    isFirstAndDisabled ||
    !hasMultipleSteps ||
    onBeforeValueChange?.([val, lastVal]) === false;

  return (
    <S.InteractionZone
      $isVertical={isVertical}
      $thumbSize={thumbSize}
      $positionPercent={positionPercent}
      $numberOfSelectedTicks={total}
    >
      <S.ControlsWrapper $isVertical={isVertical} $isDragging={false}>
        <S.CutButton
          data-cut-button="true"
          data-cut-type="end"
          data-value={val}
          disabled={isEndDisabled}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleCut("end")}
          $isVertical={isVertical}
        >
          {isVertical ? "▼" : <S.IconWrapper>▼</S.IconWrapper>}
        </S.CutButton>
        <S.CutButton
          data-cut-button="true"
          data-cut-type="start"
          data-value={val}
          disabled={isStartDisabled}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleCut("start")}
          $isVertical={isVertical}
        >
          {isVertical ? "▲" : <S.IconWrapper>▲</S.IconWrapper>}
        </S.CutButton>
      </S.ControlsWrapper>
    </S.InteractionZone>
  );
}
