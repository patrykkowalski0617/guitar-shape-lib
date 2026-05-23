import React from "react";
import { PickHandle } from "./PickHandle.parts.tsx";
import * as S from "./parts";
import { useMultiRangeSlider, type Range } from "./useMultiRangeSlider";

interface MultiRangeSliderProps {
  values: unknown[];
  range: Range;
  onChange: (range: Range) => void;
  orientation?: "horizontal" | "vertical";
  height?: number | string;
  isDisabled?: boolean;
}

const MultiRangeSlider = ({
  values,
  range,
  onChange,
  orientation = "horizontal",
  height,
  isDisabled = false,
}: MultiRangeSliderProps) => {
  const totalSegments = values.length;
  const { trackRef, startDragging } = useMultiRangeSlider(
    totalSegments,
    range,
    onChange,
    orientation,
  );

  const segmentSizePercentage = 100 / totalSegments;
  const activeRangeStart = range.start * segmentSizePercentage;
  const activeRangeSize = (range.end - range.start + 1) * segmentSizePercentage;

  const isVertical = orientation === "vertical";

  const activeRangeStyle = isVertical
    ? { top: `${activeRangeStart}%`, height: `${activeRangeSize}%` }
    : { left: `${activeRangeStart}%`, width: `${activeRangeSize}%` };

  return (
    <S.Wrapper
      $vertical={isVertical}
      style={isVertical ? { height: height ?? "100%" } : undefined}
      $isDisabled={isDisabled}
    >
      <S.Track ref={trackRef} $vertical={isVertical}>
        <S.ActiveRange style={activeRangeStyle} $vertical={isVertical}>
          <PickHandle
            $vertical={isVertical}
            onMouseDown={(e: React.MouseEvent) => startDragging("start", e)}
            onTouchStart={(e: React.TouchEvent) => startDragging("start", e)}
          />
          <S.Grab
            $vertical={isVertical}
            onMouseDown={(e: React.MouseEvent) => startDragging("move", e)}
            onTouchStart={(e: React.TouchEvent) => startDragging("move", e)}
          />
          <PickHandle
            $vertical={isVertical}
            onMouseDown={(e: React.MouseEvent) => startDragging("end", e)}
            onTouchStart={(e: React.TouchEvent) => startDragging("end", e)}
          />
        </S.ActiveRange>
      </S.Track>
    </S.Wrapper>
  );
};

export default MultiRangeSlider;
