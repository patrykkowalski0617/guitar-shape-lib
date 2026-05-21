import * as S from "./parts";
import { useMultiRangeSlider, type Range } from "./useMultiRangeSlider";

interface MultiRangeSliderProps {
  values: unknown[];
  range: Range;
  onChange: (range: Range) => void;
  orientation?: "horizontal" | "vertical";
  height?: number | string;
}

const MultiRangeSlider = ({
  values,
  range,
  onChange,
  orientation = "horizontal",
  height,
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
    >
      <S.Track ref={trackRef} $vertical={isVertical}>
        <S.ActiveRange style={activeRangeStyle} $vertical={isVertical}>
          <S.Handle
            $vertical={isVertical}
            onMouseDown={(e) => startDragging("start", e)}
            onTouchStart={(e) => startDragging("start", e)}
          />
          <S.Grab
            onMouseDown={(e) => startDragging("move", e)}
            onTouchStart={(e) => startDragging("move", e)}
          />
          <S.Handle
            $vertical={isVertical}
            onMouseDown={(e) => startDragging("end", e)}
            onTouchStart={(e) => startDragging("end", e)}
          />
        </S.ActiveRange>
      </S.Track>
    </S.Wrapper>
  );
};

export default MultiRangeSlider;
