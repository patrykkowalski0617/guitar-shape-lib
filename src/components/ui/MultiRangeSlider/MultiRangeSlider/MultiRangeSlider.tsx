import * as S from "./parts";
import { useMultiRangeSlider, type Range } from "./useMultiRangeSlider";

interface MultiRangeSliderProps {
  values: unknown[];
  range: Range;
  onChange: (range: Range) => void;
}

const MultiRangeSlider = ({
  values,
  range,
  onChange,
}: MultiRangeSliderProps) => {
  const totalSegments = values.length;
  const { trackRef, startDragging } = useMultiRangeSlider(
    totalSegments,
    range,
    onChange,
  );

  const segmentWidthPercentage = 100 / totalSegments;
  const activeRangeLeft = range.start * segmentWidthPercentage;
  const activeRangeWidth =
    (range.end - range.start + 1) * segmentWidthPercentage;

  return (
    <S.Wrapper>
      <S.Track ref={trackRef}>
        <S.ActiveRange
          style={{
            left: `${activeRangeLeft}%`,
            width: `${activeRangeWidth}%`,
          }}
        >
          <S.Handle
            onMouseDown={(e) => startDragging("left", e)}
            onTouchStart={(e) => startDragging("left", e)}
          />
          <S.Grab
            onMouseDown={(e) => startDragging("move", e)}
            onTouchStart={(e) => startDragging("move", e)}
          />
          <S.Handle
            onMouseDown={(e) => startDragging("right", e)}
            onTouchStart={(e) => startDragging("right", e)}
          />
        </S.ActiveRange>
      </S.Track>
    </S.Wrapper>
  );
};

export default MultiRangeSlider;
