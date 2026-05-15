import * as React from "react";
import * as S from "./parts";
import type { InteractionZoneProps } from "../constants";

interface ExtendedInteractionZoneProps extends InteractionZoneProps {
  isInRange: boolean;
  handleTrackPointerDown: (e: React.PointerEvent) => void;
}

export function InteractionZone({
  val,
  index,
  total,
  isVertical,
  thumbSize,
  firstVal,
  lastVal,
  isInRange,
  onBeforeValueChange,
  handleCutStart,
  handleCutEnd,
  setPreviewValue,
  handleTrackPointerDown,
}: ExtendedInteractionZoneProps) {
  const positionPercent = (index / (total - 1)) * 100;

  const handleCut = (type: "start" | "end") => (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewValue(null);
    if (type === "start") {
      handleCutStart(val);
    } else {
      handleCutEnd(val);
    }
  };

  const isEndDisabled =
    val === lastVal || onBeforeValueChange?.([firstVal, val]) === false;
  const isStartDisabled =
    val === firstVal || onBeforeValueChange?.([val, lastVal]) === false;

  return (
    <S.InteractionZone
      $isVertical={isVertical}
      $thumbSize={thumbSize}
      $positionPercent={positionPercent}
      $numberOfSelectedTicks={total}
    >
      {isInRange ? (
        <S.ControlsWrapper $isVertical={isVertical} $isDragging={false}>
          <S.CutButton
            data-cut-button="true"
            data-cut-type="end"
            data-value={val}
            disabled={isEndDisabled}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleCut("end")}
            $isVertical={isVertical}
          ></S.CutButton>
          <S.CutButton
            data-cut-button="true"
            data-cut-type="start"
            data-value={val}
            disabled={isStartDisabled}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleCut("start")}
            $isVertical={isVertical}
          ></S.CutButton>
        </S.ControlsWrapper>
      ) : (
        <S.ControlsWrapper $isVertical={isVertical} $isDragging={false}>
          <S.ExpandButton
            data-expand-button="true" // Ten atrybut pozwala na wykrycie w handlePointerMove
            data-value={val} // Przekazujemy wartość do obliczeń podglądu
            onPointerDown={(e) => {
              e.stopPropagation();
              handleTrackPointerDown(e);
            }}
            $isVertical={isVertical}
          />
        </S.ControlsWrapper>
      )}
    </S.InteractionZone>
  );
}
